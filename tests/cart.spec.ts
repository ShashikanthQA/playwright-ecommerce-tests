import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";

test("Given user adds product When viewing cart Then cart badge updates", async ({ page }) => {
  const cart = new CartPage(page);

  await cart.gotoHome();
  await cart.clickFirstProduct();
  await cart.addToCart();

  const badge = page.getByRole("link", { name: /cart/i });
  await expect(badge).toContainText("1");
});

test("Given product added When opening cart Then correct item details shown", async ({ page }) => {
  const cart = new CartPage(page);

  await cart.gotoHome();
  await cart.clickFirstProduct();
  await cart.addToCart();

  await cart.gotoCart();
  await cart.verifyCartItemDetails();
});

test("Given cart item When quantity changes Then total updates", async ({ page }) => {
  const cart = new CartPage(page);

  await cart.gotoHome();
  await cart.clickFirstProduct();
  await cart.addToCart();

  await cart.gotoCart();

  const oldTotal = await cart.getTotalPrice();

  await cart.increaseQuantity();

  // auto-wait
  await expect.poll(async () => {
    return await cart.getTotalPrice();
  }).toBeGreaterThan(oldTotal);
});

test("Given cart item When removed Then empty cart is shown", async ({ page }) => {
  const cart = new CartPage(page);

  await cart.gotoHome();
  await cart.clickFirstProduct();
  await cart.addToCart();

  await cart.gotoCart();

  await cart.removeItem();
  await cart.verifyEmptyCart();
});