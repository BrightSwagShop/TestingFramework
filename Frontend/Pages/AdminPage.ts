import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

/**
 * AdminPage - Page Object representing the admin section of the application
 * Handles navigation and interactions with admin pages
 */
export class AdminPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the main admin page
   */
  async navigateToAdmin(): Promise<void> {
    await this.goto('/admin');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to admin dashboard
   */
  async navigateToDashboard(): Promise<void> {
    await this.goto('/admin/dashboard');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to admin users page
   */
  async navigateToUsers(): Promise<void> {
    await this.goto('/admin/users');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to admin products page
   */
  async navigateToProducts(): Promise<void> {
    await this.goto('/admin/products');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to admin settings page
   */
  async navigateToSettings(): Promise<void> {
    await this.goto('/admin/settings');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to admin bugs page
   */
  async navigateToBugs(): Promise<void> {
    await this.goto('/admin/bugs');
    await this.waitForPageLoad();
  }

  /**
   * Get the admin sidebar element
   */
  getSidebar(): Locator {
    return this.page.getByTestId('admin-sidebar');
  }

  /**
   * Get the admin dashboard title
   */
  getDashboardTitle(): Locator {
    return this.page.getByRole('heading', { name: /Admin|Dashboard/i });
  }

  /**
   * Get the page title/heading
   */
  getPageHeading(): Locator {
    return this.page.locator('h1, h2');
  }

  /**
   * Check if currently on admin section (by checking URL)
   */
  async isOnAdminPage(): Promise<boolean> {
    return this.page.url().includes('/admin');
  }

  /**
   * Get the user profile section (typically in header/navbar)
   */
  getUserProfile(): Locator {
    return this.page.getByTestId('user-profile') || this.page.getByRole('button', { name: /profile|account/i });
  }

  /**
   * Get logout button
   */
  getLogoutButton(): Locator {
    return this.page.getByRole('button', { name: /logout|Sign out|Abmelden/i });
  }

  /**
   * Logout from admin section
   */
  async logout(): Promise<void> {
    const logoutButton = this.getLogoutButton();
    await logoutButton.click();
    await this.waitForPageLoad();
  }
}
