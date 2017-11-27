import {expect} from 'chai';
import * as Errors from '../../src/errors';
import {
    evaluateParameter,
    parametersExist,
    setParams,
    parseResult
} from "../../src/dynamodb/readBucketListItem";
import {BucketListId} from "../../src/dynamodb/dto/objectInterfaces";

describe('When retrieving bucket list items', () => {
    let query: BucketListId;
    let emptyQuery: BucketListId;

    beforeEach(() => {
        query = {
            BucketListItemId: '1',
        };

        emptyQuery = {
            BucketListItemId: null,
        };
    });

    describe('evaluateParamter(args) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter(emptyQuery)).to.eql(Errors.ERROR_000001_AWS_GetBucketListItems_ParametersDoNotExist);
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
            expect(parametersExist(emptyQuery)).to.eql(false);
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

    describe('setParams(args) - will set params', () => {
        it('Good body produces good params', () => {
            const result =  setParams(query);
            expect(result.Key.BucketListItemId).to.eql({
                "S": "1"
            });
        });
    });

    describe('parseResult(args) - will parse the results', () => {
        const dynamoDbItem: any = {
            Item: {
                Category: {
                    S: 'someone@aol.com'
                },
                UserName: {
                    S: 'UserName'
                },
                Achieved: {
                    S: 'passwordSalt'
                },
                BucketListItemId: {
                    S: '1'
                },
                ListItemName: {
                    S: 'List Item Name'
                },
                CategorySortOrder: {
                    S: '4'
                },
                Created: {
                    S: 'create a date'
                }
            }
        };

        const expectedResult: any = {
            ListItemName: 'List Item Name',
            Created: 'create a date',
            Category: 'someone@aol.com',
            CategorySortOrder: '4',
            Achieved: 'passwordSalt',
            BucketListItemId: '1',
            UserName: 'UserName',
        };

        it('Parses a db item to a bucketListitem', () => {
            const result =  parseResult(dynamoDbItem);
            expect(result).to.eql(expectedResult);
        });
    });
});