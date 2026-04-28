import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page : Page) {
    super(page);
  }

  async navigateToHome(options: { mockApi?: boolean } = {}): Promise<void> {
    const { mockApi = true } = options;

    if (mockApi) {
      // Mock the product types API before navigating
      await this.mockProductTypesAPI();
    }
    
    await this.goto('/');
    await this.waitForPageLoad();
  }

  getMainHeading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  getHeadingText(): Promise<string> {
    return this.getText(this.getMainHeading());
  }

  getProductCategories(): Locator {
    return this.page.locator('.grid a');
  }

  async hasProductCategories(): Promise<boolean> {
  const count = await this.getProductCategories().count();
  return count > 0;
}
}