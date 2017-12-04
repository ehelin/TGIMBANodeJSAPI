import {setUpSqlServer} from "./setUp/sqlServer/create";
import {expect} from 'chai';

describe('When using sql server', () => {
    beforeEach(async () => {
    });

    describe('the database should be accessible and running', () => {
        it('a list of databases should be returned', async () => {
            return setUpSqlServer()
                .then((results) => {
                    expect(results.length).to.eql(4);
                });
        }).timeout(5000);
    });
});