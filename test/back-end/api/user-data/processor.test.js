import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import processData from '../../../../src/server/api/user-data/processor';
import fakeRawData from 'fixtures/spotify/raw-data/normal';
import fakeProcessedData from 'fixtures/spotify/processed-data';
chai.use(sinonChai);
chai.use(chaiAsPromised);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - processor', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('process data', () => {
        it('should return a correctly processed object', () => {
            const result = processData(fakeRawData);
            expect(result).to.deep.equal(fakeProcessedData);
        });
    });
});
