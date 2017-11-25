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

    const sql = Constants.UPSERT_BUCKET_LIST_ITEM;
    let items = postBody.bucketListItems.split(',');

    return tp.sql(sql)
        .parameter('ListItemName', TYPES.VarChar, items[0])
        .parameter('Created', TYPES.DateTime, new Date(items[1]))
        .parameter('Category', TYPES.VarChar, items[2])
        .parameter('Achieved', TYPES.VarChar, items[3])
        .parameter('BucketListItemId', TYPES.VarChar, items[4])
        .parameter('UserName', TYPES.VarChar, postBody.user)
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
