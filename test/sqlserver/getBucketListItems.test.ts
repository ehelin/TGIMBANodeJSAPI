import {
    parametersExist,
    evaluateParameter,
    getIntStringAchievedValue,
    processResult,
    buildSql,
    parseResults,
} from "../../src/sqlserver/getBucketListItems";
import {expect} from 'chai';
import * as Errors from '../../src/errors';
import * as Constants from '../../src/constants';

describe('When retrieving bucket list items', () => {
    // TODO - add type
    let query: any;

    beforeEach(() => {
        query = {
            userName: 'someUser',
            sortString: 'sort',
        };
    });

    describe('parametersExist(args) - A parameter is required', () => {
        it('A parameter that is null should return false', () => {
            expect(parametersExist(null)).to.eql(false);
        });

        it('A parameter that is has a query, but it is empty should return false', () => {
            expect(parametersExist({})).to.eql(false);
        });

        describe('Parameters are undefined', () => {
            it('A parameter that is has a body with an undefined userName and sort stringshould return false', () => {
                query.userName = undefined;
                query.sortString = undefined;
                expect(parametersExist(query)).to.eql(false);
            });

            it('A parameter that is has a body with an undefined userName should return false', () => {
                query.userName = undefined;
                expect(parametersExist(query)).to.eql(false);
            });

            it('A parameter that is has a body with an undefined sortString should return false', () => {
                query.sortString = undefined;
                expect(parametersExist(query)).to.eql(false);
            });
        });

        describe('Parameters are null', () => {
            it('A parameter that is has a body with an null userName and sort strings hould return false', () => {
                query.userName = null;
                query.sortString = null;
                expect(parametersExist(query)).to.eql(false);
            });

            it('A parameter that is has a body with an null userName should return false', () => {
                query.userName = null;
                expect(parametersExist(query)).to.eql(false);
            });

            it('A parameter that is has a body with an null sortString should return false', () => {
                query.sortString = null;
                expect(parametersExist(query)).to.eql(false);
            });
        });

        it('A parameter that is has a body with a bucketListId should return true', () => {
            expect(parametersExist(query)).to.eql(true);
        });
    });

    describe('evaluateParamter(args) - will detect good parameters', () => {
        it('A parameter that does not exist will return an error', () => {
            expect(evaluateParameter({})).to.eql(Errors.ERROR_000001_GetBucketListItems_ParametersDoNotExist);
        });

        it('A parameter that does exist will return null', () => {
            expect(evaluateParameter(query)).to.eql(null);
        });
    });

    describe('getIntStringAchievedValue(args) - will return int string equivalent', () => {
        it('An int value of 2 will not return "0"', () => {
            expect(getIntStringAchievedValue(2)).to.eql('0');
        });

        it('An int value of 1 will return "1"', () => {
            expect(getIntStringAchievedValue(1)).to.eql('1');
        });

        it('An int value of 0 will return "0"', () => {
            expect(getIntStringAchievedValue(0)).to.eql('0');
        });
    });

    describe('processResult(args) - will detect errors', () => {
        it('A error result will return an error', () => {
            return processResult('An Error', true)
                .then((result) => {
                    expect(result.indexOf('Get bucket list items error')).not.to.eql(-1);
                });
        });

        it('A good result will return bucket list items', () => {
            return processResult(null, false)
                .then((result) => {
                    // TODO - put in more definative test for a list of bucketlist items
                    expect(result).to.not.be.undefined;
                });
        });
    });

    describe('buildSql(args) - will build a sql string for the supplied query string', () => {
        it('Empty query sort string will return standard sql query', () => {
            query.sortString = '';
            expect(buildSql(query)).to.eql(Constants.GET_BUCKET_LIST);
        });

        it('Non empty query sorty string will return standard sql query with sort string', () => {
            expect(buildSql(query)).to.eql(Constants.GET_BUCKET_LIST + query.sortString);
        });

        it('query category sort string will return standard sql query with modified ascending category sort string', () => {
            query.sortString = ' order by Category';
            expect(buildSql(query)).to.eql(Constants.GET_BUCKET_LIST +  'order by CategorySortOrder');
        });

        it('query category desc sort string will return standard sql query with modified desc category sort string', () => {
            query.sortString = ' order by Category desc';
            expect(buildSql(query)).to.eql(Constants.GET_BUCKET_LIST +  'order by CategorySortOrder desc');
        });

    });

    describe('parseResults(args) - will parse results', () => {
        it('an undefined result will produce a null array', () => {
            expect(parseResults(undefined)).to.eql(null);
        });

        it('a null result will produce a null array', () => {
            expect(parseResults(null)).to.eql(null);
        });

        it('an empty result array will produce an empty results array', () => {
            expect(parseResults([])).to.eql([]);
        });

        // TODO - add tests to parse actual results once you can compile the complete project (i.e. dateformat)
    });
});