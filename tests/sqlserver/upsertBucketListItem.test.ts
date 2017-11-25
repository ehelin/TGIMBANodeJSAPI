import {expect} from 'chai';
import * as Errors from '../../src/errors';
import {evaluateParameter, parametersExist, processResult} from "../../src/sqlserver/upsertBucketListItem";

describe('When processing user registrations', () => {
    // TODO - add type
    let postBody: any;

    beforeEach(() => {
        postBody = {
            user: 'aUser',
            bucketListItems: [
                {
                    ListItemName: 'List Item Name',
                    Created: 'create a date',
                    Category: 'someone@aol.com',
                    Achieved: 'passwordSalt',
                    BucketListItemId: 'BucketListItemId',
                    UserName: 'UserName',
                }
            ],
        };
    });

    describe('evaluateParamter(args) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter({})).to.eql(Errors.ERROR_000002_UpsertBucketListItem_ParametersDoNotExist);
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

        it('A parameter that is has an undefined user should return false', () => {
            postBody.user = undefined;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has an null user should return false', () => {
            postBody.user = null;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has an undefined bucketList should return false', () => {
            postBody.bucketListItems = undefined;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has an null bucketList should return false', () => {
            postBody.bucketListItems = null;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has an empty bucketList array should return false', () => {
            postBody.bucketListItems = [];
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
                    expect(result.indexOf('Upsert bucket list item error')).not.to.eql(-1);
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