import {expect} from 'chai';
import {
    parametersExist,
    evaluateParameter,
    processResult
} from '../../src/sqlserver/DeleteBucketListItem';
import * as Errors from '../../src/errors';

describe('When deleting a bucket list item', () => {
    const postBody: any = {
        BucketListItemId: 2,
    };

    describe('parametersExist(arg) - A parameter is required', () => {
        it('A parameter that is null should return false', () => {
            expect(parametersExist(null)).to.eql(false);
        });

        it('A parameter that is has a body but no bucketListId should return false', () => {
            expect(parametersExist({})).to.eql(false);
        });

        it('A parameter that is has a body with an undefined bucketListId should return false', () => {
            expect(parametersExist({BucketListId: undefined})).to.eql(false);
        });

        it('A parameter that is has a body with a bucketListId should return true', () => {
            expect(parametersExist(postBody)).to.eql(true);
        });
    });

    describe('evaluateParamter(arg) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter({})).to.eql(Errors.ERROR_000003_DeleteBucketListItem_ParametersDoNotExist);
        });

        it('A parameter that does exist will return null', () => {
            expect(evaluateParameter(postBody)).to.eql(null);
        });
    });

    describe('processResult(arg) - will detect errors', () => {
        it('A error result will return an error', () => {
            return processResult('An Error', true)
                .then((result) => {
                    expect(result.indexOf('Delete bucket list item error')).not.to.eql(-1);
                });
        });

        it('A good result will "Deleted"', () => {
            return processResult(null, false)
                .then((result) => {
                    expect(result).to.eql('Deleted!');
                });
        });
    });
});
