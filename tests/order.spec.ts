import { test, expect } from "@playwright/test";
import { OrderPage } from "../pages/OrderPage";

test("End-to-End Happy Path - Complete Purchase Flow", async ({ page }) => {
  const order = new OrderPage(page);

  await order.openCheckoutFlow();
  await order.fillDetails();
  await order.placeOrder();

  // wait for navigation OR UI change
  await expect(page).toHaveURL(/confirmation|success|order/i);

  // Assertions in test
  await expect(order.successHeading()).toBeVisible();
  await expect(order.orderId()).toBeVisible();
});