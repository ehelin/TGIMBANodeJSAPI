import * as Constants from "../../../src/constants";
import * as tp from 'tedious-promises';
import {getCreateTableBrowserCapability, getDropTableBrowserCapability} from "./tables/browsercapability";
import {getCreateBucketListSchema} from "./tables/createSchema";
import {getCreateDatabase} from "./tables/createDatabase";
import {getDeleteDb} from "./tables/deleteDb";
import {getDeleteSchema} from "./tables/createSchemaPermissionSa";
import {getCreateTableBrowserLog, getDropTableBrowserLog} from "./tables/browserlog";
import {getDbTableList} from "./tables/tableList";
import {getDropTableBucketListItem, getCreateBucketListItem} from "./tables/bucketlistitem";
import {getDropTableBucketListUser, getCreateTableBucketListUser} from "./tables/bucketlistuser";
import {getCreateTableUser, getDropTableUser} from "./tables/user";
import {getCreateTableLog, getDropTableLog} from "./tables/log";

function setConnection() {
    let config = Constants.getSqlServerConfig();
    tp.setConnectionConfig(config);
}

// TODO - refactor common elements in these promises to shared methods
function verifySqlServerDbIsSetup() {
    return new Promise(function(resolve, reject) {
        return tp.sql('select name from sys.databases')
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->verifySqlServerDbIsSetup() - error: ' + err);
                resolve();
            });
    });
}
function deleteBrowserCapability() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDropTableBrowserCapability())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->deleteBrowserCapabilityTable() - error: ' + err);
                resolve();
            });
    });
}
function deleteBrowserCapabilityLog() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDropTableBrowserLog())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->deleteBrowserCapabilityLog() - error: ' + err);
                resolve();
            });
    });
}
function deleteBucketListItem() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDropTableBucketListItem())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->deleteBucketListItem() - error: ' + err);
                resolve();
            });
    });
}
function deleteBucketListUser() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDropTableBucketListUser())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->deleteBucketListUser() - error: ' + err);
                resolve();
            });
    });
}
function deleteUser() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDropTableUser())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->deleteUser() - error: ' + err);
                resolve();
            });
    });
}
function deleteLog() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDropTableLog())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->deleteLog() - error: ' + err);
                resolve();
            });
    });
}
function deleteSchema() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDeleteSchema())
            .execute()
            .then(function(results)
            {
                resolve();
            }).fail(function(err) {
                console.log('sqlServer/create->deleteSchema() - error: ' + err);
                resolve();
            });
    });
}
function deleteDb() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDeleteDb())
            .execute()
            .then(function(results)
            {
                resolve();
            }).fail(function(err) {
                console.log('sqlServer/create->verifySqlServerDbIsSetup() - error: ' + err);
                resolve();
            });
    });
}
function createDb() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getCreateDatabase())
            .execute()
            .then(function(results)
            {
                resolve();
            }).fail(function(err) {
                console.log('sqlServer/create->createDb() - error: ' + err);
                resolve();
            });
    });
}
function createBucketListSchema() {
    return new Promise(function(resolve, reject) {
        const sql = getCreateBucketListSchema();

        return tp.sql(sql)
            .execute()
            .then(function(results)
            {
                resolve();
            }).fail(function(err) {
                console.log('sqlServer/create->createBucketListSchema() - error: ' + err);
                resolve();
            });
    });
}
function createBrowserCapability() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getCreateTableBrowserCapability())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->createBrowserCapabilityTable() - error: ' + err);
                resolve();
            });
    });
}
function createBrowserCapabilityLog() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getCreateTableBrowserLog())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->createBrowserCapabilityLog() - error: ' + err);
                resolve();
            });
    });
}
function createBucketListItem() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getCreateBucketListItem())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->createBrowserCapabilityLog() - error: ' + err);
                resolve();
            });
    });
}
function createBucketListUser() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getCreateTableBucketListUser())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->createBrowserCapabilityLog() - error: ' + err);
                resolve();
            });
    });
}
function createUser() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getCreateTableUser())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->createUser() - error: ' + err);
                resolve();
            });
    });
}
function createLog() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getCreateTableLog())
            .execute()
            .then(function(results)
            {
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->createLog() - error: ' + err);
                resolve();
            });
    });
}
function getTableList() {
    return new Promise(function(resolve, reject) {
        return tp.sql(getDbTableList())
            .execute()
            .then(function(results)
            {
                console.log('Database Tables: ', results);
                resolve(results);
            }).fail(function(err) {
                console.log('sqlServer/create->verifySqlServerDbIsSetup() - error: ' + err);
                resolve();
            });
    });
}

export const setUpSqlServer = (): Promise<any> => {
    setConnection();

    return verifySqlServerDbIsSetup()
         .then(() => deleteBrowserCapability())
         .then(() => deleteBrowserCapabilityLog())
         .then(() => deleteBucketListItem())
         .then(() => deleteBucketListUser())
         .then(() => deleteUser())
         .then(() => deleteLog())
         .then(() => deleteSchema())
         .then(() => deleteDb())
         .then(() => verifySqlServerDbIsSetup())
         .then(() => createDb())
         .then(() => verifySqlServerDbIsSetup())
         .then(() => createBucketListSchema())
         .then(() => createBrowserCapability())
         .then(() => createBrowserCapabilityLog())
         .then(() => createBucketListItem())
         .then(() => createBucketListUser())
         .then(() => createUser())
         .then(() => createLog())
         .then(() => getTableList());
};
