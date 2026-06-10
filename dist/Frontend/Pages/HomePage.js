"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const BasePage_1 = require("./BasePage");
class HomePage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    async navigateToHome(options = {}) {
        const { mockApi = true } = options;
        if (mockApi) {
            // Mock the product types API before navigating
            await this.mockProductTypesAPI();
        }
        await this.goto('/');
        await this.waitForPageLoad();
    }
    getMainHeading() {
        return this.page.getByRole('heading', { level: 1 });
    }
    getHeadingText() {
        return this.getText(this.getMainHeading());
    }
    getProductCategories() {
        return this.page.locator('.grid a');
    }
    async hasProductCategories() {
        const count = await this.getProductCategories().count();
        return count > 0;
    }
}
exports.HomePage = HomePage;
