import * as Errors from '../errors';
import {setDynamoDbConnection} from "../../config";
import {BucketListItem} from "./dto/objectInterfaces";
import {DynamoDB} from "aws-sdk";

// TODO - add return type
export function createBucketListItem(postBody: BucketListItem): Promise<any> {
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    var params = setParams(postBody);
    var docClient = setDynamoDbConnection();

    return makeCall(docClient, params);
}

function makeCall(docClient: DynamoDB, params: DynamoDB.Types.PutItemInput) {
    return new Promise(function(resolve, reject) {
        docClient.putItem(params, function (err, data) {
            if (err){
                reject('Unable to create item: ' + err.message);
            } else {
                resolve('Record Inserted!');
            }
        });
    });
}

export function evaluateParameter(postBody: BucketListItem): string {
    let goodParameters = parametersExist(postBody);

    if (!goodParameters)
    {
        return Errors.ERROR_000003_AWS_CreateBucketListItem_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(postBody: BucketListItem): boolean {
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

export function setParams(postBody: BucketListItem): DynamoDB.Types.PutItemInput {
    const params = {
        TableName: "BucketListItem",
        Item: {
            Achieved: {
                S: postBody.Achieved,
            },
            BucketListItemId: {
                S: postBody.BucketListItemId,
            },
            Category: {
                S: postBody.Category,
            },
            CategorySortOrder: {
                S: postBody.CategorySortOrder,
            },
            Created: {
                S: postBody.Created,
            },
            ListItemName: {
                S: postBody.ListItemName,
            },
            UserName: {
                S: postBody.UserName,
            },
        }
    };

    return params;
}
