"use strict";
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
    async acquireNewTokenAsync() {
        const tokenEndpoint = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
        const tokenRequest = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            scope: this.scope,
        });
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: tokenRequest.toString(),
        });
        if (!response.ok) {
            const errorContent = await response.text();
            throw new Error(`Retrieving access token failed with status code ${response.status}. Error: ${errorContent}`);
        }
        const tokenResponse = await response.json();
        if (!(tokenResponse === null || tokenResponse === void 0 ? void 0 : tokenResponse.access_token)) {
            throw new Error('Received invalid token response from Azure AD');
        }
        EntraIdAuthHelper._cachedBearerToken = tokenResponse.access_token;
        EntraIdAuthHelper._tokenExpiresAt = new Date(Date.now() + tokenResponse.expires_in * 1000);
        return tokenResponse.access_token;
    }
    async getTokenAsync() {
        if (EntraIdAuthHelper._cachedBearerToken &&
            EntraIdAuthHelper._tokenExpiresAt &&
            Date.now() < EntraIdAuthHelper._tokenExpiresAt.getTime() - 60000) {
            return EntraIdAuthHelper._cachedBearerToken;
        }
        return this.acquireNewTokenAsync();
    }
    static clearCache() {
        EntraIdAuthHelper._cachedBearerToken = null;
        EntraIdAuthHelper._tokenExpiresAt = null;
    }
    async makeAuthenticatedRequest(page, method, url, options) {
        const token = await this.getTokenAsync();
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...((options === null || options === void 0 ? void 0 : options.headers) || {}),
        };
        return page.evaluate(async (params) => {
            const response = await fetch(params.url, {
                method: params.method,
                headers: params.headers,
                body: params.body,
                ...params.options,
            });
            return {
                status: response.status,
                statusText: response.statusText,
                body: await response.text(),
                headers: (() => {
                    const result = {};
                    response.headers.forEach((value, key) => {
                        result[key] = value;
                    });
                    return result;
                })(),
            };
        }, { url, method, headers, body: options === null || options === void 0 ? void 0 : options.body, options });
    }
    async getAsync(url, method = 'GET') {
        const token = await this.getTokenAsync();
        const response = await fetch(url, {
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
        throw new Error('Missing required environment variables for EntraID authentication. ' +
            'Set ENTRA_ID_TENANT_ID, ENTRA_ID_CLIENT_ID, and ENTRA_ID_CLIENT_SECRET.');
    }
    return new EntraIdAuthHelper(tenantId, clientId, clientSecret, resolvedScope);
}
