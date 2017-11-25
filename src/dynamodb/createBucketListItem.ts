import * as AWS from 'aws-sdk';
import * as Errors from '../errors';
import * as Constants from '../constants';

// TODO - add types
export function createBucketListItem(postBody: any): Promise<any> {
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    var params = setParams(postBody);
    var docClient = setConnection();

    return makeCall(docClient, params);
}

// TODO - add types
function makeCall(docClient: any, params: any): Promise<string> {
    return docClient.put(params, function (err, data) {
        var result;
        if (err) {
            return processResult(err, true);
        } else {
            return processResult('Record Inserted!', false);
        }
    });
}

// TODO - move to a utils module (if possible)
function setConnection(): AWS.DynamoDB.DocumentClient {
    AWS.config.update(Constants.getAwsDynamoDbConfig());
    var docClient = new AWS.DynamoDB.DocumentClient();

    return docClient;
}

// TODO - make a type for query body
// Move to utility?
export function evaluateParameter(query: any): string {
    let goodParameters = parametersExist(query);

    if (!goodParameters)
    {
        return Errors.ERROR_000003_AWS_CreateBucketListItem_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(postBody: any): boolean {
    let pmtersExt = false;

    if (postBody != null
        && postBody.Achieved != null
        && postBody.BucketListItemId != null
        && postBody.Category != null
        && postBody.CategorySortOrder != null
        && postBody.Created != null
        && postBody.ListItemName != null) {
        pmtersExt = true;
    }

    return pmtersExt;
}

export function setParams(postBody: any) {
    var params = {
        TableName: "BucketListItem",
        Item: {
            "Achieved": postBody.Achieved,
            "BucketListItemId": Number(postBody.BucketListItemId),
            "Category": postBody.Category,
            "CategorySortOrder": Number(postBody.CategorySortOrder),
            "Created": postBody.Created,
            "ListItemName": postBody.ListItemName
        }
    };

    return params;
}

export function processResult(result: any, isError: boolean): Promise<string> {
    if (isError){
        return Promise.resolve('Unable to create item: ' + result.message);
    } else {
        return Promise.resolve(result);
    }
}
