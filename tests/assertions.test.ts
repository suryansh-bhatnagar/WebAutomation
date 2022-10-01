// import { chromium } from "playwright";
import { test, expect, Page, errors } from "@playwright/test";
import { LoginFunction } from "../pages/Login.page";
import loginCred from "../Data/LoginData.json";
test.describe("Login to Medbikri", () => {
  test("Assertions", async ({ page }) => {
    const login = new LoginFunction(page);
    await page.goto("https://dev.medbikri.com/");
    // Click #root div:has-text("Proceed") >> nth=3
    await page.locator('#root div:has-text("Proceed")').nth(3).click();

    await login.enterPhone(loginCred.phone);

    await (await login.eleSubmit()).click();

    await login.enterOTP(loginCred.otp);

    await (await login.eleSubmit()).click();

    await new Promise((f) => setTimeout(f, 2000));

    const headerName = await page.locator(".css-901oao").first().textContent();

    if (headerName == "Complete your shop's KYC Registration") {
      await expect(page.locator("text=Submit")).toBeVisible();
      await page.locator("text=Submit").click();
      await expect(page).toHaveURL("https://dev.medbikri.com/");
      await page.locator("//div[text()='New Sale']").click();
    } else if (headerName == "Home") {
      await expect(page).toHaveURL("https://dev.medbikri.com/");
      await expect(page.locator("//div[text()='New Sale']")).toBeVisible();
      await page.locator("//div[text()='New Sale']").click();
    } else if (headerName == "Enter shop details to create your stores") {
      await page.locator("text=Submit & Next").click();

      await page.locator("text=Submit").click();
      await expect(page).toHaveURL("https://dev.medbikri.com/");

      await page.locator("//div[text()='New Sale']").click();
    }

    // Click div:nth-child(5) > div:nth-child(3) > div
    await page.locator("//div[text()='Add Medicine']").click();

    // Click input[type="text"] >> nth=0
    await page.locator("(//input[@dir='auto'])[3]").click();
    // Fill input[type="text"] >> nth=0
    await page.locator("(//input[@dir='auto'])[3]").fill("Dolo");
    // Click text=Dolo 120 Suspension >> nth=0
    await page.locator("text=Dolo 120 Suspension").first().click();
    // Click div:nth-child(12) > div:nth-child(3) > div
    await page.locator("//div[text()='Submit']").click();
    // Click text=Total₹ 0.59Proceed >> div >> nth=3
    await page.locator("//div[text()='Proceed']").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();
    // Click text=BACK TO SALES
    await page.locator("text=BACK TO SALES").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/");
    // Click text=More
    await page.locator("text=More").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
    // Click div:nth-child(11) > div
    await page.locator("text=Signout").click();
    // await expect(page).toHaveURL("https://dev.medbikri.com/");
  });
});
