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
exports.AboutPage = void 0;
const BasePage_1 = require("./BasePage");
class AboutPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    navigateToAbout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/about');
            yield this.waitForPageLoad();
        });
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
    hasCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.getCustomers().count();
            return count > 0;
        });
    }
}
exports.AboutPage = AboutPage;
