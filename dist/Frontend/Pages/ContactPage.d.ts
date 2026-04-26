import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { Form } from './Components/Form';
export declare class ContactPage extends BasePage {
    readonly contactForm: Form;
    constructor(page: Page);
    navigateToContact(): Promise<void>;
    getMainHeading(): Locator;
    getHeadingText(): Promise<string>;
    getSubmitButton(): Locator;
    fillContactForm(name: string, email: string, subject: string, message: string): Promise<void>;
    submitContactForm(): Promise<void>;
}
