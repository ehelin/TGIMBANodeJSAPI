import * as AWS from 'aws-sdk';
import * as Errors from '../errors';
import * as Constants from '../constants';

export function readBucketListItem(query: any): Promise<any> {
    let parameterStatus = evaluateParameter(query);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    var params = setParams(query);
    var docClient = setConnection();

    return makeCall(docClient, params);
}

function makeCall(docClient, params): Promise<any> {
    return docClient.get(params, function (err, data) {
        if (err) {
            return processResult(err, true);
        } else {
            return processResult(data, false);
        }
    });
}

// TODO - move to a utils module (if possible)
function setConnection(): AWS.DynamoDB.DocumentClient {
    AWS.config.update(Constants.getAwsDynamoDbConfig());
    var docClient = new AWS.DynamoDB.DocumentClient();

    return docClient;
}

export function processResult(result: any, isError: boolean): Promise<any> {
    if (isError){
        return Promise.resolve('Unable to read item: ' + result.message);
    } else {
        return Promise.resolve(result);
    }
}

// TODO - make a type for query body
// Move to utility?
export function evaluateParameter(query: any): string {
    let goodParameters = parametersExist(query);

    if (!goodParameters)
    {
        return Errors.ERROR_000001_AWS_GetBucketListItems_ParametersDoNotExist;
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

function setParams(query) {
    var id = Number(query.BucketListItemId);
    var params = {
        TableName: "BucketListItem",
        Key: {
            "BucketListItemId": id
        }
    };

    return params;
}
