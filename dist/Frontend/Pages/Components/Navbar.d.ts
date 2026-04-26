import { Page, Locator } from '@playwright/test';
export declare class Navbar {
    readonly page: Page;
    constructor(page: Page);
    getLogoImage(): Locator;
    getAboutLink(): Locator;
    getContactLink(): Locator;
    getCartIcon(): Locator;
    clickLogoToHome(): Promise<void>;
    clickAbout(): Promise<void>;
    clickContact(): Promise<void>;
    clickCart(): Promise<void>;
    isLogoVisible(): Promise<boolean>;
    isAboutLinkVisible(): Promise<boolean>;
    isContactLinkVisible(): Promise<boolean>;
    isCartIconVisible(): Promise<boolean>;
    verifyAllNavbarElements(): Promise<boolean>;
}
