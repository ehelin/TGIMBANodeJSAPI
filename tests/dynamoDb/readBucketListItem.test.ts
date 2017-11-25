import {expect} from 'chai';
import * as Errors from '../../src/errors';
import {
    evaluateParameter,
    parametersExist,
    processResult,
    setParams
} from "../../src/dynamodb/deleteBucketListItem";

describe('When retrieving bucket list items', () => {
    // TODO - add type
    let query: any;

    beforeEach(() => {
        query = {
            BucketListItemId: 1,
        };
    });

    describe('evaluateParamter(args) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter({})).to.eql(Errors.ERROR_000002_AWS_DeleteBucketListItem_ParametersDoNotExist);
        });

        it('A parameter that does exist will return null', () => {
            expect(evaluateParameter(query)).to.eql(null);
        });
    });

    describe('parametersExist(args) - A parameter is required', () => {
        it('A parameter that is null should return false', () => {
            expect(parametersExist(null)).to.eql(false);
        });

        it('A parameter that is has a post, but it is empty should return false', () => {
            expect(parametersExist({})).to.eql(false);
        });

        it('A parameter that is has a body but all null properties shoule return false', () => {
            query.BucketListItemId = null;
            expect(parametersExist(query)).to.eql(false);
        });

        it('A parameter that is has a body but all undefined properties shoule return false', () => {
            query.BucketListItemId = undefined;
            expect(parametersExist(query)).to.eql(false);
        });

        it('A parameter that is has a body with expected parameters should return true', () => {
            expect(parametersExist(query)).to.eql(true);
        });
    });

    describe('processResult(args) - will detect errors', () => {
        it('A error result will return an error', () => {
            return processResult('An Error', true)
                .then((result) => {
                    expect(result.indexOf('Unable to delete item')).not.to.eql(-1);
                });
        });

        it('A good result will return bucket list items', () => {
            return processResult(null, false)
                .then((result) => {
                    // TODO - put in more definative test for a list of bucketlist items
                    expect(result).to.not.be.undefined;
                });
        });
    });

    describe('setParams(args) - will set params', () => {
        it('Good body produces good params', () => {
            const result =  setParams(query);
            expect(result.Key.BucketListItemId).to.eql(1);
        });
    });
});