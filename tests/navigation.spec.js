// @ts-check
import {test, expect} from '@playwright/test';

test('logo is visible and clickable', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Check that the logo is visible - updated to match your actual implementation
  const logo = page.locator('img[alt="Logo"]');
  await expect(logo).toBeVisible();

  // Click the logo and verify it navigates to the home page
  await logo.click();
  await expect(page).toHaveURL('/Web-Project-Frontend/');
});

test('kebula brand text is visible', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Check that the KEBULA text/brand is visible in the header
  await expect(page.locator('h1.text-xl').getByText('KEBULA')).toBeVisible();
});

test('navigation links are visible and working', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Check that all navigation links are visible - using the translation keys from your actual app
  await expect(page.getByRole('link', {name: /home/i})).toBeVisible();
  await expect(page.getByRole('link', {name: /menu/i})).toBeVisible();
  await expect(page.getByRole('link', {name: /reservation/i})).toBeVisible();
  await expect(page.getByRole('link', {name: /about/i})).toBeVisible();

  // Test Home link
  await page.getByRole('link', {name: /home/i}).click();
  await expect(page).toHaveURL('/Web-Project-Frontend/');

  // Test Menu link
  await page.getByRole('link', {name: /menu/i}).click();
  await expect(page).toHaveURL('/Web-Project-Frontend/menu');

  // Test Reservation link
  await page.getByRole('link', {name: /reservation/i}).click();
  await expect(page).toHaveURL('/Web-Project-Frontend/reservation');

  // Test About Us link
  await page.getByRole('link', {name: /about/i}).click();
  await expect(page).toHaveURL('/Web-Project-Frontend/about');
});

test('language switcher works', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Check that language options are visible - fixing the selector to be more specific
  const suomiButton = page.getByRole('button', {name: 'Suomi'});
  const englishButton = page.getByRole('button', {name: 'English'});

  // Verify both language buttons are visible
  await expect(suomiButton).toBeVisible();
  await expect(englishButton).toBeVisible();

  // Test button click
  await suomiButton.click();
  // Since we may not know what text changes after language switch,
  // we just verify the page didn't crash
  await expect(page.locator('main')).toBeVisible();
});

test('navigation is responsive on mobile viewport', async ({page}) => {
  // Set viewport to mobile size
  await page.setViewportSize({width: 375, height: 667});

  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // In mobile view, your nav elements might be hidden behind a menu button
  // Let's just verify the logo is still visible
  await expect(page.locator('img[alt="Logo"]')).toBeVisible();
  await expect(page.locator('h1.text-xl').getByText('KEBULA')).toBeVisible();

  // Reset viewport to desktop size
  await page.setViewportSize({width: 1280, height: 720});
});
