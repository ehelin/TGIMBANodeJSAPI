import * as Errors from '../errors';
import {setDynamoDbConnection} from "../../config";
import {BucketListId, BucketListItem} from "./dto/objectInterfaces";
import {DynamoDB} from "aws-sdk";

// TODO - add return type
export function readBucketListItem(query: BucketListId): Promise<any> {
    let parameterStatus = evaluateParameter(query);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    var params = setParams(query);
    var docClient = setDynamoDbConnection();

    return makeCall(docClient, params);
}

function makeCall(docClient: DynamoDB, params: DynamoDB.Types.GetItemInput) {
    return new Promise(function(resolve, reject) {
        docClient.getItem(params, function (err, data) {
            if (err){
                reject('Unable to read item: ' + err.message);
            } else {
                resolve(parseResult(data));
            }
        });
    });
}

export function evaluateParameter(query: BucketListId): string {
    let goodParameters = parametersExist(query);

    if (!goodParameters)
    {
        return Errors.ERROR_000001_AWS_GetBucketListItems_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(query: BucketListId): boolean {
    let pmtersExt = false;

    if (query != null
        && query != undefined
        && query.BucketListItemId != undefined
        && query.BucketListItemId != null) {
        pmtersExt = true;
    }

    return pmtersExt;
}

export function setParams(query: BucketListId): DynamoDB.Types.GetItemInput {
    const id = Number(query.BucketListItemId);
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

export function parseResult(item: any): any {
    const result: BucketListItem = {
        ListItemName: item.Item.ListItemName.S,
        Created: item.Item.Created.S,
        Category: item.Item.Category.S,
        CategorySortOrder: item.Item.CategorySortOrder.S,
        Achieved: item.Item.Achieved.S,
        BucketListItemId: item.Item.BucketListItemId.S,
        UserName: item.Item.UserName.S,
    };

    return result;
}
