import { Page, Locator } from '@playwright/test';
export declare class Form {
    private page;
    private formSelector;
    constructor(page: Page, formSelector: string);
    getForm(): Locator;
    formExists(): Promise<boolean>;
    getInputByName(name: string): Locator;
    hasInputField(name: string): Promise<boolean>;
    fillField(name: string, value: string): Promise<void>;
    getFieldValue(name: string): Promise<string>;
    hasFields(fieldNames: string[]): Promise<boolean>;
    submitForm(): Promise<void>;
    hasSubmitButton(): Promise<boolean>;
}
