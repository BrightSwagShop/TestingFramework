"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundPage = void 0;
const BasePage_1 = require("./BasePage");
class NotFoundPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    navigateToNonExistentPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/nonexistent-page-12345');
            yield this.waitForPageLoad();
        });
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
    clickContinueShopping() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.click(this.getContinueShoppingButton());
        });
    }
}
exports.NotFoundPage = NotFoundPage;
