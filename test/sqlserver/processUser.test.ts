import {expect} from 'chai';
import * as Errors from '../../src/errors';
import * as Constants from '../../src/constants';
import {
    buildSql, evaluateParameter, processResult, parametersExist,
    parseResults
} from "../../src/sqlserver/processUser";

describe('When processing users', () => {
    // TODO - add type
    let postBody: any;

    beforeEach(() => {
        postBody = {
            user: 'someUser',
            pass: 'somePassword',
        };
    });

    describe('buildSql(args) - will build a sql string for the supplied post body', () => {
        it('Empty postBody parameters will return standard sql query without filled in parameters', () => {
            postBody.user = '';
            postBody.pass = '';
            expect(buildSql(postBody)).to.eql('SELECT [PassWord]  FROM [Bucket].[User] where [UserName] = \'\' and [PassWord] = \'\'');
        });

        it('Empty postBody pass parameter will return standard sql query without userName filled in', () => {
            postBody.pass = '';
            expect(buildSql(postBody)).to.eql('SELECT [PassWord]  FROM [Bucket].[User] where [UserName] = \'' + postBody.user + '\' and [PassWord] = \'\'');
        });

        it('Empty postBody user parameter will return standard sql query without password filled in', () => {
            postBody.user = '';
            expect(buildSql(postBody)).to.eql('SELECT [PassWord]  FROM [Bucket].[User] where [UserName] = \'\' and [PassWord] = \'' + postBody.pass + '\'');
        });

        it('A filled in postBody will return standard sql query parameters filled in', () => {
            expect(buildSql(postBody)).to.eql('SELECT [PassWord]  FROM [Bucket].[User] where [UserName] = \'' + postBody.user + '\' and [PassWord] = \'' + postBody.pass + '\'');
        });
    });

    describe('evaluateParamter(args) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter({})).to.eql(Errors.ERROR_000004_ProcessUser_ParametersDoNotExist);
        });

        it('A parameter that does exist will return null', () => {
            expect(evaluateParameter(postBody)).to.eql(null);
        });
    });

    describe('parametersExist(args) - A parameter is required', () => {
        it('A parameter that is null should return false', () => {
            expect(parametersExist(null)).to.eql(false);
        });

        it('A parameter that is has a query, but it is empty should return false', () => {
            expect(parametersExist({})).to.eql(false);
        });

        describe('Parameters are undefined', () => {
            it('A parameter that is has a body with an undefined user and pass should return false', () => {
                postBody.user = undefined;
                postBody.pass = undefined;
                expect(parametersExist(postBody)).to.eql(false);
            });

            it('A parameter that is has a body with an undefined user should return false', () => {
                postBody.user = undefined;
                expect(parametersExist(postBody)).to.eql(false);
            });

            it('A parameter that is has a body with an undefined pass should return false', () => {
                postBody.pass = undefined;
                expect(parametersExist(postBody)).to.eql(false);
            });
        });

        describe('Parameters are null', () => {
            it('A parameter that is has a body with an null user and pass hould return false', () => {
                postBody.user = null;
                postBody.pass = null;
                expect(parametersExist(postBody)).to.eql(false);
            });

            it('A parameter that is has a body with an null user should return false', () => {
                postBody.user = null;
                expect(parametersExist(postBody)).to.eql(false);
            });

            it('A parameter that is has a body with an null pass should return false', () => {
                postBody.pass = null;
                expect(parametersExist(postBody)).to.eql(false);
            });
        });

        it('A parameter that is has a body with expected parameters should return true', () => {
            expect(parametersExist(postBody)).to.eql(true);
        });
    });

    describe('processResult(args) - will detect errors', () => {
        it('A error result will return an error', () => {
            return processResult('An Error', true)
                .then((result) => {
                    expect(result.indexOf('Process user error')).not.to.eql(-1);
                });
        });

        it('A good result will return bucket list items', () => {
            return processResult(null, false)
                .then((result) => {
                    // TODO - put in more definative test for processing a user
                    expect(result).to.not.be.undefined;
                });
        });
    });

    describe('parseResults(args) - will parse results', () => {
        it('an undefined result and password will return false', () => {
            expect(parseResults(undefined, undefined)).to.eql(false);
        });

        it('an null result and null will return false', () => {
            expect(parseResults(null, null)).to.eql(false);
        });

        it('an undefined result and password will return false', () => {
            expect(parseResults(undefined, 'somePassword')).to.eql(false);
        });

        it('an null result and password will return false', () => {
            expect(parseResults(null, 'somePassword')).to.eql(false);
        });

        it('a empty array with empty password will return false', () => {
            expect(parseResults([], '')).to.eql(false);
        });

        it('a empty result with empty password will return false', () => {
            expect(parseResults([{}], '')).to.eql(false);
        });

        it('a empty result with undefined password will return false', () => {
            expect(parseResults([{}], undefined)).to.eql(false);
        });

        it('a empty result with null password will return false', () => {
            expect(parseResults([{}], null)).to.eql(false);
        });

        it('a good result with null password will return false', () => {
            expect(parseResults([{PassWord: 'aPassword'}], null)).to.eql(false);
        });

        it('a good result with undefined password will return false', () => {
            expect(parseResults([{PassWord: 'aPassword'}], undefined)).to.eql(false);
        });

        it('a good result with different password will return false', () => {
            expect(parseResults([{PassWord: 'aPassword'}], 'somePassword')).to.eql(false);
        });

        it('a good result with matching password will return true', () => {
            expect(parseResults([{PassWord: 'aPassword'}], 'aPassword')).to.eql(true);
        });
    });
});