"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = exports.frontendUrl = exports.basePlaywrightConfig = void 0;
const test_1 = require("@playwright/test");
const frontendUrl = (process.env.FRONTEND_URL || '').trim() || 'http://localhost:5173';
exports.frontendUrl = frontendUrl;
const apiBaseUrl = (process.env.API_BASE_URL || '').trim() || 'http://127.0.0.1:5076';
exports.apiBaseUrl = apiBaseUrl;
const isCI = !!process.env.CI;
exports.basePlaywrightConfig = {
    fullyParallel: !isCI,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers: isCI ? 1 : undefined,
    reporter: [
        ['html'],
        ['list'],
        ['junit', { outputFile: 'test-results/junit.xml' }],
    ],
    use: {
        baseURL: frontendUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        { name: 'chromium', use: Object.assign({}, test_1.devices['Desktop Chrome']) },
    ],
    timeout: isCI ? 45000 : 30000,
    expect: { timeout: isCI ? 15000 : 10000 },
};
