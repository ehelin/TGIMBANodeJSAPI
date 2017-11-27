import * as Constants from '../constants';
import * as Errors from '../errors';
import * as tp from 'tedious-promises';
import * as TYPES from 'tedious';

export function processUserRegistration(postBody): Promise<string>{
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    setConnection();

    let sql = Constants.INSERT_USER;

    return tp.sql(sql)
        .parameter('userName', TYPES.VarChar, postBody.userName)
        .parameter('salt', TYPES.VarChar, postBody.salt)
        .parameter('passWord', TYPES.VarChar, postBody.passWord)
        .parameter('email', TYPES.VarChar, postBody.email)
        .execute()
        .then(function(results) {
            return processResult(results, false);
        }).fail(function(err) {
            return processResult(err, true);
        });
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
