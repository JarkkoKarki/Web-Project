// @ts-check
import { expect, test } from '@playwright/test';

test('user can log out from the Web-Project-Frontend', async ({ page }) => {
  // Navigate to the login page and log in
  await page.goto('/Web-Project-Frontend/login');
  await page.fill('input[name="username"]', 'make');
  await page.fill('input[name="password"]', 'make1234');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/Web-Project-Frontend/', { timeout: 10000 });

  // Find and click the logout button
  const logOutButton = page.locator('button.logout');
  await logOutButton.click();

  // Verify redirection to the home page after logging out
  await expect(page).toHaveURL('/Web-Project-Frontend/', { timeout: 10000 });
});
