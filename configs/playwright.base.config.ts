import { devices, PlaywrightTestConfig } from '@playwright/test';

const frontendUrl = (process.env.FRONTEND_URL || '').trim() || 'http://localhost:5173';
const apiBaseUrl = (process.env.API_BASE_URL || '').trim() || 'http://127.0.0.1:5076';
const isCI = !!process.env.CI;

export const basePlaywrightConfig: PlaywrightTestConfig = {
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
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  timeout: isCI ? 45_000 : 30_000,
  expect: { timeout: isCI ? 15_000 : 10_000 },
};

export { frontendUrl, apiBaseUrl };
