"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    goto(path) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto(path);
        });
    }
    // Wait for page to load
    waitForPageLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForLoadState('networkidle');
        });
    }
    // Common element interactions
    click(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield locator.click();
        });
    }
    fill(locator, text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield locator.fill(text);
        });
    }
    getText(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield locator.textContent()) || '';
        });
    }
    // Common assertions helpers
    isVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield locator.isVisible();
        });
    }
    isEnabled(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield locator.isEnabled();
        });
    }
    // URL helper
    getCurrentUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.url();
        });
    }
    // Wait for element
    waitForElement(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 5000) {
            yield locator.waitFor({ timeout });
        });
    }
    // Get page title
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.title();
        });
    }
    // Reload page
    reload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.reload();
        });
    }
    // Generic API mocking helper
    mockAPI(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, responseData = null) {
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
            yield this.page.route(`**${endpoint}*`, (route) => {
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
        });
    }
    // Specific mock for product types
    mockProductTypesAPI() {
        return __awaiter(this, arguments, void 0, function* (productTypes = []) {
            const mockData = productTypes.length > 0 ? productTypes : getDefaultProductTypes();
            yield this.mockAPI('/api/producttypes', mockData);
        });
    }
    // Specific mock for products by type
    mockProductsByTypeAPI() {
        return __awaiter(this, arguments, void 0, function* (products = []) {
            const mockData = products.length > 0 ? products : getDefaultProducts();
            yield this.mockAPI('/api/products/type', mockData);
        });
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
