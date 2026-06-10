"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactPage = void 0;
const BasePage_1 = require("./BasePage");
const Form_1 = require("./Components/Form");
class ContactPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.contactForm = new Form_1.Form(page, 'form');
    }
    async navigateToContact() {
        await this.goto('/contact');
        await this.waitForPageLoad();
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
    async fillContactForm(name, email, subject, message) {
        await this.contactForm.fillField('name', name);
        await this.contactForm.fillField('email', email);
        await this.contactForm.fillField('subject', subject);
        await this.contactForm.fillField('message', message);
    }
    // Submit contact form
    async submitContactForm() {
        await this.contactForm.submitForm();
    }
}
exports.ContactPage = ContactPage;
