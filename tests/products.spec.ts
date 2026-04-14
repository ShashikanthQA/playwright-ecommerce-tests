import { test, expect } from "@playwright/test";
import { ProductListingPage } from "../pages/ProductListingPage";

test("Search product", async ({ page }) => {
  const pl = new ProductListingPage(page);

  await pl.goto();
  await pl.searchProduct("Speaker");

  await pl.verifyProductVisible("Speaker");
});

test("Select category", async ({ page }) => {
  const pl = new ProductListingPage(page);

  await pl.goto();
  await pl.selectCategory("Books");

  // correct validation
  await expect(page.locator("main a").first()).toBeVisible();
});

test("Empty search", async ({ page }) => {
  const pl = new ProductListingPage(page);

  await pl.goto();
  await pl.searchProduct("XYZ");

  await pl.verifyEmptyState();
});

test("Sort products Low to High", async ({ page }) => {
  const pl = new ProductListingPage(page);

  await pl.goto();
  await pl.sortLowToHigh();

  const prices = await pl.getProductPrices();

  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sorted);
});