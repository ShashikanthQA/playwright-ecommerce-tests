import { test } from "@playwright/test";
import { ProductDetailPage } from "../pages/ProductDetailPage";

test("Validate product details", async ({ page }) => {
  const pdp = new ProductDetailPage(page);

  await pdp.gotoHome();
  await pdp.clickFirstProduct();
  await pdp.verifyProductDetails();
});

test("Verify Add to Cart enabled for in-stock product", async ({ page }) => {
  const pdp = new ProductDetailPage(page);

  await pdp.gotoHome();
  await pdp.clickFirstProduct();
  await pdp.verifyAddToCartEnabled();
});

test("Verify Add to Cart disabled for out-of-stock product", async ({ page }) => {
  const pdp = new ProductDetailPage(page);

  await pdp.gotoOutOfStockProduct();
  await pdp.verifyAddToCartDisabled();
});