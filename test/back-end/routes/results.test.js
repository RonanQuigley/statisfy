import supertest from 'supertest';
import app from '../../../src/server/';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';
import * as middleware from '../../../src/server/routes/views/results/middleware';

const agent = supertest.agent(app);
const expect = chai.expect;

chai.use(sinonChai);

const sandbox = sinon.sandbox.create();

describe('results route', () => {

    let req;
    let res;
    const next = () => { };

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        sandbox.stub(res, 'send');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/results')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(200);
        });
    });

    describe('middleware', () => {
        describe('render results page', () => {
            it('should call send', () => {
                middleware.render(req, res, next);
                expect(res.send).to.be.calledOnce;
            });
        });
    });
});
