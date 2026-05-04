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

  async onTestRunFinished(result) {
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
    } catch (error) {
      console.error('[BrowserStack] Error sending test results:', error.message);
    }
  }

  async onTestStepFinished(step) {
    // Optional: Track individual step results
    this.testResults.push({
      name: step.pickle.name,
      status: step.result.status,
      duration: step.result.duration?.nanos || 0
    });
  }
}

module.exports = BrowserStackReporter;
