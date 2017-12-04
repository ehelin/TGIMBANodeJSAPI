import {setUpSqlServer} from "./setUp/sqlServer/create";
import {expect} from 'chai';

describe('When using sql server', () => {
    beforeEach(async () => {
        // TODO - handle clearing database tables from a previous run
    });

    describe('the database should be accessible and running', () => {
        it('a list of databases should be returned', async () => {
            return setUpSqlServer()
                .then((results) => {
                    //tgimba has 6 sql server tbls
                    expect(results.length).to.eql(6);
                });
        }).timeout(5000);
    });
});