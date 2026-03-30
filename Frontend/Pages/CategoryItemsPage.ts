import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class CategoryItemsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToCategory(category: string): Promise<void> {
    // Mock the products API before navigating
    await this.mockProductsByTypeAPI();
    
    await this.goto(`/category/${category}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  getCategoryHeading(): Locator {
    return this.page.locator('h1').first();
  }

  getProductCards(): Locator {
    return this.page.locator('.grid > div');
  }

  async getProductCount(): Promise<number> {
    return this.getProductCards().count();
  }

  async hasProducts(): Promise<boolean> {
    const count = await this.getProductCount();
    return count > 0;
  }

  async getCategoryTitle(): Promise<string> {
    return this.getText(this.getCategoryHeading());
  }
}
