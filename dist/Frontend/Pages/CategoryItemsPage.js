"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryItemsPage = void 0;
const BasePage_1 = require("./BasePage");
class CategoryItemsPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    async navigateToCategory(category, options = {}) {
        const { mockApi = true } = options;
        if (mockApi) {
            // Mock the products API before navigating
            await this.mockProductsByTypeAPI();
        }
        await this.goto(`/category/${category}`);
        await this.page.waitForLoadState('domcontentloaded');
    }
    getCategoryHeading() {
        return this.page.locator('h1').first();
    }
    getProductCards() {
        return this.page.locator('.grid > div');
    }
    async getProductCount() {
        return this.getProductCards().count();
    }
    async hasProducts() {
        const count = await this.getProductCount();
        return count > 0;
    }
    async getCategoryTitle() {
        return this.getText(this.getCategoryHeading());
    }
}
exports.CategoryItemsPage = CategoryItemsPage;
