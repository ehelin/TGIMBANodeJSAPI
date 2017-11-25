import * as AWS from 'aws-sdk';
import * as Errors from '../errors';
import * as Constants from '../constants';

export function deleteBucketListItem(postBody: any): Promise<string> {
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    var params = setParams(postBody);
    var docClient = setConnection();

    return makeCall(docClient, params);
}

function makeCall(docClient, params) {
    return docClient.delete(params, function (err, data) {
        if (err) {
            return processResult(err, true);
        } else {
            return processResult('Record Deleted!', false);
        }
    });
}


// TODO - make a type for query body
// Move to utility?
export function evaluateParameter(query: any): string {
    let goodParameters = parametersExist(query);

    if (!goodParameters)
    {
        return Errors.ERROR_000002_AWS_DeleteBucketListItem_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(query: any): boolean {
    let pmtersExt = false;

    if (query != null
            && query != undefined
                && query.BucketListItemId != undefined
                    && query.BucketListItemId != null) {
        pmtersExt = true;
    }

    return pmtersExt;
}

export function processResult(result: any, isError: boolean): Promise<string> {
    if (isError){
        return Promise.resolve('Unable to delete item: ' + result.message);
    } else {
        return Promise.resolve(result);
    }
}

// TODO - move to a utils module (if possible)
export function setConnection(): AWS.DynamoDB.DocumentClient {
    AWS.config.update(Constants.getAwsDynamoDbConfig());
    var docClient = new AWS.DynamoDB.DocumentClient();

    return docClient;
}

export function setParams(postBody) {
    var id = Number(postBody.BucketListItemId);
    var params = {
        TableName: "BucketListItem",
        Key: {
            "BucketListItemId": id
        }
    };

    return params;
}
