import * as Errors from '../errors';
import * as Constants from '../constants';
import * as tp from 'tedious-promises';
import * as TYPES from 'tedious';

export function upsertBucketListItem(postBody: any): Promise<string> {
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    setConnection();

    let sql = Constants.UPSERT_BUCKET_LIST_ITEM;

    return tp.sql(sql)
        .parameter('ListItemName', TYPES.TYPES.VarChar, postBody.bucketListItems[0].ListItemName)
        .parameter('Created', TYPES.TYPES.DateTime, new Date(postBody.bucketListItems[0].Created))
        .parameter('Category', TYPES.TYPES.VarChar, postBody.bucketListItems[0].Category)
        .parameter('Achieved', TYPES.TYPES.VarChar, postBody.bucketListItems[0].Achieved)
        .parameter('BucketListItemId', TYPES.TYPES.VarChar, postBody.bucketListItems[0].BucketListItemId)
        .parameter('UserName', TYPES.TYPES.VarChar, postBody.user)
        .execute()
        .then(function(results)
        {
            return processResult('Loaded!', false);
        }).fail(function(err) {
            return processResult(err, true);
        });
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
        return Promise.resolve('Upsert bucket list item error: ' + result.message);
    } else {
        return Promise.resolve(result);
    }
}

export function evaluateParameter(postBody: any): string {
    let goodParameters = parametersExist(postBody);

    if (!goodParameters)
    {
        return Errors.ERROR_000002_UpsertBucketListItem_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(postBody)
{
    let pmtersExt = false;

    if (postBody != null
        && postBody != undefined
        && postBody.bucketListItems != null
        && postBody.bucketListItems != undefined
        && postBody.bucketListItems.length > 0
        && postBody.user != null
        && postBody.user != undefined)
    {
        pmtersExt = true;
    }

    return pmtersExt;
}
