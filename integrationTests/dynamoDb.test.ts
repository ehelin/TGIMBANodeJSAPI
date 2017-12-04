import {setUpDynamoDb} from "./setUp/dynamoDb/create";
import {createBucketListItem} from "../src/dynamodb/createBucketListItem";
import {expect} from 'chai';
import {readBucketListItem} from "../src/dynamodb/readBucketListItem";
import {deleteBucketListItem} from "../src/dynamodb/deleteBucketListItem";
import {BucketListItem, BucketListId} from "../src/dynamodb/dto/objectInterfaces";

describe('When using dynamo db', () => {
    let postBody: BucketListItem;
    let query: BucketListId;
    let postDeleteBody: BucketListId;

    beforeEach(async () => {
        postBody = {
            ListItemName: 'List Item Name',
            Created: new Date().toString(),
            Category: 'category',
            CategorySortOrder: '1',
            Achieved: '1',
            BucketListItemId: '1',
            UserName: 'userName',
        };

        query = {
            BucketListItemId: '1',
        };

        postDeleteBody = {
            BucketListItemId: '1',
        };

        return setUpDynamoDb();
    });

    // TODO - add tests for error paths

    // TODO - add tests from endpoints

    describe('And a record is inserted', () => {
        it('The record should now inserted in the dynamo db', async () => {
            return createBucketListItem(postBody)
                .then((result) => expect(result).to.eql('Record Inserted!'));
        }).timeout(5000);

        it('The record should be retrievable from dynamo db', async () => {
            return createBucketListItem(postBody)
                .then((result) => {
                    return readBucketListItem(query);
                }).then((result) => {
                    expect(result).to.eql(postBody)
                });
        }).timeout(5000);

        it('The record should be updatable in the dynamo db', async () => {
            return createBucketListItem(postBody)
                .then((result) => {
                    return readBucketListItem(query);
                }).then((result) => {
                    expect(postBody.Category).to.eql('category');

                    postBody.Category = 'A New Category';
                    return createBucketListItem(postBody);
                }).then((result) => {
                    return readBucketListItem(query);
                }).then((result) => {
                    expect(result.Category).to.eql('A New Category');
                });
        }).timeout(5000);

        it('The record should be deletable from the dynamo db', async () => {
            return createBucketListItem(postBody)
                .then((result) => {
                    return readBucketListItem(query);
                }).then((result) => {
                    expect(result).to.eql(postBody);

                    return deleteBucketListItem(postDeleteBody);
                }).then((result) => {
                    expect(result).to.eql('Record Deleted!')
                });
        }).timeout(5000);
    });
});