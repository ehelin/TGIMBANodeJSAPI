import * as Errors from '../errors';
import {setDynamoDbConnection} from "../../config";
import {BucketListId} from "./dto/objectInterfaces";
import {DynamoDB} from "aws-sdk";

// TODO - add return type
export function deleteBucketListItem(postBody: BucketListId): Promise<any> {
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    const params = setParams(postBody);
    const docClient = setDynamoDbConnection();

    return makeCall(docClient, params);
}

function makeCall(docClient: DynamoDB, params: DynamoDB.Types.DeleteItemInput) {
    return new Promise(function(resolve, reject) {
        return docClient.deleteItem(params, function (err, data) {
            if (err) {
                reject('Unable to delete item: ' + err.message);
            } else {
                resolve('Record Deleted!');
            }
        });
    });
}

export function evaluateParameter(postBody: BucketListId): string {
    let goodParameters = parametersExist(postBody);

    if (!goodParameters)
    {
        return Errors.ERROR_000002_AWS_DeleteBucketListItem_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(postBody: BucketListId): boolean {
    let pmtersExt = false;

    if (postBody != null
        && postBody != undefined
        && postBody.BucketListItemId != undefined
        && postBody.BucketListItemId != null) {
        pmtersExt = true;
    }

    return pmtersExt;
}

export function setParams(postBody: BucketListId): DynamoDB.Types.DeleteItemInput {
    const id = Number(postBody.BucketListItemId);
    const params = {
        TableName: "BucketListItem",
        Key: {
            BucketListItemId: {
                S: id.toString(),
            }
        }
    };

    return params;
}
