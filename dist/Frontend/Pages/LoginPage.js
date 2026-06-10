"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const BasePage_1 = require("./BasePage");
class LoginPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    async navigateToLogin() {
        await this.goto('/login');
        await this.waitForPageLoad();
    }
    getMainLogo() {
        return this.page.locator('img[src*="logo"], img[alt*="Brightest"], img[alt*="logo"]');
    }
    getLoginButton() {
        return this.page.getByRole('button', { name: /login with microsoft|sign in with microsoft/i });
    }
}
exports.LoginPage = LoginPage;
