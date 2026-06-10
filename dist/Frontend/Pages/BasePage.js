"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const Navbar_1 = require("./Components/Navbar");
const Footer_1 = require("./Components/Footer");
class BasePage {
    constructor(page) {
        this.page = page;
        this.navbar = new Navbar_1.Navbar(this.page);
        this.footer = new Footer_1.Footer(this.page);
    }
    // Navigation
    async goto(path) {
        await this.page.goto(path);
    }
    // Wait for page to load
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
    // Common element interactions
    async click(locator) {
        await locator.click();
    }
    async fill(locator, text) {
        await locator.fill(text);
    }
    async getText(locator) {
        return await locator.textContent() || '';
    }
    // Common assertions helpers
    async isVisible(locator) {
        return await locator.isVisible();
    }
    async isEnabled(locator) {
        return await locator.isEnabled();
    }
    // URL helper
    async getCurrentUrl() {
        return this.page.url();
    }
    // Wait for element
    async waitForElement(locator, timeout = 5000) {
        await locator.waitFor({ timeout });
    }
    // Get page title
    async getPageTitle() {
        return await this.page.title();
    }
    // Reload page
    async reload() {
        await this.page.reload();
    }
    // Generic API mocking helper
    async mockAPI(endpoint, responseData = null) {
        let mockData = responseData;
        // If no data provided, use defaults based on endpoint
        if (!mockData) {
            if (endpoint.includes('/api/producttypes')) {
                mockData = getDefaultProductTypes();
            }
            else if (endpoint.includes('/api/products')) {
                mockData = getDefaultProducts();
            }
        }
        // Use glob pattern that matches any origin + endpoint
        // This will match both http://localhost:5076/api/... and relative calls
        await this.page.route(`**${endpoint}*`, (route) => {
            const url = route.request().url();
            // Only intercept if it matches our endpoint
            if (url.includes(endpoint)) {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockData),
                });
            }
            else {
                route.continue();
            }
        });
    }
    // Specific mock for product types
    async mockProductTypesAPI(productTypes = []) {
        const mockData = productTypes.length > 0 ? productTypes : getDefaultProductTypes();
        await this.mockAPI('/api/producttypes', mockData);
    }
    // Specific mock for products by type
    async mockProductsByTypeAPI(products = []) {
        const mockData = products.length > 0 ? products : getDefaultProducts();
        await this.mockAPI('/api/products/type', mockData);
    }
}
exports.BasePage = BasePage;
// Default mock product types for E2E testing
function getDefaultProductTypes() {
    return [
        { name: 'T-shirts', slug: 'tshirts' },
        { name: 'Hoodies', slug: 'hoodies' },
        { name: 'Mokken', slug: 'mokken' },
        { name: 'Drinkflessen', slug: 'drinkflessen' },
        { name: 'Notebooks', slug: 'notebooks' },
    ];
}
// Default mock products for E2E testing
function getDefaultProducts() {
    return [
        {
            _id: '1',
            name: 'Test Product 1',
            description: 'Test Description 1',
            price: 29.99,
            category: 'test',
            productType: 'tshirts',
            isActive: true,
            imageUrl: 'https://via.placeholder.com/300',
            kleuren: []
        },
        {
            _id: '2',
            name: 'Test Product 2',
            description: 'Test Description 2',
            price: 39.99,
            category: 'test',
            productType: 'tshirts',
            isActive: true,
            imageUrl: 'https://via.placeholder.com/300',
            kleuren: []
        }
    ];
}
