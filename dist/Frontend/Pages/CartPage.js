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
exports.CartPage = void 0;
const BasePage_1 = require("./BasePage");
class CartPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    navigateToCart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/winkelwagen');
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
        return this.page.getByRole('button', { name: 'Verder winkelen' });
    }
    getCheckoutButton() {
        return this.page.getByRole('button', { name: 'Afrekenen' });
    }
}
exports.CartPage = CartPage;
