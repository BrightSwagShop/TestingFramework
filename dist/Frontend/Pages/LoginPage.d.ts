import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
export declare class LoginPage extends BasePage {
    constructor(page: Page);
    navigateToLogin(): Promise<void>;
    getMainLogo(): Locator;
    getLoginButton(): Locator;
}
