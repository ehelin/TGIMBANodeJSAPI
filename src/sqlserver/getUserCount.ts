import * as TYPES from 'tedious';
import * as Constants from '../constants';
import * as tp from 'tedious-promises';

export function getUserCount(): Promise<string> {
    setConnection();

    return tp.sql(Constants.GET_USER_COUNT)
	  .execute()
	  .then(function(results) {
	      let count = parseResults(results);
          return processResult(count, false);
	  }).fail(function(err) {
	      return processResult('Get User Count error: ' + err, true);
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
        return Promise.resolve('Get bucket list items count error: ' + result.message);
    } else {
        return Promise.resolve(result);
    }
}

export function parseResults(results) {
	let count = 0;

	if (results) {
        for (var x = 0; x < results.length; x++) {
            count = count + 1;
        }
    }

	return count;	
}


