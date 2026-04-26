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
exports.ContactPage = void 0;
const BasePage_1 = require("./BasePage");
const Form_1 = require("./Components/Form");
class ContactPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.contactForm = new Form_1.Form(page, 'form');
    }
    navigateToContact() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/contact');
            yield this.waitForPageLoad();
        });
    }
    getMainHeading() {
        return this.page.getByRole('heading', { level: 1 });
    }
    getHeadingText() {
        return this.getText(this.getMainHeading());
    }
    getSubmitButton() {
        return this.page.getByRole('button', { name: 'Verstuur' });
    }
    // Fill contact form fields by name attribute
    fillContactForm(name, email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.contactForm.fillField('name', name);
            yield this.contactForm.fillField('email', email);
            yield this.contactForm.fillField('subject', subject);
            yield this.contactForm.fillField('message', message);
        });
    }
    // Submit contact form
    submitContactForm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.contactForm.submitForm();
        });
    }
}
exports.ContactPage = ContactPage;
