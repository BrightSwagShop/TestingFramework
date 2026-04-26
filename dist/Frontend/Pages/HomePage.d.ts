import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
export declare class HomePage extends BasePage {
    constructor(page: Page);
    navigateToHome(): Promise<void>;
    getMainHeading(): Locator;
    getHeadingText(): Promise<string>;
    getProductCategories(): Locator;
    hasProductCategories(): Promise<boolean>;
}
