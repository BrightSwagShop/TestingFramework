import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class NotFoundPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToNonExistentPage(): Promise<void> {
    await this.goto('/nonexistent-page-12345');
    await this.waitForPageLoad();
  }

  getMainHeading(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  getHeadingText(): Promise<string> {
    return this.getText(this.getMainHeading());
  }

  getContinueShoppingButton(): Locator {
    return this.page.getByRole('link', { name: 'Verder shoppen' });
  }

  getErrorDescription(): Locator {
    return this.page.locator('p').filter({ hasText: 'Deze pagina bestaat niet' });
  }

  async clickContinueShopping(): Promise<void> {
    await this.click(this.getContinueShoppingButton());
  }
}
