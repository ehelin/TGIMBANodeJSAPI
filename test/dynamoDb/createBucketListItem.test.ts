import {expect} from 'chai';
import * as Errors from '../../src/errors';
import {
    evaluateParameter,
    parametersExist,
    setParams
} from "../../src/dynamodb/createBucketListItem";
import {BucketListItem} from "../../src/dynamodb/dto/objectInterfaces";

describe('When retrieving bucket list items', () => {
    let postBody: BucketListItem;
    let emptyBody: BucketListItem;

    beforeEach(() => {
        postBody = {
            ListItemName: 'List Item Name',
            Created: new Date().toString(),
            Category: 'Hot',
            CategorySortOrder: '',
            Achieved: '1',
            BucketListItemId: '1',
            UserName: 'userName',
        };

        emptyBody = {
            ListItemName: null,
            Created: null,
            Category: null,
            CategorySortOrder: null,
            Achieved: null,
            BucketListItemId: null,
            UserName: null,
        };
    });

    describe('evaluateParamter(args) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter(emptyBody)).to.eql(Errors.ERROR_000003_AWS_CreateBucketListItem_ParametersDoNotExist);
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
            postBody.Achieved = null;
            postBody.BucketListItemId = null;
            postBody.Category = null;
            postBody.CategorySortOrder = null;
            postBody.Created = null;
            postBody.ListItemName = null;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has a body but all undefined properties shoule return false', () => {
            postBody.Achieved = undefined;
            postBody.BucketListItemId = undefined;
            postBody.Category = undefined;
            postBody.CategorySortOrder = undefined;
            postBody.Created = undefined;
            postBody.ListItemName = undefined;
            expect(parametersExist(postBody)).to.eql(false);
        });

        it('A parameter that is has a body with expected parameters should return true', () => {
            expect(parametersExist(postBody)).to.eql(true);
        });
    });

    describe('setParams(args) - will set params', () => {
        it('Good body produces good params', () => {
            const result =  setParams(postBody);
            expect(result.Item.Achieved).to.eql({
                'S': '1'
            });
        });
    });
});