import {setUpSqlServer} from "./setUp/sqlServer/create";
import {expect} from 'chai';
import {processUserRegistration} from "../src/sqlserver/processUserRegistration";
import {getBucketListItems} from "../src/sqlserver/getBucketListItems";
import {processUser} from "../src/sqlserver/processUser";
import {getUserCount} from "../src/sqlserver/getUserCount";
import {upsertBucketListItem} from "../src/sqlserver/upsertBucketListItem";
import {deleteBucketListItem} from "../src/sqlserver/deleteBucketListItem";

const user: string = 'aUser';
const listItemName: string = 'An awesome bucket list entry';

describe('When using sql server', () => {
    beforeEach(async () => {
        return setUpSqlServer()
            .then((results) => {
                //tgimba has 6 sql server tbls
                expect(results.length).to.eql(6);
            });
    });

    describe('and the datasbase is running and accessible', () => {
        it('a user can be registered, logged in, the user count verified, add a bucket list item, retrieve the bucketlist item, update that bucket list item, verify the bucket list item has been updated and delete it', () => {

            // a user can be registered
            // TODO - handle salt and other code currently handled by .net code
            return processProcessUserRegistration()
                .then((result: any) => {

                // logged in
                // TODO - handle salt and other code currently handled by .net code
                return processProcessUser()
            .then((result: any) => {

                // the user count verified
                return processGetUserCount()
            .then((result: any) => {

                // add a bucket list item
                return processUpsertBucketListItem('12/1/2002')
            .then(() => {

                // TODO - updates should not be creating a new record...why is this?
                // retrieve the bucketlist item
                return processGetBucketListItems('12/1/2002', 1)

            .then(() => {

                // update that bucket list item
                return processUpsertBucketListItem('12/1/2012')
            .then(() => {

                // verify the bucket list item has been updated
                return processGetBucketListItems('12/1/2012', 2)
            .then((bucketListItem: any) => {

                // and delete it
                return processDeleteBucketListItem(bucketListItem[0].BucketListItemId)
            .then(() => {

                // verify the bucket list item has been deleted
                return processGetBucketListItems('12/1/2012', 1);
            });
            });
            });
            })
            });
            });
            });
            });
        });
    });
});

const processDeleteBucketListItem = (bucketListId: number): Promise<void> => {
    const deleteRequest: any = {
        BucketListItemId: bucketListId,
    };

    return deleteBucketListItem(deleteRequest)
        .then((result: any) => {
            expect(result).to.eql('Deleted!');
        });
};
const processProcessUserRegistration = (): Promise<void> => {
    const request: any = {
        userName: user,
        salt: 'salt',
        passWord: 'aPassword',
        email: 'anEmail@talktome.com'
    };

    return processUserRegistration(request)
        .then((result: any) => {
            expect(result[0].result).to.eql(1);  //1 is true for insert, 0 is false
    });
};
const processProcessUser = (): Promise<void> => {
    const loginRequest: any = {
        user: user,
        pass: 'aPassword',
    };

    return processUser(loginRequest)
        .then((result: any) => {
            expect(result).to.eql(true);
        });
};
const processGetUserCount = (): Promise<void> => {
    return getUserCount()
        .then((result: any) => {
            expect(result).to.eql(1);
        });
};
const processUpsertBucketListItem = (date: string): Promise<void> => {
    const addBucketListItemRequest: any = {
        bucketListItems: [
            {
                ListItemName: listItemName,
                Created: date,
                Category: 'Hot',
                Achieved: '1',
                BucketListItemId: null,
            },
        ],
        user,
    };

    return upsertBucketListItem(addBucketListItemRequest)
        .then((result: any) => {
            expect(result).to.eql('Loaded!');
        });
};
const processGetBucketListItems = (date: string, itemCount: number): Promise<any> => {
    const query: any = {
        userName: user,
        sortString: '',
    };

    return getBucketListItems(query)
        .then((result: any) => {
            expect(result.length).to.eql(itemCount);
            expect(result[0].ListItemName).to.eql(listItemName);

            //TODO - why is the date comparison not working?
            //expect(result[0].Created.toString()).to.eq(new Date(date).toString());

            return result;
        });
};
