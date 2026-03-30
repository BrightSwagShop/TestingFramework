import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class CartPage extends BasePage {
  constructor(page : Page) {
    super(page);
  }

  async navigateToCart(): Promise<void> {
    await this.goto('/winkelwagen');
    await this.waitForPageLoad();
  }

  getMainHeading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  getHeadingText(): Promise<string> {
    return this.getText(this.getMainHeading());
  }

  getShopButton(): Locator {
    return this.page.getByRole('button', { name: 'Verder winkelen' });
  }

  getCheckoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Afrekenen' });
  }
}