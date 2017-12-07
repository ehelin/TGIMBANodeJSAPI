import * as TYPES from 'tedious';
import * as Errors from '../errors';
import * as Constants from '../constants';
import * as tp from 'tedious-promises';

function getBucketListItemsPromise(query: any) {
    return new Promise(function(resolve, reject) {

        var sql = buildSql(query);

        console.log('sql: ', sql);
        console.log('query: ', query);

        return tp.sql(sql)
            .parameter('userName', TYPES.TYPES.VarChar, query.userName)
            .execute()
            .then(function(results)
            {
                console.log('get bucket: ', results);
                var parsedResults = parseResults(results);
                resolve(results);

                //return processResult(results, false);
            }).fail(function(err) {
                console.log('Error: ', err);
                reject('Error: ' + err);
               // return processResult('Get Bucket list Items error: ' + err, true);
            });
    });
}

export function getBucketListItems(query: any): Promise<{}> {
    let parameterStatus = evaluateParameter(query);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    setConnection();

    return getBucketListItemsPromise(query);
}

// TODO - move to a utils module (if possible)
function setConnection(): Promise<string> {
    try {
        let config = Constants.getSqlServerConfig();
        tp.setConnectionConfig(config);

        // TODO - do I need a promise.resolve here?
    } catch(err) {
        return Promise.resolve('Connection Error: ' + err.message);
    }
}

export function processResult(result: any, isError: boolean): Promise<string> {
    if (isError){
        return Promise.resolve('Get bucket list items error: ' + result.message);
    } else {
        return Promise.resolve(result);
    }
}

export function parseResults(results: any): any {  //TODO add return type
    let dateFormat = require('dateformat');
    let parsedResults = null;

    if (results) {
        new Array(results.length);
        for(let i=0; i<results.length; i++)
        {
            parsedResults[i] = results[i].ListItemName + ','
                + dateFormat(results[i].Created, 'mm/dd/yyyy') + ','
                + results[i].Category + ','
                + getIntStringAchievedValue(results[i].Achieved) + ','
                + results[i].BucketListItemId + ';';
        }
    }

    return parsedResults;
}

// TODO - move to util module?
export function getIntStringAchievedValue(Achieved: number): string {
    if (Achieved === 1)
        return '1';
    else
        return '0';
}

export function buildSql(query) {
    let sql = Constants.GET_BUCKET_LIST;

    //HACK - Update in a later version
    if (query.sortString == ' order by Category')
    {
        sql = sql + 'order by CategorySortOrder';
    }
    else if (query.sortString == ' order by Category desc'){
        sql = sql + 'order by CategorySortOrder desc';
    }
    else
    {
        sql = sql + query.sortString;
    }

    return sql;
}

// TODO - make a type for query body
export function evaluateParameter(query: any): string {
    let goodParameters = parametersExist(query);

    if (!goodParameters)
    {
        return Errors.ERROR_000001_GetBucketListItems_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(query: any): boolean {
    let pmtersExt = false;

    if (query!= null && query != undefined)
    {
        if (query.userName != null
            && query.userName != undefined
            && query.sortString!= null
            && query.sortString != undefined)
        {
            pmtersExt = true;
        }
    }

    return pmtersExt;
}
