import { Page, Locator } from '@playwright/test';

export class Footer {
  constructor(readonly page: Page) {}

  // Locators
  getLogoImage(): Locator {
    return this.page.getByTestId('footer-logo-link');
  }

  getAboutLink(): Locator {
    return this.page.getByTestId('footer-about-link');
  }

  getContactLink(): Locator {
    return this.page.getByTestId('footer-contact-link');
  }

  getLinkedInLink(): Locator {
    return this.page.getByTestId('footer-linkedin');
  }

  getFacebookLink(): Locator {
    return this.page.getByTestId('footer-facebook');
  }

  getInstagramLink(): Locator {
    return this.page.getByTestId('footer-instagram');
  }

  getRightsText(): Locator {
    return this.page.locator('footer').getByText(' Brightest. All rights reserved.');
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

  async clickLinkedIn(): Promise<void> {
    await this.getLinkedInLink().click();
  }

  async clickFacebook(): Promise<void> {
    await this.getFacebookLink().click();
  }

  async clickInstagram(): Promise<void> {
    await this.getInstagramLink().click();
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

  async isLinkedInLinkVisible(): Promise<boolean> {
    return await this.getLinkedInLink().isVisible();
  }

  async isFacebookLinkVisible(): Promise<boolean> {
    return await this.getFacebookLink().isVisible();
  }

  async isInstagramLinkVisible(): Promise<boolean> {
    return await this.getInstagramLink().isVisible();
  }

  async isRightsTextVisible(): Promise<boolean> {
    return await this.getRightsText().isVisible();
  }

  async verifyAllFooterElements(): Promise<boolean> {
    return (
      (await this.isLogoVisible()) &&
      (await this.isAboutLinkVisible()) &&
      (await this.isContactLinkVisible()) &&
      (await this.isRightsTextVisible()) &&
      (await this.isLinkedInLinkVisible()) &&
      (await this.isFacebookLinkVisible()) &&
      (await this.isInstagramLinkVisible())
    );
  }
}