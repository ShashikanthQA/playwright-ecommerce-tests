import { Page, expect } from "@playwright/test";

export class ProductListingPage {
  constructor(private page: Page) {}

  //  Open home
  async goto() {
    await this.page.goto("http://localhost:3000/");
    await expect(
      this.page.getByRole("heading", { name: "Products" })
    ).toBeVisible();
  }

  //  Search product
  async searchProduct(name: string) {
    await this.page.getByTestId("search-input").fill(name);
  }

  // Select category 
  async selectCategory(category: string) {
    await this.page.getByTestId("category-filter").selectOption(category);

    // wait for actual product list 
    await expect(this.page.locator("main a").first()).toBeVisible();
  }

  // Empty state
  async verifyEmptyState() {
    await expect(
      this.page.getByText("No products found")
    ).toBeVisible();
  }

  //  Sort low → high 
  async sortLowToHigh() {
    await this.page.getByTestId("sort-select").selectOption("price_asc");

    // wait for products to re-render
    await expect(this.page.locator("main a").first()).toBeVisible();
  }

  //  Get product prices 
  async getProductPrices(): Promise<number[]> {
    const prices = await this.page
      .locator("main p:has-text('$')")
      .allTextContents();

    return prices.map((p) =>
      Number(p.replace(/[^0-9.]/g, ""))
    );
  }

  //  Verify product visible
  async verifyProductVisible(product: string) {
    await expect(this.page.getByText(product)).toBeVisible();
  }
}