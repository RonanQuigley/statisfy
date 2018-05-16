import supertest from 'supertest';
import app from '../../../src/server/';
import chai from 'chai';
import httpMocks from 'node-mocks-http';
import { fakeTokens } from '../../fakes';
import sinon from 'sinon';
import * as middleware from '../../../src/server/routes/views/refresh/middleware';
import * as api from '../../../src/server/api';
import sinonChai from 'sinon-chai';

const agent = supertest.agent(app);
const expect = chai.expect;

chai.expect;

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

let req;
let res;
let nextSpy;

describe('back end - refresh route', () => {
    let refreshAccessTokenStub;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.contentType('json');
        req.headers.refreshToken = fakeTokens.refreshToken;
        refreshAccessTokenStub = sandbox.stub(api, 'refreshAccessToken');
        sandbox.spy(res, 'send');
        nextSpy = sandbox.spy();
    });

    afterEach(() => {
        sandbox.restore();
        req.headers = null;
    });

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            refreshAccessTokenStub.resolves({});
            await agent
                .get('/refresh')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('middleware', () => {
        describe('processing refresh request', () => {
            let result;

            beforeEach(() => {
                nextSpy = sandbox.stub();
            });

            it('should call next on reject', async () => {
                const error = new Error();
                refreshAccessTokenStub.rejects(error);
                await middleware.processRequest(req, res, nextSpy);
                expect(nextSpy).to.be.calledOnce.calledWith(error);
            });

            it('should send the response', async () => {
                const result = refreshAccessTokenStub.returns({});
                middleware.processRequest(req, res, nextSpy).then(() => {
                    expect(res.send).to.be.calledWith(result).calledOnce;
                });
            });

            it('should call refresh access token', async () => {
                refreshAccessTokenStub.resolves({});
                await middleware.processRequest(req, res, nextSpy);
                expect(api.refreshAccessToken).to.be.calledWith(req).calledOnce;
            });
        });
    });
});