"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutPage = void 0;
const BasePage_1 = require("./BasePage");
class AboutPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    async navigateToAbout() {
        await this.goto('/about');
        await this.waitForPageLoad();
    }
    getMainHeading() {
        return this.page.getByRole('heading', { level: 1 });
    }
    getHeadingText() {
        return this.getText(this.getMainHeading());
    }
    getShopButton() {
        return this.page.getByRole('link', { name: 'Shop' });
    }
    getContactButton() {
        return this.page.getByTestId('contact-button');
    }
    getCustomers() {
        return this.page.locator('.grid');
    }
    async hasCustomers() {
        const count = await this.getCustomers().count();
        return count > 0;
    }
}
exports.AboutPage = AboutPage;
