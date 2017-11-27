import * as TYPES from 'tedious';
import * as Errors from '../errors';
import * as Constants from '../constants';
import * as tp from 'tedious-promises';

export function deleteBucketListItem(postBody): Promise<string> {
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    setConnection();

    return tp.sql(Constants.DELETE_BUCKET_LIST_ITEM)
        .parameter('BucketListItemId', TYPES.Int, postBody.BucketListItemId)
        .execute()
        .then(function (results) {
            return processResult(results, false);
        }).fail(function (err) {
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
        return Promise.resolve('Delete bucket list item error: ' + result.message);
    } else {
        return Promise.resolve('Deleted!');
    }
}

// TODO - make a type for post body
export function evaluateParameter(postBody: any): string {
    let goodParameters = parametersExist(postBody);

    if (!goodParameters)
    {
        return Errors.ERROR_000003_DeleteBucketListItem_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(postBody: any): boolean {
    let pmtersExt = false;

    if (postBody != null
        && postBody.BucketListItemId != null
        && postBody.BucketListItemId != undefined)
    {
        pmtersExt = true;
    }

    return pmtersExt;
}

