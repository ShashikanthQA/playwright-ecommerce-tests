import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  //  Setup flow
  async openCheckoutWithProduct() {
    await this.page.goto("http://localhost:3000/");

    await this.page.locator('a[href^="/products/"]').first().click();
    await this.page.getByRole("button", { name: /add to cart/i }).click();

    await this.page.getByRole("link", { name: /cart/i }).click();
    await this.page.getByRole("link", { name: /checkout/i }).click();

    await expect(
      this.page.getByRole("heading", { name: "Checkout" })
    ).toBeVisible();
  }

  //  Actions
  async submit() {
    await this.page
      .getByRole("button", { name: /place order|submit/i })
      .click();
  }

  async fillValidData() {
    await this.page.getByLabel("First Name").fill("Machi");
    await this.page.getByLabel("Last Name").fill("QA");
    await this.page.getByLabel("Email").fill("test@mail.com");
    await this.page.getByLabel("Address").fill("Bangalore");
    await this.page.getByLabel("City").fill("BLR");
    await this.page.getByLabel("State").fill("KA");
    await this.page.getByLabel("Zip Code").fill("560001");
  }

  async fillInvalidEmail() {
    await this.page.getByLabel("Email").fill("invalid-email");
  }

  async fillInvalidZip() {
    await this.page.getByLabel("Zip Code").fill("123");
  }

  //  Getters (for assertions in test)
  firstName() {
    return this.page.getByLabel("First Name");
  }

  email() {
    return this.page.getByLabel("Email");
  }

  zip() {
    return this.page.getByLabel("Zip Code");
  }
}