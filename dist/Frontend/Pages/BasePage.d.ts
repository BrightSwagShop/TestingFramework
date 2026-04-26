import { Page, Locator } from '@playwright/test';
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';
export interface ProductType {
    name: string;
    slug: string;
}
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    productType: string;
    isActive: boolean;
    imageUrl: string;
    kleuren: string[];
}
export declare class BasePage {
    readonly page: Page;
    readonly navbar: Navbar;
    readonly footer: Footer;
    constructor(page: Page);
    goto(path: string): Promise<void>;
    waitForPageLoad(): Promise<void>;
    click(locator: Locator): Promise<void>;
    fill(locator: Locator, text: string): Promise<void>;
    getText(locator: Locator): Promise<string>;
    isVisible(locator: Locator): Promise<boolean>;
    isEnabled(locator: Locator): Promise<boolean>;
    getCurrentUrl(): Promise<string>;
    waitForElement(locator: Locator, timeout?: number): Promise<void>;
    getPageTitle(): Promise<string>;
    reload(): Promise<void>;
    mockAPI(endpoint: string, responseData?: ProductType[] | Product[] | null): Promise<void>;
    mockProductTypesAPI(productTypes?: ProductType[]): Promise<void>;
    mockProductsByTypeAPI(products?: Product[]): Promise<void>;
}
