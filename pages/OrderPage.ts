import { Page, expect } from "@playwright/test";

export class OrderPage {
  constructor(private page: Page) {}

  //  Full flow setup
  async openCheckoutFlow() {
    await this.page.goto("http://localhost:3000/");

    await expect(
      this.page.getByRole("heading", { name: "Products" })
    ).toBeVisible();

    await Promise.all([
      this.page.waitForURL(/\/products\/.*/),
      this.page.locator('a[href^="/products/"]').first().click(),
    ]);

    await this.page.getByRole("button", { name: /add to cart/i }).click();

    //  wait for cart badge
    await expect(this.page.getByTestId("cart-count")).toHaveText(/1/);

    await this.page.getByRole("link", { name: /cart/i }).click();
    await expect(this.page).toHaveURL(/\/cart/);

    //  ensure item exists
    await expect(
      this.page.getByRole("heading", { name: "Wireless Headphones" })
    ).toBeVisible();

    await this.page.getByRole("link", { name: /checkout/i }).click();

    await expect(
      this.page.getByRole("heading", { name: "Checkout" })
    ).toBeVisible();
  }

  //  Fill details
  async fillDetails() {
    await this.page.getByLabel("First Name").fill("Machi");
    await this.page.getByLabel("Last Name").fill("QA");
    await this.page.getByLabel("Email").fill("test@mail.com");
    await this.page.getByLabel("Address").fill("Bangalore");
    await this.page.getByLabel("City").fill("BLR");
    await this.page.getByLabel("State").fill("KA");
    await this.page.getByLabel("Zip Code").fill("56001");

    //  Payment
    await this.page.getByLabel("Name on Card").fill("Machi QA");
    await this.page.getByLabel("Card Number").fill("4111111111111111");
    await this.page.getByLabel("Expiry Date").fill("12/30");
    await this.page.getByLabel("CVV").fill("123");
  }

  //  Actions
  async placeOrder() {
    await this.page
      .getByRole("button", { name: /place order|submit/i })
      .click();
  }

  //  Getters (for assertions in test)
  successHeading() {
    return this.page.getByRole("heading", {
      name: /order|confirmation|success/i,
    });
  }

  orderId() {
    return this.page.locator("text=/order id/i");
  }
}