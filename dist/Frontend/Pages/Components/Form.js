"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
class Form {
    constructor(page, formSelector) {
        this.page = page;
        this.formSelector = formSelector;
    }
    getForm() {
        return this.page.locator(this.formSelector);
    }
    // Check if form exists
    async formExists() {
        return await this.getForm().isVisible();
    }
    // Get input by name attribute
    getInputByName(name) {
        return this.page.locator(`input[name="${name}"], textarea[name="${name}"], select[name="${name}"]`);
    }
    // Check if input field exists by name
    async hasInputField(name) {
        return await this.getInputByName(name).isVisible();
    }
    // Fill input by name
    async fillField(name, value) {
        await this.getInputByName(name).fill(value);
    }
    // Get input value
    async getFieldValue(name) {
        return await this.getInputByName(name).inputValue();
    }
    // Verify multiple fields exist by name
    async hasFields(fieldNames) {
        for (const name of fieldNames) {
            const exists = await this.hasInputField(name);
            if (!exists)
                return false;
        }
        return true;
    }
    // Submit form
    async submitForm() {
        await this.getForm().locator('button[type="submit"]').click();
    }
    // Check if submit button exists
    async hasSubmitButton() {
        return await this.getForm().locator('button[type="submit"]').isVisible();
    }
}
exports.Form = Form;
