import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class AboutPage extends BasePage {
  constructor(page : Page) {
    super(page);
  }

  async navigateToAbout(): Promise<void> {
    await this.goto('/about');
    await this.waitForPageLoad();
  }

  getMainHeading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  getHeadingText(): Promise<string> {
    return this.getText(this.getMainHeading());
  }

  getShopButton(): Locator {
    return this.page.getByRole('link', { name: 'Shop' });
  }

  getContactButton(): Locator {
    return this.page.getByTestId('contact-button');
  }

  getCustomers(): Locator {
    return this.page.locator('.grid');
  }

  async hasCustomers(): Promise<boolean> {
  const count = await this.getCustomers().count();
  return count > 0;
}
}