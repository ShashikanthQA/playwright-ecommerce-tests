import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  //  HOME
  async gotoHome() {
    await this.page.goto("http://localhost:3000/");
    await expect(
      this.page.getByRole("heading", { name: "Products" })
    ).toBeVisible();
  }

  // PRODUCT
  async clickFirstProduct() {
    await Promise.all([
      this.page.waitForURL(/\/products\/.*/),
      this.page.locator('a[href^="/products/"]').first().click(),
    ]);
  }

  async addToCart() {
    await this.page.getByRole("button", { name: /add to cart/i }).click();

    // wait for cart badge update
    await expect(
      this.page.getByRole("link", { name: /cart/i })
    ).toContainText("1");
  }

  // CART
  async gotoCart() {
    await this.page.getByRole("link", { name: /cart/i }).click();
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async verifyCartItemDetails() {
    const cartItem = this.page.locator("div").filter({
      has: this.page.getByRole("heading", { name: "Wireless Headphones" }),
    });

    //  strict locator
    await expect(
      cartItem.getByRole("heading", {
        level: 3,
        name: "Wireless Headphones",
      })
    ).toBeVisible();

    //  scoped price
    await expect(cartItem.locator("p").first()).toHaveText("$79.99");

    // quantity
    await expect(cartItem.getByText("1")).toBeVisible();
  }

  async getTotalPrice(): Promise<number> {
    const total = this.page.getByTestId("cart-total"); 
    await expect(total).toBeVisible();

    const text = await total.textContent();
    return Number(text?.replace(/[^0-9.]/g, ""));
  }

  async increaseQuantity() {
    await this.page
      .getByRole("button", { name: /increase quantity/i })
      .click();
  }

  async decreaseQuantity() {
    await this.page
      .getByRole("button", { name: /decrease quantity/i })
      .click();
  }

  async removeItem() {
    await this.page.getByRole("button", { name: /remove/i }).click();
  }

  async verifyEmptyCart() {
    await expect(
      this.page.getByText(/your cart is empty/i)
    ).toBeVisible();
  }
}