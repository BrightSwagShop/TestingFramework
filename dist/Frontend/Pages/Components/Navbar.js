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
exports.Navbar = void 0;
class Navbar {
    constructor(page) {
        this.page = page;
    }
    // Locators
    getLogoImage() {
        return this.page.getByTestId('logo-link');
    }
    getAboutLink() {
        return this.page.getByTestId('about-link');
    }
    getContactLink() {
        return this.page.getByTestId('contact-link');
    }
    getCartIcon() {
        return this.page.getByTestId('cart-link');
    }
    // Methods
    clickLogoToHome() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getLogoImage().click();
        });
    }
    clickAbout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getAboutLink().click();
        });
    }
    clickContact() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getContactLink().click();
        });
    }
    clickCart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getCartIcon().click();
        });
    }
    // Assertions helpers
    isLogoVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getLogoImage().isVisible();
        });
    }
    isAboutLinkVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAboutLink().isVisible();
        });
    }
    isContactLinkVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getContactLink().isVisible();
        });
    }
    isCartIconVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getCartIcon().isVisible();
        });
    }
    verifyAllNavbarElements() {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.isLogoVisible()) &&
                (yield this.isAboutLinkVisible()) &&
                (yield this.isContactLinkVisible()) &&
                (yield this.isCartIconVisible()));
        });
    }
}
exports.Navbar = Navbar;
