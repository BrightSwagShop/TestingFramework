import { expect, test } from '@playwright/test';
import { CategoryItemsPage, HomePage } from '../../Frontend/Pages';

test.describe('Cross-repo E2E smoke', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', (msg) => console.log(`PAGE_CONSOLE [${msg.type()}]: ${msg.text()}`));
    page.on('requestfailed', (request) => {
      const failure = request.failure();
      console.log(`REQUEST_FAILED: ${request.url()} ${failure ? failure.errorText : ''}`);
    });
    page.on('requestfinished', async (request) => {
      const resp = request.response();
      console.log(`REQUEST_FINISHED: ${request.url()} ${resp ? resp.status() : 'no-response'}`);
    });
  });

  test('frontend renders and loads product types from backend', async ({ page }) => {
    const homePage = new HomePage(page);
    const productTypesResponsePromise = page.waitForResponse((response) => {
      return response.url().includes('/api/producttypes') && response.request().method() === 'GET';
    });

    await homePage.navigateToHome({ mockApi: false });

    const productTypesResponse = await productTypesResponsePromise;
    expect(productTypesResponse.ok()).toBeTruthy();

    const productTypes = await productTypesResponse.json();
    expect(Array.isArray(productTypes)).toBeTruthy();
    expect(productTypes.length).toBeGreaterThan(0);

    await expect(homePage.getMainHeading()).toBeVisible();
    await expect(homePage.getProductCategories().first()).toBeVisible();
  });

  test('frontend navigation to category triggers backend products endpoint', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryItemsPage(page);

    await homePage.navigateToHome({ mockApi: false });

    await expect(homePage.getProductCategories().first()).toBeVisible();

    const productsByTypeResponsePromise = page.waitForResponse((response) => {
      return /\/api\/products\/type\//.test(response.url()) && response.request().method() === 'GET';
    });

    await homePage.getProductCategories().first().click();

    const productsByTypeResponse = await productsByTypeResponsePromise;
    expect(productsByTypeResponse.ok()).toBeTruthy();

    await expect(page).toHaveURL(/\/category\//);
    await expect(categoryPage.getCategoryHeading()).toBeVisible();
  });

  test('backend categories endpoint is reachable from CI test runner', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5076/api/categories');

    expect(response.ok()).toBeTruthy();
    const categories = await response.json();
    expect(Array.isArray(categories)).toBeTruthy();
  });
});
