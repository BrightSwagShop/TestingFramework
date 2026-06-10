"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
class Navbar {
    constructor(page) {
        this.page = page;
    }
    // Locators
    getLogoImage() {
        return this.page.getByTestId('logo-link');
    }
    getAboutLink() {
        return this.page.getByTestId('about-link');
    }
    getContactLink() {
        return this.page.getByTestId('contact-link');
    }
    getCartIcon() {
        return this.page.getByTestId('cart-link');
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
    async clickCart() {
        await this.getCartIcon().click();
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
    async isCartIconVisible() {
        return await this.getCartIcon().isVisible();
    }
    async verifyAllNavbarElements() {
        return ((await this.isLogoVisible()) &&
            (await this.isAboutLinkVisible()) &&
            (await this.isContactLinkVisible()) &&
            (await this.isCartIconVisible()));
    }
}
exports.Navbar = Navbar;
