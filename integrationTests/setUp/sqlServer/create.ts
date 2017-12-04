import * as TYPES from 'tedious';
import * as Constants from "../../../src/constants";
import * as tp from 'tedious-promises';

function verifySqlServerDbIsSetup() {
    console.log('inside verifySqlServerDbIsSetup()');

    return new Promise(function(resolve, reject) {
        let config = Constants.getSqlServerConfig();
        tp.setConnectionConfig(config);

        const sql: string = 'select name from sys.databases';

        return tp.sql(sql)
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                reject('sqlServer/create->verifySqlServerDbIsSetup() - error: ' + err);
            });
    });
}
// function getDeleteTablePromise() {
//     return new Promise(function(resolve, reject) {
//         if (tablesToDelete.TableNames.length === 0) {
//             resolve('done');
//         } else {
//             tablesToDelete.TableNames.forEach((table) => {
//                 const params = {
//                     TableName: table,
//                 };
//
//                 dynamoClient.deleteTable(params, function (err, data) {
//                     if (err) {
//                         reject('createTables.ts -> deleteTable -> Error: ' + err);
//                     }
//                     else {
//                         resolve('createTables.ts -> deleteTable -> success');
//                     }
//                 });
//             });
//         }
//     });
// }
// function getCreateTablePromise() {
//     return new Promise(function(resolve, reject) {
//         tablesToCreate.forEach((table) => {
//             dynamoClient.createTable(table, function (err, data) {
//                 if (err) {
//                     reject('createTables.ts -> createTable -> Error: ' + err);
//                 }
//                 else {
//                     resolve('createTables.ts -> createTable -> success');
//                 }
//             });
//         });
//     });
// }

export const setUpSqlServer = (): Promise<any> => {
    console.log('inside setUpSqlServer()');

    return verifySqlServerDbIsSetup();
    // return getListTablePromise()
    //     .then(() =>  getDeleteTablePromise())
    //     .then(() => getCreateTablePromise());
};
