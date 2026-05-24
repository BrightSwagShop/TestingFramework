"use strict";
const environments = {
    dev: {
        apiBaseUrl: process.env.API_BASE_URL || 'http://127.0.0.1:5076',
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
        timeouts: { test: 30000, expect: 10000, navigation: 30000 }
    },
    ci: {
        apiBaseUrl: process.env.API_BASE_URL || 'http://127.0.0.1:5076',
        frontendUrl: process.env.FRONTEND_URL || 'http://127.0.0.1:5173',
        timeouts: { test: 45000, expect: 15000, navigation: 30000 }
    }
};
const currentEnv = process.env.TEST_ENV || (process.env.CI ? 'ci' : 'dev');
const config = environments[currentEnv] || environments.dev;
module.exports = { environments, config };
