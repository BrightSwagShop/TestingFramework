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
    navigateToAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/admin');
            yield this.waitForPageLoad();
        });
    }
    /**
     * Navigate to admin dashboard
     */
    navigateToDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/admin/dashboard');
            yield this.waitForPageLoad();
        });
    }
    /**
     * Navigate to admin users page
     */
    navigateToUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/admin/users');
            yield this.waitForPageLoad();
        });
    }
    /**
     * Navigate to admin products page
     */
    navigateToProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/admin/products');
            yield this.waitForPageLoad();
        });
    }
    /**
     * Navigate to admin settings page
     */
    navigateToSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/admin/settings');
            yield this.waitForPageLoad();
        });
    }
    /**
     * Navigate to admin bugs page
     */
    navigateToBugs() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto('/admin/bugs');
            yield this.waitForPageLoad();
        });
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
    isOnAdminPage() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.url().includes('/admin');
        });
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
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const logoutButton = this.getLogoutButton();
            yield logoutButton.click();
            yield this.waitForPageLoad();
        });
    }
}
exports.AdminPage = AdminPage;
