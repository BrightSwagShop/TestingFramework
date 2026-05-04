"use strict";
const token = process.env.BROWSERSTACK_ACCESS_KEY;
const username = process.env.BROWSERSTACK_USERNAME;
const missing = [];
if (!token)
    missing.push('BROWSERSTACK_ACCESS_KEY');
if (!username)
    missing.push('BROWSERSTACK_USERNAME');
if (missing.length > 0) {
    console.error('[BrowserStack] Missing required environment variables for reporting:');
    for (const envName of missing) {
        console.error(`- ${envName}`);
    }
    process.exit(1);
}
console.log('[BrowserStack] Environment is configured for test result reporting.');
