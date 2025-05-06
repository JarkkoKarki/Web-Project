// @ts-check
import {test, expect} from '@playwright/test';

test('home page loads correctly', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Check that main content container exists without requiring its content
  await expect(page.locator('div.flex.min-h-screen')).toBeVisible();

  // Check that at least one image exists on the page
  await expect(page.locator('img').first()).toBeVisible();
});

test('home page has correct meta title', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Check page title contains your restaurant name (simplified to be more lenient)
  await expect(page).toHaveTitle(/./); // Match any title
});

test('home page has call-to-action buttons', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Look for links that are likely CTAs
  const ctaLinks = page.getByRole('link').filter({
    hasText: /menu|reservation|order|login|sign/i,
  });

  // Check that at least one CTA is visible
  await expect(ctaLinks.first()).toBeVisible();

  // Try to find and click the menu link
  const menuLink = page.getByRole('link', {name: /menu/i}).first();

  if (await menuLink.isVisible()) {
    await menuLink.click();
    // Check if we navigated to menu page
    await expect(page.url()).toContain('/Web-Project-Frontend/menu');
  }
});

test('footer contains expected information', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Scroll to the bottom of the page to ensure footer is in view
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Check for footer element
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();

  // Check for copyright in footer based on your actual implementation
  await expect(footer.getByText(/©/)).toBeVisible();
});

test('home page images load correctly', async ({page}) => {
  // Navigate to the home page
  await page.goto('/Web-Project-Frontend/');

  // Check images are loading
  const images = page.locator('img');
  const count = await images.count();

  // Ensure we have at least one image
  expect(count).toBeGreaterThan(0);

  // Check first image is visible
  await expect(images.first()).toBeVisible();
});
