"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundPage = void 0;
const BasePage_1 = require("./BasePage");
class NotFoundPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    async navigateToNonExistentPage() {
        await this.goto('/nonexistent-page-12345');
        await this.waitForPageLoad();
    }
    getMainHeading() {
        return this.page.getByRole('heading', { level: 1 });
    }
    getHeadingText() {
        return this.getText(this.getMainHeading());
    }
    getContinueShoppingButton() {
        return this.page.getByRole('link', { name: 'Verder shoppen' });
    }
    getErrorDescription() {
        return this.page.locator('p').filter({ hasText: 'Deze pagina bestaat niet' });
    }
    async clickContinueShopping() {
        await this.click(this.getContinueShoppingButton());
    }
}
exports.NotFoundPage = NotFoundPage;
