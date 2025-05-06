// @ts-check
import { test, expect } from '@playwright/test';

test('user can log in with valid credentials', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/Web-Project-Frontend/login');

  // Fill in the username and password fields
  await page.fill('input[name="username"]', 'make');
  await page.fill('input[name="password"]', 'make1234');

  // Click the login button
  await page.click('button[type="submit"]');

  // Debug: Check if the login button was clicked and no error message is displayed
  const errorMessage = page.locator('.error-message');
  expect(await errorMessage.count()).toBe(0);

  // Increase timeout for navigation
  await expect(page).toHaveURL('/Web-Project-Frontend/', { timeout: 10000 });
});

test('user cannot log in with invalid credentials', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/Web-Project-Frontend/login');

  // Fill in the username and password fields with invalid credentials
  await page.fill('input[name="username"]', 'invalidUser');
  await page.fill('input[name="password"]', 'invalidPassword');

  // Set up an event listener for the alert
  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'), // Wait for the alert to be triggered
    page.click('button[type="submit"]') // Trigger the login attempt
  ]);

  // Assert that the alert message contains the expected text
  await expect(dialog.message()).toBe('Error 401 occured'); // Replace with your actual error message

  // Accept the alert to continue with the test
  await dialog.accept();
});
