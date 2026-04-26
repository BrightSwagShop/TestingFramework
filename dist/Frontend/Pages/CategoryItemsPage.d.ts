import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
export declare class CategoryItemsPage extends BasePage {
    constructor(page: Page);
    navigateToCategory(category: string): Promise<void>;
    getCategoryHeading(): Locator;
    getProductCards(): Locator;
    getProductCount(): Promise<number>;
    hasProducts(): Promise<boolean>;
    getCategoryTitle(): Promise<string>;
}
