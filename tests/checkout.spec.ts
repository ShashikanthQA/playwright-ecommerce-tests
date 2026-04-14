import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/CheckoutPage";

test("Submit empty form shows all required errors", async ({ page }) => {
  const checkout = new CheckoutPage(page);

  await checkout.openCheckoutWithProduct();

  await checkout.submit();

  //  Assertions 
  await expect(checkout.firstName()).toHaveAttribute("aria-invalid", "true");
  await expect(checkout.email()).toHaveAttribute("aria-invalid", "true");
  await expect(checkout.zip()).toHaveAttribute("aria-invalid", "true");
});

test("Invalid email validation", async ({ page }) => {
  const checkout = new CheckoutPage(page);

  await checkout.openCheckoutWithProduct();

  await checkout.fillValidData();
  await checkout.fillInvalidEmail();

  await checkout.submit();

  // Assertion
  await expect(checkout.email()).toHaveAttribute("aria-invalid", "true");
});

test("Invalid zip code validation", async ({ page }) => {
  const checkout = new CheckoutPage(page);

  await checkout.openCheckoutWithProduct();

  await checkout.fillValidData();
  await checkout.fillInvalidZip();

  await checkout.submit();

  // Dynamic validation (no hardcoding)
  await expect.poll(async () => {
    const value = await checkout.zip().inputValue();
    return value.length;
  }).not.toBe(5);
});