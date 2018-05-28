import supertest from 'supertest';
import app from 'src/server/';
import chai from 'chai';
import httpMocks from 'node-mocks-http';
import { fakeTokens } from 'fixtures/authentication/';
import sinon from 'sinon';
import * as middleware from 'src/server/router/endpoints/refresh/middleware';
import * as Tokens from 'src/server/api/authentication/tokens';
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
        req.headers.refreshToken = fakeTokens.refreshToken;
        refreshAccessTokenStub = sandbox.stub(Tokens, 'refreshAccessToken');
        sandbox.spy(res, 'send');
        nextSpy = sandbox.spy();
    });

    afterEach(() => {
        sandbox.restore();
        req.headers = null;
    });

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            refreshAccessTokenStub.resolves({
                data: 'fake'
            });
            await agent
                .post('/refresh')
                .set('Accept', 'application/json')
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
                    expect(res.send).to.be.calledWith(result).and.to.be
                        .calledOnce;
                });
            });

            it('should call refresh access token', async () => {
                refreshAccessTokenStub.resolves({});
                await middleware.processRequest(req, res, nextSpy);
                expect(Tokens.refreshAccessToken).to.be.calledWith(req).and.to
                    .be.calledOnce;
            });
        });
    });
});
