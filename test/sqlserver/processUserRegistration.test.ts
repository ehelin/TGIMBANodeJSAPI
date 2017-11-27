import {expect} from 'chai';
import * as Errors from '../../src/errors';
import * as Constants from '../../src/constants'
import {processResult, evaluateParameter, parametersExist} from "../../src/sqlserver/processUserRegistration";

describe('When processing user registrations', () => {
    // TODO - add type
    let postBody: any;

    beforeEach(() => {
        postBody = {
            userName: 'someUser',
            passWord: 'somePassword',
            email: 'someone@aol.com',
            salt: 'passwordSalt',
        };
    });

    describe('evaluateParamter(args) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter({})).to.eql(Errors.ERROR_000005_ProcessUserRegistration_ParametersDoNotExist);
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

        it('A parameter that is has a body with an undefined userName, passWord, salt and email should return false', () => {
            postBody.userName = undefined;
            postBody.passWord = undefined;
            postBody.email = undefined;
            postBody.salt = undefined;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has a body with an undefined userName and email should return false', () => {
            postBody.userName = undefined;
            postBody.email = undefined;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has a body with an null userName, passWord, salt and email should return false', () => {
            postBody.userName = null;
            postBody.passWord = null;
            postBody.email = null;
            postBody.salt = null;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has a body with an undefined passWord and salt should return false', () => {
            postBody.passWord = null;
            postBody.salt = null;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has a body with expected parameters should return true', () => {
            expect(parametersExist(postBody)).to.eql(true);
        });
    });

    describe('processResult(args) - will detect errors', () => {
        it('A error result will return an error', () => {
            return processResult('An Error', true)
                .then((result) => {
                    expect(result.indexOf('Process user registration error')).not.to.eql(-1);
                });
        });

        it('A good result will return bucket list items', () => {
            return processResult(null, false)
                .then((result) => {
                    // TODO - put in more definative test for processing a user registration
                    expect(result).to.not.be.undefined;
                });
        });
    });
});