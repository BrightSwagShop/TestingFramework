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
exports.Footer = void 0;
class Footer {
    constructor(page) {
        this.page = page;
    }
    // Locators
    getLogoImage() {
        return this.page.getByTestId('footer-logo-link');
    }
    getAboutLink() {
        return this.page.getByTestId('footer-about-link');
    }
    getContactLink() {
        return this.page.getByTestId('footer-contact-link');
    }
    getLinkedInLink() {
        return this.page.getByTestId('footer-linkedin');
    }
    getFacebookLink() {
        return this.page.getByTestId('footer-facebook');
    }
    getInstagramLink() {
        return this.page.getByTestId('footer-instagram');
    }
    getRightsText() {
        return this.page.locator('footer').getByText(' Brightest. All rights reserved.');
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
    clickLinkedIn() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getLinkedInLink().click();
        });
    }
    clickFacebook() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getFacebookLink().click();
        });
    }
    clickInstagram() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getInstagramLink().click();
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
    isLinkedInLinkVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getLinkedInLink().isVisible();
        });
    }
    isFacebookLinkVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getFacebookLink().isVisible();
        });
    }
    isInstagramLinkVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getInstagramLink().isVisible();
        });
    }
    isRightsTextVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getRightsText().isVisible();
        });
    }
    verifyAllFooterElements() {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.isLogoVisible()) &&
                (yield this.isAboutLinkVisible()) &&
                (yield this.isContactLinkVisible()) &&
                (yield this.isRightsTextVisible()) &&
                (yield this.isLinkedInLinkVisible()) &&
                (yield this.isFacebookLinkVisible()) &&
                (yield this.isInstagramLinkVisible()));
        });
    }
}
exports.Footer = Footer;
