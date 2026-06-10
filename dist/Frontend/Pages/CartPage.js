"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPage = void 0;
const BasePage_1 = require("./BasePage");
class CartPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    async navigateToCart() {
        await this.goto('/winkelwagen');
        await this.waitForPageLoad();
    }
    getMainHeading() {
        return this.page.getByRole('heading', { level: 1 });
    }
    getHeadingText() {
        return this.getText(this.getMainHeading());
    }
    getShopButton() {
        return this.page.getByRole('button', { name: 'Verder winkelen' });
    }
    getCheckoutButton() {
        return this.page.getByRole('button', { name: 'Afrekenen' });
    }
}
exports.CartPage = CartPage;
