import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
export declare class CartPage extends BasePage {
    constructor(page: Page);
    navigateToCart(): Promise<void>;
    getMainHeading(): Locator;
    getHeadingText(): Promise<string>;
    getShopButton(): Locator;
    getCheckoutButton(): Locator;
}
