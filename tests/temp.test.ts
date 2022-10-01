// import { chromium } from "playwright";
import { test, expect, Page, errors } from "@playwright/test";
import { LoginFunction } from "../pages/Login.page";
import { AddCustomerFunction } from "../pages/AddCustomer.page";
import AddCustomerData from "../Data/AddCustomerData.json";
import loginCred from "../Data/LoginData.json";
import { GetQuantityFunction } from "../util/getQuantity";
test.describe("Login to Medbikri", () => {
  const inventoryMed = "NO SCARS Cream";
  const nonInventoryMed = "Saridon Headache Relief Tablet";
  const nonDBMed = "Muuchstac Ocean Face Wash for Men";
  const medForCard = "Zandu Zandopa Powder";
  test("Add sale of refill reminder inventory med", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Add a Sale']").click();

    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addPreviousCustomerByName(
      AddCustomerData.prevCustomerName
    );
    await expect(page.locator("text=Cancel").first()).toBeVisible();

    await page.locator("text=Cancel").first().click();

    await page
      .locator("//div[text()='Refill Remainder']/following-sibling::div")
      .click();

    await page.locator("//input[@inputmode='numeric']").first().click();
    await page.locator("//input[@inputmode='numeric']").first().fill("1");
    // await page
    //   .locator("div:nth-child(3) > div > div:nth-child(2)")
    //   .first()
    //   .click();
    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();

    await page
      .locator("(//input[@dir='auto'])[3]")
      .type(inventoryMed, { delay: 100 });

    await page
      .locator("//div[text()='" + inventoryMed + "']")
      .first()
      .click();

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();
    await page.locator("//div[text()='Home']").click();

    let alerts = parseInt(
      (
        await page
          .locator(
            "div > .overview > div:nth-child(5) > div >div >div > div:nth-child(2)"
          )
          .first()
          .innerText()
      ).toString()
    );

    console.log(alerts, "<<<<<Alerts>>>>");
    // navigating to alerts
    await page.locator("div > .overview > div:nth-child(5)").first().click();

    await new Promise((f) => setTimeout(f, 3000));
    await page.locator("(//div[text()='ADD SALE'])[1]").first().click();
    const medName = (
      await page.locator("(//input[@dir='auto'])[3]").inputValue()
    ).toString();
    console.log(medName, inventoryMed, "Medname inventory med");
    if (medName !== inventoryMed) {
      test.fail(true, "Refill reminder not added in alerts");
    }
    await page.locator("(//input[@inputmode='numeric'])[3]").fill("2");
    await page.locator("//div[text()='Submit']").click();
    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("text=BACK TO SALES").click();
    await page.locator("//div[text()='Home']").click();

    let alertsAfterSale = parseInt(
      (
        await page
          .locator(
            "div > .overview > div:nth-child(5) > div >div >div > div:nth-child(2)"
          )
          .first()
          .innerText()
      ).toString()
    );
    console.log(alertsAfterSale, "<<<<<AlertsAfterSale>>>>");

    if (alerts - alertsAfterSale !== 1) {
      test.fail(
        true,
        "It fails because no. of alerts not decreasing after add sale of refill reminder"
      );
    }
  });
});
