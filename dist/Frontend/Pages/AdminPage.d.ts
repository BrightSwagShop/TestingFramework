import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
/**
 * AdminPage - Page Object representing the admin section of the application
 * Handles navigation and interactions with admin pages
 */
export declare class AdminPage extends BasePage {
    constructor(page: Page);
    /**
     * Navigate to the main admin page
     */
    navigateToAdmin(): Promise<void>;
    /**
     * Navigate to admin dashboard
     */
    navigateToDashboard(): Promise<void>;
    /**
     * Navigate to admin users page
     */
    navigateToUsers(): Promise<void>;
    /**
     * Navigate to admin products page
     */
    navigateToProducts(): Promise<void>;
    /**
     * Navigate to admin settings page
     */
    navigateToSettings(): Promise<void>;
    /**
     * Navigate to admin bugs page
     */
    navigateToBugs(): Promise<void>;
    /**
     * Get the admin sidebar element
     */
    getSidebar(): Locator;
    /**
     * Get the admin dashboard title
     */
    getDashboardTitle(): Locator;
    /**
     * Get the page title/heading
     */
    getPageHeading(): Locator;
    /**
     * Check if currently on admin section (by checking URL)
     */
    isOnAdminPage(): Promise<boolean>;
    /**
     * Get the user profile section (typically in header/navbar)
     */
    getUserProfile(): Locator;
    /**
     * Get logout button
     */
    getLogoutButton(): Locator;
    /**
     * Logout from admin section
     */
    logout(): Promise<void>;
}
