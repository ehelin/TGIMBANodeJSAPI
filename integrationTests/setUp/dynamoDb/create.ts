import {DynamoDB} from 'aws-sdk';
import {databaseOptions} from "../../../config";

const getTableParams = () => {
    const params: DynamoDB.Types.CreateTableInput [] = [];

    params.push({
        TableName: 'BucketListItem',
        KeySchema: [
            {AttributeName: 'BucketListItemId', KeyType: 'HASH'}
        ],
        AttributeDefinitions: [
            {AttributeName: 'BucketListItemId', AttributeType: 'S'}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2,
        }
    });

    return params;
};

const dynamoClient = new DynamoDB(databaseOptions);
const tablesToCreate = getTableParams();
let tablesToDelete: any;

function getListTablePromise() {
    return new Promise(function(resolve, reject) {
        const params = {};

        dynamoClient.listTables(params, function (err: any, tables: any) {
            if (err) {
                reject('createTables.ts -> listTables -> Error: ' + err);
            }
            else {
                tablesToDelete = tables;
                resolve(tables);  // TODO - pass table list to next promise
            }
        });
    });
}
function getDeleteTablePromise() {
    return new Promise(function(resolve, reject) {
        if (tablesToDelete.TableNames.length === 0) {
            resolve('done');
        } else {
            tablesToDelete.TableNames.forEach((table) => {
                const params = {
                    TableName: table,
                };

                dynamoClient.deleteTable(params, function (err, data) {
                    if (err) {
                        reject('createTables.ts -> deleteTable -> Error: ' + err);
                    }
                    else {
                        resolve('createTables.ts -> deleteTable -> success');
                    }
                });
            });
        }
    });
}
function getCreateTablePromise() {
    return new Promise(function(resolve, reject) {
        tablesToCreate.forEach((table) => {
            dynamoClient.createTable(table, function (err, data) {
                if (err) {
                    reject('createTables.ts -> createTable -> Error: ' + err);
                }
                else {
                    resolve('createTables.ts -> createTable -> success');
                }
            });
        });
    });
}

export const setUpDynamoDb = (): Promise<any> => {
    return getListTablePromise()
        .then(() =>  getDeleteTablePromise())
        .then(() => getCreateTablePromise());
};
