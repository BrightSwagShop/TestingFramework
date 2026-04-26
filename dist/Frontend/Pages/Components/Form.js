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
    formExists() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getForm().isVisible();
        });
    }
    // Get input by name attribute
    getInputByName(name) {
        return this.page.locator(`input[name="${name}"], textarea[name="${name}"], select[name="${name}"]`);
    }
    // Check if input field exists by name
    hasInputField(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getInputByName(name).isVisible();
        });
    }
    // Fill input by name
    fillField(name, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getInputByName(name).fill(value);
        });
    }
    // Get input value
    getFieldValue(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getInputByName(name).inputValue();
        });
    }
    // Verify multiple fields exist by name
    hasFields(fieldNames) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const name of fieldNames) {
                const exists = yield this.hasInputField(name);
                if (!exists)
                    return false;
            }
            return true;
        });
    }
    // Submit form
    submitForm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getForm().locator('button[type="submit"]').click();
        });
    }
    // Check if submit button exists
    hasSubmitButton() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getForm().locator('button[type="submit"]').isVisible();
        });
    }
}
exports.Form = Form;
