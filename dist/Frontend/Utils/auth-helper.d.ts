import { Page } from '@playwright/test';
export interface AzureAdTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}
export interface AuthenticatedRequestResult {
    status: number;
    statusText: string;
    body: string;
    headers: Record<string, string>;
}
export declare class EntraIdAuthHelper {
    private static _cachedBearerToken;
    private static _tokenExpiresAt;
    private readonly tenantId;
    private readonly clientId;
    private readonly clientSecret;
    private readonly scope;
    constructor(tenantId: string, clientId: string, clientSecret: string, scope?: string);
    private acquireNewTokenAsync;
    getTokenAsync(): Promise<string>;
    static clearCache(): void;
    makeAuthenticatedRequest(page: Page, method: string, url: string, options?: RequestInit): Promise<AuthenticatedRequestResult>;
    getAsync<T>(url: string, method?: string): Promise<T>;
}
/**
 * Creates an EntraIdAuthHelper from environment variables.
 * Reads: ENTRA_ID_TENANT_ID, ENTRA_ID_CLIENT_ID, ENTRA_ID_CLIENT_SECRET
 * Also accepts VITE_AZURE_* and AZURE_* prefixes.
 */
export declare function createEntraIdAuthHelper(scope?: string): EntraIdAuthHelper;
