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
const axios = require('axios');
class BrowserStackReporter {
    constructor(options = {}) {
        this.username = process.env.BROWSERSTACK_USERNAME;
        this.accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
        this.projectName = process.env.BROWSERSTACK_PROJECT_NAME || 'BrightSwagShop - JIRA';
        this.buildName = process.env.BROWSERSTACK_BUILD_NAME || `Build #${process.env.GITHUB_RUN_NUMBER || 'local'}`;
        this.apiUrl = 'https://api.browserstack.com/automate/project.json';
        this.auth = {
            username: this.username,
            password: this.accessKey
        };
        this.testResults = [];
        this.startTime = Date.now();
    }
    onTestRunFinished(result) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('[BrowserStack] Preparing to send test results...');
                const totalTests = result.scenarios.length;
                const passedTests = result.scenarios.filter(s => s.result.status === 'PASSED').length;
                const failedTests = totalTests - passedTests;
                const payload = {
                    status: failedTests === 0 ? 'passed' : 'failed',
                    name: this.buildName,
                    project_name: this.projectName,
                    tests_passed: passedTests,
                    tests_failed: failedTests,
                    tests_total: totalTests,
                    duration: Math.round((Date.now() - this.startTime) / 1000),
                };
                console.log(`[BrowserStack] Sending test results: ${passedTests}/${totalTests} passed`);
                // Send to BrowserStack (optional - remove if not needed for reporting-only mode)
                // For now, we'll just log it
                console.log('[BrowserStack] Test results:', JSON.stringify(payload, null, 2));
            }
            catch (error) {
                console.error('[BrowserStack] Error sending test results:', error.message);
            }
        });
    }
    onTestStepFinished(step) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Optional: Track individual step results
            this.testResults.push({
                name: step.pickle.name,
                status: step.result.status,
                duration: ((_a = step.result.duration) === null || _a === void 0 ? void 0 : _a.nanos) || 0
            });
        });
    }
}
module.exports = BrowserStackReporter;
