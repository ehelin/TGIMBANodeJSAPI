import * as Constants from '../constants';
import * as Errors from '../errors';
import * as tp from 'tedious-promises';
import * as TYPES from 'tedious';

// TODO - handle salt and other functions handled currently by .net code
function processUserRegistrationPromise(postBody: any) {
    return new Promise(function(resolve, reject) {
        let sql = Constants.INSERT_USER;

        return tp.sql(sql)
            .parameter('userName', TYPES.TYPES.VarChar, postBody.userName)
            .parameter('salt', TYPES.TYPES.VarChar, postBody.salt)
            .parameter('passWord', TYPES.TYPES.VarChar, postBody.passWord)
            .parameter('email', TYPES.TYPES.VarChar, postBody.email)
            .execute()
            .then(function(results) {
                resolve(results);
            }).fail(function(err) {
                reject('Error: ' + err);
            });
    });
}

export function processUserRegistration(postBody: any): Promise<{}>{
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    setConnection();

    return processUserRegistrationPromise(postBody);
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
        return Promise.resolve('Process user registration error: ' + result.message);
    } else {
        return Promise.resolve(result);
    }
}

export function evaluateParameter(query: any): string {
    let goodParameters = parametersExist(query);

    if (!goodParameters)
    {
        return Errors.ERROR_000005_ProcessUserRegistration_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(body: any): boolean {
    let pmtersExt = false;

    if (body!= null && body != undefined)
    {
        if (body.userName != null
            && body.userName != undefined
            && body.salt!= null
            && body.salt != undefined
            && body.passWord!= null
            && body.passWord != undefined
            && body.email != null
            && body.email != undefined)
        {
            pmtersExt = true;
        }
    }

    return pmtersExt;
}
