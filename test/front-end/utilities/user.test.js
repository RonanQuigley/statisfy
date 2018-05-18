import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { fakeTokens } from '../../fixtures/authentication/';
import * as Tokens from '../../../src/client/utilities/tokens';
import * as User from '../../../src/client/utilities/user';

chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('front end - user', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('redirect user', () => {
        it('should call window.location.assign', () => {
            sandbox.stub(window.location, 'assign');
            User.redirectUser();
            expect(window.location.assign).to.be.calledOnce;
        });
    });
    describe('is an existing user', () => {
        let result;
        let getTokenStub;
        beforeEach(() => {
            getTokenStub = sandbox.stub(Tokens, 'getRefreshToken');
        });
        describe('outcome - true', () => {
            beforeEach(() => {
                getTokenStub.returns('a fake token');
                result = User.isExistingUser();
            });
            it('should call get token', () => {
                expect(Tokens.getRefreshToken).to.be.calledOnce;
            });
            it('should return true if a token exists', () => {
                expect(result).to.be.true;
            });
        });
        describe('outcome - false', () => {
            beforeEach(() => {
                getTokenStub.returns(null);
                result = User.isExistingUser();
            });
            it("should return false if an access token doesn't exist", () => {
                expect(result).to.be.false;
            });
        });
    });
    describe('process user', () => {
        let validAccessStub;
        beforeEach(() => {
            validAccessStub = sandbox.stub(Tokens, 'getValidAccessToken');
            User.rewire$redirectUser(sandbox.stub());
            sandbox.stub(Tokens, 'refreshAccessToken');
        });
        describe('outcome - redirect', () => {
            beforeEach(() => {
                validAccessStub.returns(fakeTokens.accessToken);
                User.processUser();
            });
            it('should get valid tokens', () => {
                expect(Tokens.getValidAccessToken).to.be.calledOnce;
            });
            it('should call redirect if a valid access token exists', () => {
                expect(User.redirectUser).to.be.calledOnce;
            });
        });
        describe('outcome - refresh', () => {
            beforeEach(() => {
                validAccessStub.returns(null);
                sandbox.stub(Tokens, 'getAccessAndRefreshTokens').returns({
                    accessToken: fakeTokens.accessToken,
                    refreshToken: fakeTokens.refreshToken
                });
                User.processUser();
            });
            it('should get the access (expired) and refresh tokens', () => {
                expect(Tokens.getAccessAndRefreshTokens).to.be.calledOnce;
            });
            it('should pass the tokens for refreshing', () => {
                expect(Tokens.refreshAccessToken).to.be.calledOnce;
            });
        });
    });
});
