import { Page, Locator } from '@playwright/test';

export class Navbar {
  constructor(readonly page: Page) {}

  // Locators
  getLogoImage(): Locator {
    return this.page.getByTestId('logo-link');
  }

  getAboutLink(): Locator {
    return this.page.getByTestId('about-link');
  }

  getContactLink(): Locator {
    return this.page.getByTestId('contact-link');
  }

  getCartIcon(): Locator {
    return this.page.getByTestId('cart-link');
  }

  // Methods
  async clickLogoToHome(): Promise<void> {
    await this.getLogoImage().click();
  }

  async clickAbout(): Promise<void> {
    await this.getAboutLink().click();
  }

  async clickContact(): Promise<void> {
    await this.getContactLink().click();
  }

  async clickCart(): Promise<void> {
    await this.getCartIcon().click();
  }

  // Assertions helpers
  async isLogoVisible(): Promise<boolean> {
    return await this.getLogoImage().isVisible();
  }

  async isAboutLinkVisible(): Promise<boolean> {
    return await this.getAboutLink().isVisible();
  }

  async isContactLinkVisible(): Promise<boolean> {
    return await this.getContactLink().isVisible();
  }

  async isCartIconVisible(): Promise<boolean> {
    return await this.getCartIcon().isVisible();
  }

  async verifyAllNavbarElements(): Promise<boolean> {
    return (
      (await this.isLogoVisible()) &&
      (await this.isAboutLinkVisible()) &&
      (await this.isContactLinkVisible()) &&
      (await this.isCartIconVisible())
    );
  }
}