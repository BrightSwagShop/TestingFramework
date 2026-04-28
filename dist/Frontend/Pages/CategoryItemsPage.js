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
exports.CategoryItemsPage = void 0;
const BasePage_1 = require("./BasePage");
class CategoryItemsPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    navigateToCategory(category_1) {
        return __awaiter(this, arguments, void 0, function* (category, options = {}) {
            const { mockApi = true } = options;
            if (mockApi) {
                // Mock the products API before navigating
                yield this.mockProductsByTypeAPI();
            }
            yield this.goto(`/category/${category}`);
            yield this.page.waitForLoadState('domcontentloaded');
        });
    }
    getCategoryHeading() {
        return this.page.locator('h1').first();
    }
    getProductCards() {
        return this.page.locator('.grid > div');
    }
    getProductCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getProductCards().count();
        });
    }
    hasProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.getProductCount();
            return count > 0;
        });
    }
    getCategoryTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getText(this.getCategoryHeading());
        });
    }
}
exports.CategoryItemsPage = CategoryItemsPage;
