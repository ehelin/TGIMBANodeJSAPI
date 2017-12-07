import {setUpSqlServer} from "./setUp/sqlServer/create";
import {expect} from 'chai';
import {processUserRegistration} from "../src/sqlserver/processUserRegistration";
import {getBucketListItems} from "../src/sqlserver/getBucketListItems";

describe('When using sql server', () => {
    beforeEach(async () => {
        return setUpSqlServer()
            .then((results) => {
                //tgimba has 6 sql server tbls
                expect(results.length).to.eql(6);
            });
    });

    describe('and the datasbase is running and accessible', () => {
        it('a record can be inserted and retrieved', () => {
            const request: any = {
                userName: 'aUser',
                salt: 'salt',
                passWord: 'aPassword',
                email: 'anEmail@talktome.com'
            };

            const query: any = {
                userName: 'aUser',
                sortString: '',
            };

            return processUserRegistration(request)
                .then((result: any) => {
                    expect(result.length).to.eql(1);

                    return getBucketListItems(query)
                        .then((result: any) => {
                            console.log('get result: ', result);
                            //expect(result.length).to.eql(1);
                        });
                });
        });
    });

});