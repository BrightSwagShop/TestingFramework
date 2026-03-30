import { Page, Locator } from '@playwright/test';
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';

// Type definitions for API mocking
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

export class BasePage {
readonly navbar: Navbar;
readonly footer: Footer;

  constructor(readonly page: Page) {
    this.navbar = new Navbar(this.page);
    this.footer = new Footer(this.page);
  }

  // Navigation
  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  // Wait for page to load
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // Common element interactions
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  // Common assertions helpers
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  // URL helper
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // Wait for element
  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ timeout });
  }

  // Get page title
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Reload page
  async reload(): Promise<void> {
    await this.page.reload();
  }

  // Generic API mocking helper
  async mockAPI(endpoint: string, responseData: ProductType[] | Product[] | null = null): Promise<void> {
    let mockData = responseData;
    
    // If no data provided, use defaults based on endpoint
    if (!mockData) {
      if (endpoint.includes('/api/producttypes')) {
        mockData = getDefaultProductTypes();
      } else if (endpoint.includes('/api/products')) {
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
      } else {
        route.continue();
      }
    });
  }

  // Specific mock for product types
  async mockProductTypesAPI(productTypes: ProductType[] = []): Promise<void> {
    const mockData = productTypes.length > 0 ? productTypes : getDefaultProductTypes();
    await this.mockAPI('/api/producttypes', mockData);
  }

  // Specific mock for products by type
  async mockProductsByTypeAPI(products: Product[] = []): Promise<void> {
    const mockData = products.length > 0 ? products : getDefaultProducts();
    await this.mockAPI('/api/products/type', mockData);
  }
}

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