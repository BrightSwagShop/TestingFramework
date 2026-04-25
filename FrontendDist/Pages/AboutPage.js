// Frontend/Pages/Components/Navbar.ts
var Navbar = class {
  constructor(page) {
    this.page = page;
  }
  page;
  // Locators
  getLogoImage() {
    return this.page.getByTestId("logo-link");
  }
  getAboutLink() {
    return this.page.getByTestId("about-link");
  }
  getContactLink() {
    return this.page.getByTestId("contact-link");
  }
  getCartIcon() {
    return this.page.getByTestId("cart-link");
  }
  // Methods
  async clickLogoToHome() {
    await this.getLogoImage().click();
  }
  async clickAbout() {
    await this.getAboutLink().click();
  }
  async clickContact() {
    await this.getContactLink().click();
  }
  async clickCart() {
    await this.getCartIcon().click();
  }
  // Assertions helpers
  async isLogoVisible() {
    return await this.getLogoImage().isVisible();
  }
  async isAboutLinkVisible() {
    return await this.getAboutLink().isVisible();
  }
  async isContactLinkVisible() {
    return await this.getContactLink().isVisible();
  }
  async isCartIconVisible() {
    return await this.getCartIcon().isVisible();
  }
  async verifyAllNavbarElements() {
    return await this.isLogoVisible() && await this.isAboutLinkVisible() && await this.isContactLinkVisible() && await this.isCartIconVisible();
  }
};

// Frontend/Pages/Components/Footer.ts
var Footer = class {
  constructor(page) {
    this.page = page;
  }
  page;
  // Locators
  getLogoImage() {
    return this.page.getByTestId("footer-logo-link");
  }
  getAboutLink() {
    return this.page.getByTestId("footer-about-link");
  }
  getContactLink() {
    return this.page.getByTestId("footer-contact-link");
  }
  getLinkedInLink() {
    return this.page.getByTestId("footer-linkedin");
  }
  getFacebookLink() {
    return this.page.getByTestId("footer-facebook");
  }
  getInstagramLink() {
    return this.page.getByTestId("footer-instagram");
  }
  getRightsText() {
    return this.page.locator("footer").getByText(" Brightest. All rights reserved.");
  }
  // Methods
  async clickLogoToHome() {
    await this.getLogoImage().click();
  }
  async clickAbout() {
    await this.getAboutLink().click();
  }
  async clickContact() {
    await this.getContactLink().click();
  }
  async clickLinkedIn() {
    await this.getLinkedInLink().click();
  }
  async clickFacebook() {
    await this.getFacebookLink().click();
  }
  async clickInstagram() {
    await this.getInstagramLink().click();
  }
  // Assertions helpers
  async isLogoVisible() {
    return await this.getLogoImage().isVisible();
  }
  async isAboutLinkVisible() {
    return await this.getAboutLink().isVisible();
  }
  async isContactLinkVisible() {
    return await this.getContactLink().isVisible();
  }
  async isLinkedInLinkVisible() {
    return await this.getLinkedInLink().isVisible();
  }
  async isFacebookLinkVisible() {
    return await this.getFacebookLink().isVisible();
  }
  async isInstagramLinkVisible() {
    return await this.getInstagramLink().isVisible();
  }
  async isRightsTextVisible() {
    return await this.getRightsText().isVisible();
  }
  async verifyAllFooterElements() {
    return await this.isLogoVisible() && await this.isAboutLinkVisible() && await this.isContactLinkVisible() && await this.isRightsTextVisible() && await this.isLinkedInLinkVisible() && await this.isFacebookLinkVisible() && await this.isInstagramLinkVisible();
  }
};

// Frontend/Pages/BasePage.ts
var BasePage = class {
  constructor(page) {
    this.page = page;
    this.navbar = new Navbar(this.page);
    this.footer = new Footer(this.page);
  }
  page;
  navbar;
  footer;
  // Navigation
  async goto(path) {
    await this.page.goto(path);
  }
  // Wait for page to load
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }
  // Common element interactions
  async click(locator) {
    await locator.click();
  }
  async fill(locator, text) {
    await locator.fill(text);
  }
  async getText(locator) {
    return await locator.textContent() || "";
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
  async waitForElement(locator, timeout = 5e3) {
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
    if (!mockData) {
      if (endpoint.includes("/api/producttypes")) {
        mockData = getDefaultProductTypes();
      } else if (endpoint.includes("/api/products")) {
        mockData = getDefaultProducts();
      }
    }
    await this.page.route(`**${endpoint}*`, (route) => {
      const url = route.request().url();
      if (url.includes(endpoint)) {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockData)
        });
      } else {
        route.continue();
      }
    });
  }
  // Specific mock for product types
  async mockProductTypesAPI(productTypes = []) {
    const mockData = productTypes.length > 0 ? productTypes : getDefaultProductTypes();
    await this.mockAPI("/api/producttypes", mockData);
  }
  // Specific mock for products by type
  async mockProductsByTypeAPI(products = []) {
    const mockData = products.length > 0 ? products : getDefaultProducts();
    await this.mockAPI("/api/products/type", mockData);
  }
};
function getDefaultProductTypes() {
  return [
    { name: "T-shirts", slug: "tshirts" },
    { name: "Hoodies", slug: "hoodies" },
    { name: "Mokken", slug: "mokken" },
    { name: "Drinkflessen", slug: "drinkflessen" },
    { name: "Notebooks", slug: "notebooks" }
  ];
}
function getDefaultProducts() {
  return [
    {
      _id: "1",
      name: "Test Product 1",
      description: "Test Description 1",
      price: 29.99,
      category: "test",
      productType: "tshirts",
      isActive: true,
      imageUrl: "https://via.placeholder.com/300",
      kleuren: []
    },
    {
      _id: "2",
      name: "Test Product 2",
      description: "Test Description 2",
      price: 39.99,
      category: "test",
      productType: "tshirts",
      isActive: true,
      imageUrl: "https://via.placeholder.com/300",
      kleuren: []
    }
  ];
}

// Frontend/Pages/AboutPage.ts
var AboutPage = class extends BasePage {
  constructor(page) {
    super(page);
  }
  async navigateToAbout() {
    await this.goto("/about");
    await this.waitForPageLoad();
  }
  getMainHeading() {
    return this.page.getByRole("heading", { level: 1 });
  }
  getHeadingText() {
    return this.getText(this.getMainHeading());
  }
  getShopButton() {
    return this.page.getByRole("link", { name: "Shop" });
  }
  getContactButton() {
    return this.page.getByTestId("contact-button");
  }
  getCustomers() {
    return this.page.locator(".grid");
  }
  async hasCustomers() {
    const count = await this.getCustomers().count();
    return count > 0;
  }
};
export {
  AboutPage
};
