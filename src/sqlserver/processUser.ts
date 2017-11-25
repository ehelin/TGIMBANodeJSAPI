import * as Constants from '../constants';
import * as Errors from '../errors';
import * as tp from 'tedious-promises';

export function processUser(postBody){
    let parameterStatus = evaluateParameter(postBody);

    if (parameterStatus !== null) {
        return Promise.reject(parameterStatus);
    }

    setConnection();

    var sql = buildSql(postBody);

    return tp.sql(sql)
	  .execute()
	  .then(function(results) {
	  	let userExists = parseResults(results, postBody.pass);

	  	return processResult(userExists, false);
	  }).fail(function(err) {
	      return processResult(err, true);
	  });
};

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
        return Promise.resolve('Process user error: ' + result.message);
    } else {
        return Promise.resolve(result);
    }
}

// TODO - add parameters instead of this
export function buildSql(postBody: any) {
    let sql = Constants.USER_EXISTS_PART_1
        + '\'' + postBody.user + '\''
        + Constants.USER_EXISTS_PART_2
        + '\'' + postBody.pass + '\'';

    return sql;
}

export function evaluateParameter(query: any): string {
    let goodParameters = parametersExist(query);

    if (!goodParameters)
    {
        return Errors.ERROR_000004_ProcessUser_ParametersDoNotExist;
    } else {
        return null;
    }
}

export function parametersExist(body: any): boolean {
    let pmtersExt = false;

    if (body!= null && body != undefined)
    {
        if (body.user != null
            && body.user != undefined
            && body.pass!= null
            && body.pass != undefined)
        {
            pmtersExt = true;
        }
    }

    return pmtersExt;
}

export function parseResults(results, pass)
{
  	let userExists = false;

  	if (results != null 
  			&& results[0] != null 
  				&& results[0].PassWord != null 
  					&& results[0].PassWord.length > 0
  						&& results[0].PassWord == pass)
  	{
  		userExists = true;
  	}	

  	return userExists;
};

