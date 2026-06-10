"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
class Footer {
    constructor(page) {
        this.page = page;
    }
    // Locators
    getLogoImage() {
        return this.page.getByTestId('footer-logo-link');
    }
    getAboutLink() {
        return this.page.getByTestId('footer-about-link');
    }
    getContactLink() {
        return this.page.getByTestId('footer-contact-link');
    }
    getLinkedInLink() {
        return this.page.getByTestId('footer-linkedin');
    }
    getFacebookLink() {
        return this.page.getByTestId('footer-facebook');
    }
    getInstagramLink() {
        return this.page.getByTestId('footer-instagram');
    }
    getRightsText() {
        return this.page.locator('footer').getByText(' Brightest. All rights reserved.');
    }
    // Methods
    async clickLogoToHome() {
        await this.getLogoImage().click();
    }
    async clickAbout() {
        await this.getAboutLink().click();
    }
    async clickContact() {
        await this.getContactLink().click();
    }
    async clickLinkedIn() {
        await this.getLinkedInLink().click();
    }
    async clickFacebook() {
        await this.getFacebookLink().click();
    }
    async clickInstagram() {
        await this.getInstagramLink().click();
    }
    // Assertions helpers
    async isLogoVisible() {
        return await this.getLogoImage().isVisible();
    }
    async isAboutLinkVisible() {
        return await this.getAboutLink().isVisible();
    }
    async isContactLinkVisible() {
        return await this.getContactLink().isVisible();
    }
    async isLinkedInLinkVisible() {
        return await this.getLinkedInLink().isVisible();
    }
    async isFacebookLinkVisible() {
        return await this.getFacebookLink().isVisible();
    }
    async isInstagramLinkVisible() {
        return await this.getInstagramLink().isVisible();
    }
    async isRightsTextVisible() {
        return await this.getRightsText().isVisible();
    }
    async verifyAllFooterElements() {
        return ((await this.isLogoVisible()) &&
            (await this.isAboutLinkVisible()) &&
            (await this.isContactLinkVisible()) &&
            (await this.isRightsTextVisible()) &&
            (await this.isLinkedInLinkVisible()) &&
            (await this.isFacebookLinkVisible()) &&
            (await this.isInstagramLinkVisible()));
    }
}
exports.Footer = Footer;
