#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Debug script: show what TestingFramework uploader extracts from JUnit
const REPORT_FILE = 'End-to-end/test-results/junit.xml';

function parseJUnit(reportFile) {
  const xml = fs.readFileSync(reportFile, 'utf-8');
  const testCases = [];
  const testCaseDetails = new Map();

  // Flexible regex to handle testcase tags with attributes in any order
  const testCaseRegex = /<testcase[^>]+>/g;
  let match;

  while ((match = testCaseRegex.exec(xml)) !== null) {
    const tag = match[0];
    const nameMatch = tag.match(/name="([^"]*)"/);
    const classNameMatch = tag.match(/classname="([^"]*)"/);
    const timeMatch = tag.match(/time="([^"]*)"/);
    
    if (!nameMatch || !classNameMatch) continue;
    
    const name = nameMatch[1];
    const className = classNameMatch[1];
    const time = parseFloat(timeMatch ? timeMatch[1] : 0) || 0;
    const fullName = `${className}::${name}`;

    // Find the matching closing tag and extract content
    const startIdx = xml.indexOf(tag);
    const closingTag = `</testcase>`;
    const closingIdx = xml.indexOf(closingTag, startIdx);
    if (closingIdx === -1) continue;

    const testcaseContent = xml.substring(startIdx + tag.length, closingIdx);
    
    // Check if test has a failure
    const hasFailed = testcaseContent.includes('<failure');
    
    // Extract failure or system-out as description and steps
    let description = '';
    const steps = [];
    
    const failureMatch = testcaseContent.match(/<failure[^>]*>([\s\S]*?)<\/failure>/);
    if (failureMatch) {
      description = failureMatch[1].trim();
      steps.push({ name: 'Failure', action: failureMatch[1].trim(), status: 'failed' });
    } else {
      const sysOut = testcaseContent.match(/<system-out[^>]*>([\s\S]*?)<\/system-out>/);
      if (sysOut) {
        description = sysOut[1].trim();
        steps.push({ name: 'Output', action: sysOut[1].trim(), status: 'passed' });
      }
    }

    testCaseDetails.set(fullName, { description, steps });

    testCases.push({
      name: fullName,
      status: hasFailed ? 'FAILED' : 'PASSED',
      duration: Math.round(time * 1000),
    });
  }

  return { testCases, testCaseDetails };
}

console.log('=== TestingFramework JUnit Parse Debug ===\n');
const { testCases, testCaseDetails } = parseJUnit(REPORT_FILE);

console.log(`Parsed ${testCases.length} test cases:\n`);

for (const tc of testCases) {
  const detail = testCaseDetails.get(tc.name);
  console.log(`\n[${tc.status}] ${tc.name}`);
  console.log(`  Duration: ${tc.duration}ms`);
  console.log(`  Description: ${detail.description || '(none)'}`);
  console.log(`  Steps: ${detail.steps.length}`);
  for (const step of detail.steps) {
    console.log(`    - [${step.status}] ${step.name}: ${step.action.substring(0, 60)}...`);
  }

  // Show what would be sent to BrowserStack
  const resultPayload = {
    status: tc.status.toLowerCase() === 'passed' ? 'passed' : 'failed',
    duration: tc.duration,
  };
  if (detail.steps && detail.steps.length) {
    resultPayload.steps = detail.steps.map((s, idx) => ({ index: idx + 1, name: s.name, action: s.action, status: s.status }));
  }
  console.log(`  BrowserStack Result Payload:`);
  console.log(`    ${JSON.stringify(resultPayload, null, 2).split('\n').join('\n    ')}`);
}

console.log(`\n=== Test Case Creation Payloads ===\n`);

for (const [name, detail] of testCaseDetails.entries()) {
  const payload = { name };
  if (detail.description) payload.description = detail.description;
  if (detail.steps) payload.steps = detail.steps;

  console.log(`\nTest Case: ${name}`);
  console.log(`Create Payload:`);
  console.log(`  ${JSON.stringify({ test_case: payload }, null, 2).split('\n').join('\n  ')}`);
}
