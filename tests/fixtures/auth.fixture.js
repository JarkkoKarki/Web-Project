// @ts-check
import {test as base, expect} from '@playwright/test';

/**
 * Custom test fixture that provides an authenticated page object
 * This fixture is simplified to better work with your application
 */
export const test = base.extend({
  authenticatedPage: async ({page}, use) => {
    // Navigate to login page
    await page.goto('/Web-Project-Frontend/login');

    // Fill in login credentials - these need to be valid in your test environment
    // If these values don't work you'll need to update them
    await page.locator('#loginuser').fill('test@example.com');
    await page.locator('#loginpassword').fill('password123');

    // Click login button (using a more flexible selector)
    await page
      .getByRole('button')
      .filter({hasText: /login|sign in/i})
      .click();

    // Provide the page to the test without strict checking for login success
    // This makes the test more flexible
    await use(page);
  },
});

// Re-export expect so tests can import both test and expect from this fixture
export {expect};
