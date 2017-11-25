import {expect} from 'chai';
import {processResult, parseResults} from "../../src/sqlserver/getUserCount";

describe('When retrieving a count of bucket list items', () => {
    describe('processResult(args) - will detect errors', () => {
        it('A error result will return an error', () => {
            return processResult('An Error', true)
                .then((result) => {
                    expect(result.indexOf('Get bucket list items count error')).not.to.eql(-1);
                });
        });

        it('A good result will return the count', () => {
            return processResult(2, false)
                .then((result) => {
                    expect(result).to.eql(2);
                })
        });
    });

    describe('parseResults(args) - will parse results', () => {
        it('an undefined result will return 0', () => {
            expect(parseResults(undefined)).to.eql(0);
        });

        it('a null result will  return 0', () => {
            expect(parseResults(null)).to.eql(0);
        });

        it('an empty result array will return 0', () => {
            expect(parseResults([])).to.eql(0);
        });

        // TODO - add tests to parse actual results once you can compile the complete project (i.e. dateformat)
        it('a non-empty result array will return a count', () => {
            expect(parseResults(['','',''])).to.eql(3);
        });
    });
});