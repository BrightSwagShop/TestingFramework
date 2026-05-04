#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const PROJECT_NAME = process.env.BROWSERSTACK_PROJECT_NAME || 'BrightSwagShop - JIRA';
const BUILD_NAME = process.env.BROWSERSTACK_BUILD_NAME || `Build #${process.env.GITHUB_RUN_NUMBER || 'local'}`;
const REPORT_FILE = process.argv[2] || 'End-to-end/test-results/junit.xml';
const API_URL = 'https://test-management.browserstack.com/api/v2';

if (!USERNAME || !ACCESS_KEY) {
  console.error('[BrowserStack] Missing BROWSERSTACK_USERNAME or BROWSERSTACK_ACCESS_KEY');
  process.exit(1);
}

const auth = Buffer.from(`${USERNAME}:${ACCESS_KEY}`).toString('base64');
const headers = {
  'Authorization': `Basic ${auth}`,
  'Content-Type': 'application/json',
};

async function makeRequest(method, endpoint, body = null) {
  const url = `${API_URL}${endpoint}`;
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    console.log(`[BrowserStack] ${method} ${endpoint}`);
    const response = await fetch(url, options);
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error(`[BrowserStack] HTTP ${response.status} - ${responseText}`);
      throw new Error(`HTTP ${response.status}: ${responseText}`);
    }
    
    const jsonResponse = JSON.parse(responseText);
    console.log(`[BrowserStack] Response:`, JSON.stringify(jsonResponse).substring(0, 200));
    return jsonResponse;
  } catch (error) {
    console.error(`[BrowserStack] Request failed:`, error.message);
    throw error;
  }
}

async function uploadResults() {
  try {
    if (!fs.existsSync(REPORT_FILE)) {
      console.error(`[BrowserStack] Report file not found: ${REPORT_FILE}`);
      process.exit(1);
    }

    // Get or create project
    console.log(`[BrowserStack] Getting or creating project: ${PROJECT_NAME}`);
    const projectsResponse = await makeRequest('GET', '/projects');
    
    // Handle different response formats (array or object with projects property)
    const projectsList = Array.isArray(projectsResponse) ? projectsResponse : 
                        (projectsResponse.projects || projectsResponse.data || []);
    
    let project = projectsList.find(p => p.name === PROJECT_NAME);

    if (!project) {
      console.log('[BrowserStack] Creating project...');
      const createResponse = await makeRequest('POST', '/projects', { name: PROJECT_NAME });
      project = createResponse.project || createResponse.data || createResponse;
    }

    const projectId = project.id || project.identifier;
    console.log(`[BrowserStack] Using project: ${projectId}`);

    // Create test run
    console.log(`[BrowserStack] Creating test run: ${BUILD_NAME}`);
    const testRunResponse = await makeRequest('POST', `/projects/${projectId}/test-runs`, {
      test_run: {
        name: BUILD_NAME,
        description: `Automated cross-repo E2E run for ${BUILD_NAME}`,
      }
    });

    const testRun = testRunResponse.testRun || testRunResponse.data || testRunResponse;
    const testRunId = testRun.id || testRun.identifier;
    console.log(`[BrowserStack] Test run created: ${testRunId}`);

    // Parse JUnit XML and upload test cases
    const xml = fs.readFileSync(REPORT_FILE, 'utf-8');
    const testCases = [];

    // Simple regex-based parsing for test cases
    const testCaseRegex = /<testcase[^>]*name="([^"]*)"[^>]*classname="([^"]*)"[^>]*time="([^"]*)"/g;
    let match;

    while ((match = testCaseRegex.exec(xml)) !== null) {
      const name = match[1];
      const className = match[2];
      const time = parseFloat(match[3]) || 0;
      const fullName = `${className}.${name}`;

      // Check if test has a failure
      const hasFailed = xml.includes(`<testcase name="${name}" classname="${className}"`) && 
                       xml.match(new RegExp(`<testcase[^>]*name="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*classname="${className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>([^<]*<failure|[^<]*</testcase>)`, 's'));

      testCases.push({
        name: fullName,
        status: hasFailed ? 'FAILED' : 'PASSED',
        duration: Math.round(time * 1000),
      });
    }

    console.log(`[BrowserStack] Found ${testCases.length} test cases`);

    // Upload results for each test case
    for (const testCase of testCases) {
      try {
        console.log(`[BrowserStack] Uploading result for: ${testCase.name}`);
        await makeRequest('POST', `/projects/${projectId}/test-runs/${testRunId}/results`, {
          result: {
            name: testCase.name,
            status: testCase.status,
            duration: testCase.duration,
          }
        });
      } catch (e) {
        console.warn(`[BrowserStack] Warning: Could not upload result for ${testCase.name}:`, e.message);
      }
    }

    console.log(`[BrowserStack] Upload complete. Test run: ${testRunId}`);
  } catch (error) {
    console.error('[BrowserStack] Upload failed:', error.message);
    process.exit(1);
  }
}

uploadResults();
