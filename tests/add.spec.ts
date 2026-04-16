import { test, expect } from '@playwright/test';

test('Add product to cart', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('link', { name: /Wireless Headphones/i }).click();
  await page.locator('[data-testid="add-to-cart-button"]').click();
  await page.locator('[data-testid="cart-link"]').click();

  await expect(page).toHaveURL(/cart/);
});