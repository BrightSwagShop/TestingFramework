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
exports.HomePage = void 0;
const BasePage_1 = require("./BasePage");
class HomePage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    navigateToHome() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const { mockApi = true } = options;
            if (mockApi) {
                // Mock the product types API before navigating
                yield this.mockProductTypesAPI();
            }
            yield this.goto('/');
            yield this.waitForPageLoad();
        });
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
    hasProductCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.getProductCategories().count();
            return count > 0;
        });
    }
}
exports.HomePage = HomePage;
