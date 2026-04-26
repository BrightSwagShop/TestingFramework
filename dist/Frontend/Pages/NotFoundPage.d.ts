import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
export declare class NotFoundPage extends BasePage {
    constructor(page: Page);
    navigateToNonExistentPage(): Promise<void>;
    getMainHeading(): Locator;
    getHeadingText(): Promise<string>;
    getContinueShoppingButton(): Locator;
    getErrorDescription(): Locator;
    clickContinueShopping(): Promise<void>;
}
