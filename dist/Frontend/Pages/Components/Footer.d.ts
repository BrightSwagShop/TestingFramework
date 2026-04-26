import { Page, Locator } from '@playwright/test';
export declare class Footer {
    readonly page: Page;
    constructor(page: Page);
    getLogoImage(): Locator;
    getAboutLink(): Locator;
    getContactLink(): Locator;
    getLinkedInLink(): Locator;
    getFacebookLink(): Locator;
    getInstagramLink(): Locator;
    getRightsText(): Locator;
    clickLogoToHome(): Promise<void>;
    clickAbout(): Promise<void>;
    clickContact(): Promise<void>;
    clickLinkedIn(): Promise<void>;
    clickFacebook(): Promise<void>;
    clickInstagram(): Promise<void>;
    isLogoVisible(): Promise<boolean>;
    isAboutLinkVisible(): Promise<boolean>;
    isContactLinkVisible(): Promise<boolean>;
    isLinkedInLinkVisible(): Promise<boolean>;
    isFacebookLinkVisible(): Promise<boolean>;
    isInstagramLinkVisible(): Promise<boolean>;
    isRightsTextVisible(): Promise<boolean>;
    verifyAllFooterElements(): Promise<boolean>;
}
