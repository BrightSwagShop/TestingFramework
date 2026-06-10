"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPage = void 0;
const BasePage_1 = require("./BasePage");
/**
 * AdminPage - Page Object representing the admin section of the application
 * Handles navigation and interactions with admin pages
 */
class AdminPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    /**
     * Navigate to the main admin page
     */
    async navigateToAdmin() {
        await this.goto('/admin');
        await this.waitForPageLoad();
    }
    /**
     * Navigate to admin dashboard
     */
    async navigateToDashboard() {
        await this.goto('/admin/dashboard');
        await this.waitForPageLoad();
    }
    /**
     * Navigate to admin users page
     */
    async navigateToUsers() {
        await this.goto('/admin/users');
        await this.waitForPageLoad();
    }
    /**
     * Navigate to admin products page
     */
    async navigateToProducts() {
        await this.goto('/admin/products');
        await this.waitForPageLoad();
    }
    /**
     * Navigate to admin settings page
     */
    async navigateToSettings() {
        await this.goto('/admin/settings');
        await this.waitForPageLoad();
    }
    /**
     * Navigate to admin bugs page
     */
    async navigateToBugs() {
        await this.goto('/admin/bugs');
        await this.waitForPageLoad();
    }
    /**
     * Get the admin sidebar element
     */
    getSidebar() {
        return this.page.getByTestId('admin-sidebar');
    }
    /**
     * Get the admin dashboard title
     */
    getDashboardTitle() {
        return this.page.getByRole('heading', { name: /Admin|Dashboard/i });
    }
    /**
     * Get the page title/heading
     */
    getPageHeading() {
        return this.page.locator('h1, h2');
    }
    /**
     * Check if currently on admin section (by checking URL)
     */
    async isOnAdminPage() {
        return this.page.url().includes('/admin');
    }
    /**
     * Get the user profile section (typically in header/navbar)
     */
    getUserProfile() {
        return this.page.getByTestId('user-profile') || this.page.getByRole('button', { name: /profile|account/i });
    }
    /**
     * Get logout button
     */
    getLogoutButton() {
        return this.page.getByRole('button', { name: /logout|Sign out|Abmelden/i });
    }
    /**
     * Logout from admin section
     */
    async logout() {
        const logoutButton = this.getLogoutButton();
        await logoutButton.click();
        await this.waitForPageLoad();
    }
}
exports.AdminPage = AdminPage;
