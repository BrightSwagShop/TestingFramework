const axios = require('axios');

class BrowserStackPlaywrightReporter {
  constructor(options = {}) {
    this.username = process.env.BROWSERSTACK_USERNAME;
    this.accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
    this.projectName = process.env.BROWSERSTACK_PROJECT_NAME || 'BrightSwagShop - JIRA';
    this.buildName = process.env.BROWSERSTACK_BUILD_NAME || `Build #${process.env.GITHUB_RUN_NUMBER || 'local'}`;
    
    this.startTime = Date.now();
    this.testResults = [];
  }

  onBegin(config, suite) {
    console.log(`[BrowserStack] Starting test run: ${this.buildName}`);
  }

  onTestEnd(test, result) {
    this.testResults.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message || null
    });
  }

  onEnd(result) {
    const duration = Math.round((Date.now() - this.startTime) / 1000);
    const passed = this.testResults.filter(t => t.status === 'passed').length;
    const failed = this.testResults.filter(t => t.status === 'failed').length;
    const skipped = this.testResults.filter(t => t.status === 'skipped').length;
    
    console.log(`[BrowserStack] Test run completed:`);
    console.log(`  - Total: ${this.testResults.length}`);
    console.log(`  - Passed: ${passed}`);
    console.log(`  - Failed: ${failed}`);
    console.log(`  - Skipped: ${skipped}`);
    console.log(`  - Duration: ${duration}s`);
    console.log(`  - Build: ${this.buildName}`);
    console.log(`  - Project: ${this.projectName}`);
  }
}

module.exports = BrowserStackPlaywrightReporter;
