import { Page, expect } from "@playwright/test";

export class ProductDetailPage {
  constructor(private page: Page) {}

  // Open home page
  async gotoHome() {
    await this.page.goto("http://localhost:3000/");

    await expect(
      this.page.getByRole("heading", { name: "Products" })
    ).toBeVisible();
  }

  //  Click first product 
  async clickFirstProduct() {
    await Promise.all([
      this.page.waitForURL(/\/products\/.*/),
      this.page.locator('a[href^="/products/"]').first().click(),
    ]);
  }

  // Open out-of-stock product
  async gotoOutOfStockProduct() {
    await this.page.goto("http://localhost:3000/products/prod-008");

    // Use expect instead of waitFor
    await expect(
      this.page.getByRole("button", { name: "Add to Cart" })
    ).toBeVisible();
  }

  // Verify product details
  async verifyProductDetails() {
    // Product name (H1)
    await expect(
      this.page.getByRole("heading", { level: 1 })
    ).toBeVisible();

    // avoid multiple match issue
    await expect(
      this.page.locator("main").locator("p").filter({ hasText: "$" }).first()
    ).toBeVisible();
  }

  //  Verify Add to Cart enabled
  async verifyAddToCartEnabled() {
    await expect(
      this.page.getByRole("button", { name: "Add to Cart" })
    ).toBeEnabled();
  }

  // Verify Add to Cart disabled
  async verifyAddToCartDisabled() {
    await expect(
      this.page.getByRole("button", { name: "Add to Cart" })
    ).toBeDisabled();
  }
}