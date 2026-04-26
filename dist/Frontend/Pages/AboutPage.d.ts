import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
export declare class AboutPage extends BasePage {
    constructor(page: Page);
    navigateToAbout(): Promise<void>;
    getMainHeading(): Locator;
    getHeadingText(): Promise<string>;
    getShopButton(): Locator;
    getContactButton(): Locator;
    getCustomers(): Locator;
    hasCustomers(): Promise<boolean>;
}
