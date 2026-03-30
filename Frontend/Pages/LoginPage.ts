import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page : Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.goto('/login');
    await this.waitForPageLoad();
  }

  getMainLogo() {
    return this.page.locator('img[src*="logo"], img[alt*="Brightest"], img[alt*="logo"]');
  }

  getLoginButton(): Locator {
    return this.page.getByRole('button', { name: /login with microsoft|sign in with microsoft/i });
  }
}