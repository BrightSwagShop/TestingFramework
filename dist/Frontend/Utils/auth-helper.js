"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntraIdAuthHelper = void 0;
exports.createEntraIdAuthHelper = createEntraIdAuthHelper;
class EntraIdAuthHelper {
    constructor(tenantId, clientId, clientSecret, scope) {
        this.tenantId = tenantId;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.scope = scope || `${clientId}/.default`;
    }
    acquireNewTokenAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenEndpoint = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
            const tokenRequest = new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                scope: this.scope,
            });
            const response = yield fetch(tokenEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: tokenRequest.toString(),
            });
            if (!response.ok) {
                const errorContent = yield response.text();
                throw new Error(`Retrieving access token failed with status code ${response.status}. Error: ${errorContent}`);
            }
            const tokenResponse = yield response.json();
            if (!(tokenResponse === null || tokenResponse === void 0 ? void 0 : tokenResponse.access_token)) {
                throw new Error('Received invalid token response from Azure AD');
            }
            EntraIdAuthHelper._cachedBearerToken = tokenResponse.access_token;
            EntraIdAuthHelper._tokenExpiresAt = new Date(Date.now() + tokenResponse.expires_in * 1000);
            return tokenResponse.access_token;
        });
    }
    getTokenAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (EntraIdAuthHelper._cachedBearerToken &&
                EntraIdAuthHelper._tokenExpiresAt &&
                Date.now() < EntraIdAuthHelper._tokenExpiresAt.getTime() - 60000) {
                return EntraIdAuthHelper._cachedBearerToken;
            }
            return this.acquireNewTokenAsync();
        });
    }
    static clearCache() {
        EntraIdAuthHelper._cachedBearerToken = null;
        EntraIdAuthHelper._tokenExpiresAt = null;
    }
    makeAuthenticatedRequest(page, method, url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getTokenAsync();
            const headers = Object.assign({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, ((options === null || options === void 0 ? void 0 : options.headers) || {}));
            return page.evaluate((params) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(params.url, Object.assign({ method: params.method, headers: params.headers, body: params.body }, params.options));
                return {
                    status: response.status,
                    statusText: response.statusText,
                    body: yield response.text(),
                    headers: Object.fromEntries(response.headers),
                };
            }), { url, method, headers, body: options === null || options === void 0 ? void 0 : options.body, options });
        });
    }
    getAsync(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, method = 'GET') {
            const token = yield this.getTokenAsync();
            const response = yield fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
            }
            return response.json();
        });
    }
}
exports.EntraIdAuthHelper = EntraIdAuthHelper;
EntraIdAuthHelper._cachedBearerToken = null;
EntraIdAuthHelper._tokenExpiresAt = null;
/**
 * Creates an EntraIdAuthHelper from environment variables.
 * Reads: ENTRA_ID_TENANT_ID, ENTRA_ID_CLIENT_ID, ENTRA_ID_CLIENT_SECRET
 * Also accepts VITE_AZURE_* and AZURE_* prefixes.
 */
function createEntraIdAuthHelper(scope) {
    const tenantId = process.env.ENTRA_ID_TENANT_ID ||
        process.env.AZURE_TENANT_ID ||
        process.env.VITE_AZURE_TENANT_ID;
    const clientId = process.env.ENTRA_ID_CLIENT_ID ||
        process.env.AZURE_CLIENT_ID ||
        process.env.VITE_AZURE_CLIENT_ID;
    const clientSecret = process.env.ENTRA_ID_CLIENT_SECRET ||
        process.env.VITE_AZURE_CLIENT_SECRET ||
        process.env.AZURE_CLIENT_SECRET ||
        process.env.CLIENT_SECRET;
    const resolvedScope = scope || process.env.ENTRA_ID_SCOPE || process.env.AZURE_SCOPE;
    if (!tenantId || !clientId || !clientSecret) {
        throw new Error('Missing required env vars for EntraID auth. ' +
            'Set ENTRA_ID_TENANT_ID, ENTRA_ID_CLIENT_ID, and ENTRA_ID_CLIENT_SECRET.');
    }
    return new EntraIdAuthHelper(tenantId, clientId, clientSecret, resolvedScope);
}
