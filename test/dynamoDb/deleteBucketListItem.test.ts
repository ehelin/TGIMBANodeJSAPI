import {expect} from 'chai';
import * as Errors from '../../src/errors';
import {
    evaluateParameter,
    parametersExist,
    setParams
} from "../../src/dynamodb/deleteBucketListItem";
import {BucketListId} from "../../src/dynamodb/dto/objectInterfaces";

describe('When deleteing a bucket list item', () => {
    let postBody: BucketListId;
    let emptyBody: BucketListId;

    beforeEach(() => {
        postBody = {
            BucketListItemId: '1',
        };

        emptyBody = {
            BucketListItemId: null,
        };
    });

    describe('evaluateParamter(args) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter(emptyBody)).to.eql(Errors.ERROR_000002_AWS_DeleteBucketListItem_ParametersDoNotExist);
        });

        it('A parameter that does exist will return null', () => {
            expect(evaluateParameter(postBody)).to.eql(null);
        });
    });

    describe('parametersExist(args) - A parameter is required', () => {
        it('A parameter that is null should return false', () => {
            expect(parametersExist(null)).to.eql(false);
        });

        it('A parameter that is has a post, but it is empty should return false', () => {
            expect(parametersExist(emptyBody)).to.eql(false);
        });

        it('A parameter that is has a body but all null properties shoule return false', () => {
            postBody.BucketListItemId = null;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has a body but all undefined properties shoule return false', () => {
            postBody.BucketListItemId = undefined;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has a body with expected parameters should return true', () => {
            expect(parametersExist(postBody)).to.eql(true);
        });
    });

    describe('setParams(args) - will set params', () => {
        it('Good body produces good params', () => {
            const result =  setParams(postBody);
            expect(result.Key.BucketListItemId).to.eql({ S: '1' } );
        });
    });
});