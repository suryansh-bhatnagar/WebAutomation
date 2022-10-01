import { test, expect, Page, errors } from "@playwright/test";
import { LoginFunction } from "../pages/Login.page";
import loginCred from "../Data/LoginData.json";
import AddCustomerData from "../Data/AddCustomerData.json";
import { AddCustomerFunction } from "../pages/AddCustomer.page";
const inventoryMed = "NO SCARS Cream";
const nonInventoryMed = "Saridon Headache Relief Tablet";
const nonDBMed = "Muuchstac Ocean Face Wash for Men";
const medForCard = "Zandu Zandopa Powder";

test.describe("Add sale from home", () => {
  test("Previous customer  inventory autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);

    await login.login(loginCred.phone, loginCred.otp);
    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Inventory Items']").first().click();

    await page
      .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
      .first()
      .click();
    await page.keyboard.type(inventoryMed, { delay: 100 });
    await page
      .locator("//div[text()='" + inventoryMed + "']")
      .first()
      .click();
    await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");

    await page.locator("text=Edit").click();
    // Click input
    await page.locator("input").click();
    // Fill input
    const quantity = (
      await page.locator("//input[@inputmode='numeric']").inputValue()
    ).toString();

    await page.locator("text=Cancel").click();

    // await page.locator("text=Cancel").click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("//div[text()='Home']").first().click();

    await page.locator("//div[text()='Add a Sale']").click();

    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addPreviousCustomerByName(
      AddCustomerData.prevCustomerName
    );

    await expect(page.locator("text=Cancel").first()).toBeVisible();

    await page.locator("text=Cancel").first().click();

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();

    await page.locator("(//input[@dir='auto'])[3]").fill(inventoryMed);

    await expect(
      page.locator("text=" + inventoryMed + "").first()
    ).toBeVisible();

    await page
      .locator("text=" + inventoryMed + "")
      .first()
      .click();

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    // await expect(page).toHaveURL("https://dev.medbikri.com/");
    if (quantity != "1") {
      await page
        .locator(".css-1dbjc4n > div:nth-child(2) > div")
        .first()
        .click();
      await expect(page).toHaveURL("https://dev.medbikri.com/InventoryTab");
      // await page.locator("div:nth-child(2) > div").first().click();
      await page
        .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
        .first()
        .click();
      await page.keyboard.type(inventoryMed, { delay: 100 });
      await page
        .locator("//div[text()='" + inventoryMed + "']")
        .first()
        .click();

      await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
      // Click text=Edit

      await page.locator("text=Edit").click();
      // Click input
      await page.locator("input").click();
      // Fill input
      const newQuantity = (
        await page.locator("//input[@inputmode='numeric']").inputValue()
      ).toString();
      if (parseInt(quantity) - parseInt(newQuantity) == 1) {
        await page.locator("text=Cancel").click();
      } else {
        test.fail(
          true,
          "It fails because last sold medicine is not that  medicine whose quantity we decreased"
        );
      }
    }
  });
  test("Previous customer non-inventory autocomplete manual", async ({
    page,
  }) => {
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

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();

    await page.locator("(//input[@dir='auto'])[3]").fill(nonInventoryMed);

    await expect(
      page.locator("text=" + nonInventoryMed + "").first()
    ).toBeVisible();

    await page
      .locator("text=" + nonInventoryMed + "")
      .first()
      .click();

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });
  test("Previous customer non-db  manual", async ({ page }) => {
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

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();
    await page.locator("(//input[@dir='auto'])[3]").fill(nonDBMed);

    await expect(page.locator("text=" + nonDBMed + "").first()).toBeVisible();

    await page
      .locator("text=" + nonDBMed + "")
      .last()
      .click();

    await page.locator("(//input[@inputmode='numeric'])[2]").first().fill("2");

    await page
      .locator("(//input[@inputmode='numeric']/following-sibling::div)[2]")
      .first()
      .click();

    await page.locator("text=Discount%₹ >> input").fill("2");

    await page.locator('input[type="text"]').nth(2).fill("ABC123");

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });
  test("New customer  inventory autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);

    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Inventory Items']").first().click();

    await page
      .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
      .first()
      .click();
    await page.keyboard.type(inventoryMed, { delay: 100 });
    await page
      .locator("//div[text()='" + inventoryMed + "']")
      .first()
      .click();

    await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
    // Click text=Edit

    await page.locator("text=Edit").click();
    // Click input
    await page.locator("input").click();
    // Fill input
    const quantity = (
      await page.locator("//input[@inputmode='numeric']").inputValue()
    ).toString();

    await page.locator("text=Cancel").click();

    // await page.locator("text=Cancel").click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("//div[text()='Home']").first().click();

    await page.locator("//div[text()='Add a Sale']").click();

    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addNewCustomer(
      AddCustomerData.newCustomerName,
      AddCustomerData.newCustomerPhone
    );
    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();

    await page.locator("(//input[@dir='auto'])[3]").fill(inventoryMed);

    // await expect(
    //   page.locator("//div[text()='" + inventoryMed + "']").first()
    // ).toBeVisible();

    await page
      .locator("text=" + inventoryMed + "")
      .first()
      .click();

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    // await expect(page).toHaveURL("https://dev.medbikri.com/");
    if (quantity != "1") {
      await page
        .locator(".css-1dbjc4n > div:nth-child(2) > div")
        .first()
        .click();
      await expect(page).toHaveURL("https://dev.medbikri.com/InventoryTab");
      // await page.locator("div:nth-child(2) > div").first().click();
      await page
        .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
        .first()
        .click();
      await page.keyboard.type(inventoryMed, { delay: 100 });
      await page
        .locator("//div[text()='" + inventoryMed + "']")
        .first()
        .click();

      await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
      // Click text=Edit

      await page.locator("text=Edit").click();
      // Click input
      await page.locator("input").click();
      // Fill input
      const newQuantity = (
        await page.locator("//input[@inputmode='numeric']").inputValue()
      ).toString();
      if (parseInt(quantity) - parseInt(newQuantity) == 1) {
        await page.locator("text=Cancel").click();
      } else {
        test.fail(
          true,
          "It fails because last sold medicine is not that  medicine whose quantity we decreased"
        );
      }
    }
  });
  test("New customer  non-inventory autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Add a Sale']").first().click();

    await page
      .locator(".css-1dbjc4n > div > div:nth-child(2) > div")
      .first()
      .click();
    // Click text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]
    await page
      .locator(
        'text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]'
      )
      .click(); // Fill text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]
    await page
      .locator(
        'text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]'
      )
      .fill("9568741236");
    // Click input >> nth=3
    await page.locator("input").nth(3).click();
    // Fill input >> nth=3
    await page.locator("input").nth(3).fill("David warn");
    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=Add Medicine
    await page.locator("text=Add Medicine").click();
    // Press Tab
    await page
      .locator(".r-1ielgck > div:nth-child(2) > div > div > div > div > div")
      .first()
      .press("Tab");

    await page.locator('input[type="text"]').nth(1).fill(nonInventoryMed);
    // Click div:nth-child(3) > div > div:nth-child(4) > div > div > div >> nth=0
    await page
      .locator("text=" + nonInventoryMed + "")
      .first()
      .click();
    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=Proceed
    await page.locator("text=Proceed").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");
    // Click text=Create Sale
    await page.locator("text=Create Sale").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SaleSuccess");
  });
  test("New customer  non-db autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Add a Sale']").first().click();

    await page
      .locator(".css-1dbjc4n > div > div:nth-child(2) > div")
      .first()
      .click();
    // Click text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]
    await page
      .locator(
        'text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]'
      )
      .click();
    // Fill text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]
    await page
      .locator(
        'text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]'
      )
      .fill("9568741236");
    // Click input >> nth=3
    await page.locator("input").nth(3).click();
    // Fill input >> nth=3
    await page.locator("input").nth(3).fill("David warn");
    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=Add Medicine
    await page.locator("text=Add Medicine").click();
    // Press Tab
    await page
      .locator(".r-1ielgck > div:nth-child(2) > div > div > div > div > div")
      .first()
      .press("Tab");

    await page.locator('input[type="text"]').nth(1).fill(nonDBMed);

    await page
      .locator("text=" + nonDBMed + "")
      .last()
      .click();

    await page.locator("(//input[@inputmode='numeric'])[2]").first().fill("2");

    await page
      .locator("(//input[@inputmode='numeric']/following-sibling::div)[2]")
      .first()
      .click();

    await page.locator("text=Discount%₹ >> input").fill("2");

    await page.locator('input[type="text"]').nth(2).fill("ABC123");

  
    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=Proceed
    await page.locator("text=Proceed").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");
    // Click text=Create Sale
    await page.locator("text=Create Sale").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SaleSuccess");
  });
  test("No customer  inventory without autocomplete manual", async ({
    page,
  }) => {
    const login = new LoginFunction(page);

    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Inventory Items']").first().click();

    await page
      .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
      .first()
      .click();
    await page.keyboard.type(inventoryMed, { delay: 100 });
    await page
      .locator("//div[text()='" + inventoryMed + "']")
      .first()
      .click();

    await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
    // Click text=Edit

    await page.locator("text=Edit").click();
    // Click input
    await page.locator("input").click();
    // Fill input
    const quantity = (
      await page.locator("//input[@inputmode='numeric']").inputValue()
    ).toString();

    await page.locator("text=Cancel").click();

    // await page.locator("text=Cancel").click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("//div[text()='Home']").first().click();

    await page.locator("//div[text()='Add a Sale']").click();

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();

    await page.locator("(//input[@dir='auto'])[3]").fill(inventoryMed);

    await expect(
      page.locator("text=" + inventoryMed + "").first()
    ).toBeVisible();

    await page
      .locator("text=" + inventoryMed + "")
      .first()
      .click();

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    // await expect(page).toHaveURL("https://dev.medbikri.com/");
    if (quantity != "1") {
      await page
        .locator(".css-1dbjc4n > div:nth-child(2) > div")
        .first()
        .click();
      await expect(page).toHaveURL("https://dev.medbikri.com/InventoryTab");
      // await page.locator("div:nth-child(2) > div").first().click();
      await page
        .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
        .first()
        .click();
      await page.keyboard.type(inventoryMed, { delay: 100 });
      await page
        .locator("//div[text()='" + inventoryMed + "']")
        .first()
        .click();

      await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
      // Click text=Edit

      await page.locator("text=Edit").click();
      // Click input
      await page.locator("input").click();
      // Fill input
      const newQuantity = (
        await page.locator("//input[@inputmode='numeric']").inputValue()
      ).toString();
      if (parseInt(quantity) - parseInt(newQuantity) == 1) {
        await page.locator("text=Cancel").click();
      } else {
        test.fail(
          true,
          "It fails because last sold medicine is not that  medicine whose quantity we decreased"
        );
      }
    }
  });
  test("No customer  non inventory autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);

    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Add a Sale']").click();

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();
    await page.locator("(//input[@dir='auto'])[3]").fill(nonInventoryMed);

    // await expect(
    //   page.locator("text="+inventoryMed+"").first()
    // ).toBeVisible();

    await page
      .locator("text=" + nonInventoryMed + "")
      .first()
      .click();
    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });

  test("No customer  no inventory no db without autocomplete manual", async ({
    page,
  }) => {
    const login = new LoginFunction(page);

    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Add a Sale']").click();

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();
    await page.locator("(//input[@dir='auto'])[3]").fill(nonDBMed);

    // await expect(
    //   page.locator("text="+inventoryMed+"").first()
    // ).toBeVisible();

    await page
      .locator("text=" + nonDBMed + "")
      .last()
      .click();
    await page.locator("(//input[@inputmode='numeric'])[2]").first().fill("2");

    await page
      .locator("(//input[@inputmode='numeric']/following-sibling::div)[2]")
      .first()
      .click();

    await page.locator("text=Discount%₹ >> input").fill("2");

    await page.locator('input[type="text"]').nth(2).fill("ABC123");

  
    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });
});

test.describe("Add sale from fab", () => {
  test("Previous customer  inventory autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Inventory Items']").first().click();

    await page
      .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
      .first()
      .click();
    await page.keyboard.type(inventoryMed, { delay: 100 });
    await page
      .locator("//div[text()='" + inventoryMed + "']")
      .first()
      .click();

    await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
    // Click text=Edit

    await page.locator("text=Edit").click();
    // Click input
    await page.locator("input").click();
    // Fill input
    const quantity = (
      await page.locator("//input[@inputmode='numeric']").inputValue()
    ).toString();

    await page.locator("text=Cancel").click();

    // await page.locator("text=Cancel").click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );
    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addPreviousCustomerByName(
      AddCustomerData.prevCustomerName
    );

    await expect(page.locator("text=Cancel").first()).toBeVisible();

    await page.locator("text=Cancel").first().click();

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();

    await page.locator("(//input[@dir='auto'])[3]").fill(inventoryMed);

    await expect(
      page.locator("text=" + inventoryMed + "").first()
    ).toBeVisible();

    await page
      .locator("text=" + inventoryMed + "")
      .first()
      .click();

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");
    if (quantity != "1") {
      await page
        .locator(".css-1dbjc4n > div:nth-child(2) > div")
        .first()
        .click();
      await expect(page).toHaveURL("https://dev.medbikri.com/InventoryTab");
      // await page.locator("div:nth-child(2) > div").first().click();
      await page
        .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
        .first()
        .click();
      await page.keyboard.type(inventoryMed, { delay: 100 });
      await page
        .locator("//div[text()='" + inventoryMed + "']")
        .first()
        .click();

      await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
      // Click text=Edit

      await page.locator("text=Edit").click();
      // Click input
      await page.locator("input").click();
      // Fill input
      const newQuantity = (
        await page.locator("//input[@inputmode='numeric']").inputValue()
      ).toString();
      if (parseInt(quantity) - parseInt(newQuantity) == 1) {
        await page.locator("text=Cancel").click();
      } else {
        test.fail(
          true,
          "It fails because last sold medicine is not that  medicine whose quantity we decreased"
        );
      }
    }
  });
  test("Previous customer non-inventory autocomplete manual", async ({
    page,
  }) => {
    test.setTimeout(6000000);
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );

    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addPreviousCustomerByName(
      AddCustomerData.prevCustomerName
    );

    await expect(page.locator("text=Cancel").first()).toBeVisible();

    await page.locator("text=Cancel").first().click();

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();

    await page.locator("(//input[@dir='auto'])[3]").fill(nonInventoryMed);

    await expect(
      page.locator("text=" + nonInventoryMed + "").first()
    ).toBeVisible();

    await page
      .locator("text=" + nonInventoryMed + "")
      .first()
      .click();

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });
  test("Previous customer non-db  manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );

    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addPreviousCustomerByName(
      AddCustomerData.prevCustomerName
    );
    await expect(page.locator("text=Cancel").first()).toBeVisible();

    await page.locator("text=Cancel").first().click();

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();
    await page.locator("(//input[@dir='auto'])[3]").fill(nonDBMed);

    await expect(page.locator("text=" + nonDBMed + "").first()).toBeVisible();

    await page
      .locator("text=" + nonDBMed + "")
      .last()
      .click();

    await page.locator("(//input[@inputmode='numeric'])[2]").first().fill("2");

    await page
      .locator("(//input[@inputmode='numeric']/following-sibling::div)[2]")
      .first()
      .click();

    await page.locator("text=Discount%₹ >> input").fill("2");

    await page.locator('input[type="text"]').nth(2).fill("ABC123");

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });
  test("New customer  inventory autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='Inventory Items']").first().click();

    await page
      .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
      .first()
      .click();
    await page.keyboard.type(inventoryMed, { delay: 100 });
    await page
      .locator("//div[text()='" + inventoryMed + "']")
      .first()
      .click();

    await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
    // Click text=Edit

    await page.locator("text=Edit").click();
    // Click input
    await page.locator("input").click();
    // Fill input
    const quantity = (
      await page.locator("//input[@inputmode='numeric']").inputValue()
    ).toString();

    await page.locator("text=Cancel").click();

    // await page.locator("text=Cancel").click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();

    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );

    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addNewCustomer(
      AddCustomerData.newCustomerName,
      AddCustomerData.newCustomerPhone
    );

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();

    await page.locator("(//input[@dir='auto'])[3]").fill(inventoryMed);

    await expect(
      page.locator("text=" + inventoryMed + "").first()
    ).toBeVisible();

    await page
      .locator("text=" + inventoryMed + "")
      .first()
      .click();

    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    // await expect(page).toHaveURL("https://dev.medbikri.com/");
    if (quantity != "1") {
      await page
        .locator(".css-1dbjc4n > div:nth-child(2) > div")
        .first()
        .click();
      await expect(page).toHaveURL("https://dev.medbikri.com/InventoryTab");
      // await page.locator("div:nth-child(2) > div").first().click();
      await page
        .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
        .first()
        .click();
      await page.keyboard.type(inventoryMed, { delay: 100 });
      await page
        .locator("//div[text()='" + inventoryMed + "']")
        .first()
        .click();

      await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
      // Click text=Edit

      await page.locator("text=Edit").click();
      // Click input
      await page.locator("input").click();
      // Fill input
      const newQuantity = (
        await page.locator("//input[@inputmode='numeric']").inputValue()
      ).toString();
      if (parseInt(quantity) - parseInt(newQuantity) == 1) {
        await page.locator("text=Cancel").click();
      } else {
        test.fail(
          true,
          "It fails because last sold medicine is not that  medicine whose quantity we decreased"
        );
      }
    }
  });
  test("New customer  non-inventory autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );

    await page
      .locator(".css-1dbjc4n > div > div:nth-child(2) > div")
      .first()
      .click();
    // Click text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]
    await page
      .locator(
        'text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]'
      )
      .click();
    // Fill text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]
    await page
      .locator(
        'text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]'
      )
      .fill("9568741236");
    // Click input >> nth=3
    await page.locator("input").nth(3).click();
    // Fill input >> nth=3
    await page.locator("input").nth(3).fill("David warn");
    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=Add Medicine
    await page.locator("text=Add Medicine").click();
    // Press Tab
    await page
      .locator(".r-1ielgck > div:nth-child(2) > div > div > div > div > div")
      .first()
      .press("Tab");
    // Fill input[type="text"] >> nth=1
    // Click input[type="text"] >> nth=1

    // Fill input[type="text"] >> nth=1
    await page.locator('input[type="text"]').nth(1).fill(nonInventoryMed);
    // Click div:nth-child(3) > div > div:nth-child(4) > div > div > div >> nth=0
    // await page
    //   .locator("div:nth-child(3) > div > div:nth-child(4) > div > div > div")
    //   .first()
    //   .click();
    await page
      .locator("text=" + nonInventoryMed + "")
      .first()
      .click();
    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=Proceed
    await page.locator("text=Proceed").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");
    // Click text=Create Sale
    await page.locator("text=Create Sale").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SaleSuccess");
  });
  test("New customer  non-db autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );

    await page
      .locator(".css-1dbjc4n > div > div:nth-child(2) > div")
      .first()
      .click();
    // Click text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]
    await page
      .locator(
        'text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]'
      )
      .click();
    // Fill text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]
    await page
      .locator(
        'text=Customer detailsCustomer NameCustomer PhoneCancelSubmit >> input[type="text"]'
      )
      .fill("9568741236");
    // Click input >> nth=3
    await page.locator("input").nth(3).click();
    // Fill input >> nth=3
    await page.locator("input").nth(3).fill("David warn");
    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=Add Medicine
    await page.locator("text=Add Medicine").click();
    // Press Tab
    await page
      .locator(".r-1ielgck > div:nth-child(2) > div > div > div > div > div")
      .first()
      .press("Tab");

    await page.locator('input[type="text"]').nth(1).fill(nonDBMed);

    await page
      .locator("text=" + nonDBMed + "")
      .last()
      .click();

    await page.locator("(//input[@inputmode='numeric'])[2]").first().fill("2");

    await page
      .locator("(//input[@inputmode='numeric']/following-sibling::div)[2]")
      .first()
      .click();

    await page.locator("text=Discount%₹ >> input").fill("2");

    await page.locator('input[type="text"]').nth(2).fill("ABC123");

    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=Proceed
    await page.locator("text=Proceed").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");
    // Click text=Create Sale
    await page.locator("text=Create Sale").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SaleSuccess");
  });
  test("No customer  inventory without autocomplete manual", async ({
    page,
  }) => {
    const login = new LoginFunction(page);

    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();
    await page.locator("(//input[@dir='auto'])[3]").fill(inventoryMed);

    // await expect(
    //   page.locator("text="+inventoryMed+"").first()
    // ).toBeVisible();

    await page
      .locator("text=" + inventoryMed + "")
      .last()
      .click();
    await page.locator("(//input[@inputmode='numeric'])[2]").first().fill("2");

    await page
      .locator("(//input[@inputmode='numeric']/following-sibling::div)[2]")
      .first()
      .click();

    await page.locator("text=Discount%₹ >> input").fill("2");

    await page.locator('input[type="text"]').nth(2).fill("ABC123");

   
    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });
  test("No customer  non inventory autocomplete manual", async ({ page }) => {
    const login = new LoginFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();
    await page.locator("(//input[@dir='auto'])[3]").fill(nonInventoryMed);

    // await expect(
    //   page.locator("text="+inventoryMed+"").first()
    // ).toBeVisible();

    await page
      .locator("text=" + nonInventoryMed + "")
      .first()
      .click();
    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });
  test("No customer  no inventory no db without autocomplete manual", async ({
    page,
  }) => {
    const login = new LoginFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    // Click div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg
    await page
      .locator("div:nth-child(2) > div:nth-child(2) > .css-1dbjc4n > svg")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Sales+Tab+FAB"
    );

    await page.locator("//div[text()='Add Medicine']").click();

    await page.locator("(//input[@dir='auto'])[3]").click();
    await page.locator("(//input[@dir='auto'])[3]").fill(nonDBMed);

    // await expect(
    //   page.locator("text="+inventoryMed+"").first()
    // ).toBeVisible();

    await page
      .locator("text=" + nonDBMed + "")
      .last()
      .click();
    await page.locator("(//input[@inputmode='numeric'])[2]").first().fill("2");

    await page
      .locator("(//input[@inputmode='numeric']/following-sibling::div)[2]")
      .first()
      .click();

    await page.locator("text=Discount%₹ >> input").fill("2");

    await page.locator('input[type="text"]').nth(2).fill("ABC123");

 
    await page.locator("//div[text()='Submit']").click();

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await page.locator("text=BACK TO SALES").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("text=More").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");
  });
});

test.describe("Add sale from Action card", () => {
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
  test("Add sale of refill reminder non inventory med", async ({ page }) => {
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
      .type(nonInventoryMed, { delay: 100 });

    await page
      .locator("text=" + nonInventoryMed + "")
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
    await page.locator("div > .overview > div:nth-child(5)").first().click();

    await page.locator("(//div[text()='ADD SALE'])[1]").first().click();

    const medName = (
      await page.locator("(//input[@dir='auto'])[3]").inputValue()
    ).toString();
    // console.log(medName, inventoryMed, "Medname inventory med");
    if (medName !== nonInventoryMed) {
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
  test("Add sale of refill reminder non inventory nor db med", async ({
    page,
  }) => {
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

    await page.locator("(//input[@dir='auto'])[3]").fill(nonDBMed);

    await page
      .locator("text=" + nonDBMed + "")
      .last()
      .click();
    await page.locator("(//input[@inputmode='numeric'])[2]").first().fill("2");

    await page
      .locator("(//input[@inputmode='numeric']/following-sibling::div)[2]")
      .first()
      .click();

    await page.locator("text=Discount%₹ >> input").fill("2");

    await page.locator('input[type="text"]').nth(2).fill("ABC123");

   
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
    await page.locator("div > .overview > div:nth-child(5)").first().click();

    await page.locator("(//div[text()='ADD SALE'])[1]").first().click();

    const medName = (
      await page.locator("(//input[@dir='auto'])[3]").inputValue()
    ).toString();

    // console.log(medName, inventoryMed, "Medname inventory med");

    if (medName !== nonDBMed) {
      test.fail(true, "Refill reminder not added in alerts");
    }

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
  test("Add sale of expiring card no customer", async ({ page }) => {
    const login = new LoginFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='New Purchase']").click();

    await page.locator("(//input[@dir='auto'])[1]").type(medForCard);

    await page.locator("(//div[text()='" + medForCard + "'])[1]").click();
    await page
      .locator("(//div[text()='Expiry Date']/following::input)[1]")
      .click();
    await page.locator("//div[text()='Select']").click();
    await page.locator("//div[text()='Next']").click();
    await page.locator("//div[text()='Submit']").click();
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//div[text()='BACK TO PURCHASES']").click();
    await page.locator("//div[text()='Home']").click();
    page.keyboard.press("F5");

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
    await page.locator("div > .overview > div:nth-child(5)").first().click();

    const quantity = (
      await page
        .locator("(//div[text()='Quantity']/following-sibling::div)[2]")
        .first()
        .innerText()
    ).toString();

    await page.locator("(//div[text()='ADD SALE'])[1]").first().click();
    await new Promise((f) => setTimeout(f, 1000));
    await page.locator("(//input[@inputmode='numeric'])[3]").fill(quantity);

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

    await page.locator("div > .overview > div:nth-child(5)").first().click();
    let headerText = (
      await page.locator("(//div[@class='css-1dbjc4n'])[3]").innerText()
    ).toString();
    let medName = await (
      await page
        .locator("(//div[contains(@class,'css-1dbjc4n r-18u37iz')])[1]")
        .innerText()
    )
      .toString()
      .slice(0, 15);
    console.log(headerText, "****HEADER TEXT *****");
    console.log(medName, "****MED NAME *****");
    if (
      headerText === "Expiring Stock" &&
      medName !== medForCard.slice(0, 15)
    ) {
      test.fail(
        true,
        "It fails because expiring card is  still there in alerts section "
      );
    } else {
      page
        .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
        .click();
    }
  });
  test("Add sale of expiring card to prev customer", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='New Purchase']").click();

    await page.locator("(//input[@dir='auto'])[1]").type(medForCard);

    await page.locator("(//div[text()='" + medForCard + "'])[1]").click();
    await page
      .locator("(//div[text()='Expiry Date']/following::input)[1]")
      .click();
    await page.locator("//div[text()='Select']").click();
    await page.locator("//div[text()='Next']").click();
    await page.locator("//div[text()='Submit']").click();
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//div[text()='BACK TO PURCHASES']").click();
    await page.locator("//div[text()='Home']").click();
    await page.keyboard.press("F5");

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
    await page.locator("div > .overview > div:nth-child(5)").first().click();

    const quantity = (
      await page
        .locator("(//div[text()='Quantity']/following-sibling::div)[2]")
        .first()
        .innerText()
    ).toString();

    await page.locator("(//div[text()='ADD SALE'])[1]").first().click();
    await new Promise((f) => setTimeout(f, 1000));
    await page.locator("(//input[@inputmode='numeric'])[3]").fill(quantity);
    await page.locator("text=Submit").click();
    await new Promise((f) => setTimeout(f, 1000));
    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addPreviousCustomerByName(
      AddCustomerData.prevCustomerName
    );
    await new Promise((f) => setTimeout(f, 1000));
    await expect(page.locator("text=Cancel").first()).toBeVisible();

    await page.locator("text=Cancel").first().click();

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

    await page.locator("div > .overview > div:nth-child(5)").first().click();
    let headerText = (
      await page.locator("(//div[@class='css-1dbjc4n'])[3]").innerText()
    ).toString();
    let medName = await (
      await page
        .locator("(//div[contains(@class,'css-1dbjc4n r-18u37iz')])[1]")
        .innerText()
    )
      .toString()
      .slice(0, 15);
    console.log(headerText, "****HEADER TEXT *****");
    console.log(medName, "****MED NAME *****");

    if (
      headerText === "Expiring Stock" &&
      medName !== medForCard.slice(0, 15)
    ) {
      test.fail(
        true,
        "It fails because expiring card is  still there in alerts section "
      );
    } else {
      page
        .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
        .click();
    }
  });
  test("Add sale of expiring card to new customer", async ({ page }) => {
    const login = new LoginFunction(page);
    const addCustomer = new AddCustomerFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator("//div[text()='New Purchase']").click();

    await page
      .locator("(//input[@dir='auto'])[1]")
      .type(medForCard, { delay: 100 });

    await page.locator("(//div[text()='" + medForCard + "'])[1]").click();
    await page
      .locator("(//div[text()='Expiry Date']/following::input)[1]")
      .click();
    await page.locator("//div[text()='Select']").click();
    await page.locator("//div[text()='Next']").click();
    await page.locator("//div[text()='Submit']").click();
    await new Promise((f) => setTimeout(f, 2000));
    await page.locator("//div[text()='BACK TO PURCHASES']").click();
    await page.locator("//div[text()='Home']").click();
    page.keyboard.press("F5");

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
    await page.locator("div > .overview > div:nth-child(5)").first().click();

    const quantity = (
      await page
        .locator("(//div[text()='Quantity']/following-sibling::div)[2]")
        .first()
        .innerText()
    ).toString();

    await page.locator("(//div[text()='ADD SALE'])[1]").first().click();
    await new Promise((f) => setTimeout(f, 1000));
    await page.locator("(//input[@inputmode='numeric'])[3]").fill(quantity);
    await page.locator("//div[text()='Submit']").click();
    await page.locator("//div[text()='Add Customer']").click();

    await addCustomer.addNewCustomer(
      AddCustomerData.newCustomerName,
      AddCustomerData.newCustomerPhone
    );

    await page.locator("//div[text()='Proceed']").click();

    await expect(page).toHaveURL("https://dev.medbikri.com/OptionalSaleData");

    await page.locator("//div[text()='Create Sale']").click();

    await new Promise((f) => setTimeout(f, 1000));
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

    await page.locator("div > .overview > div:nth-child(5)").first().click();
    let headerText = (
      await page.locator("(//div[@class='css-1dbjc4n'])[3]").innerText()
    ).toString();
    let medName = await (
      await page
        .locator("(//div[contains(@class,'css-1dbjc4n r-18u37iz')])[1]")
        .innerText()
    )
      .toString()
      .slice(0, 15);
    console.log(headerText, "****HEADER TEXT *****");
    console.log(medName, "****MED NAME *****");
    if (
      headerText === "Expiring Stock" &&
      medName !== medForCard.slice(0, 15)
    ) {
      test.fail(
        true,
        "It fails because expiring card is  still there in alerts section "
      );
    } else {
      page
        .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
        .click();
    }
  });
});

test.describe("Add sale from Inventory", () => {
  test("Add sale by decreasing quantity", async ({ page }) => {
    const login = new LoginFunction(page);
    await login.login(loginCred.phone, loginCred.otp);

    await expect(page).toHaveURL("https://dev.medbikri.com/");

    await page.locator(".css-1dbjc4n > div:nth-child(2) > div").first().click();

    await expect(page).toHaveURL("https://dev.medbikri.com/InventoryTab");
    // await page.locator("div:nth-child(2) > div").first().click();
    await page
      .locator("(//div[contains(@class,'css-1dbjc4n r-1yt96d4')])[1]")
      .click();
    await expect(page).toHaveURL("https://dev.medbikri.com/ProductDetails");
    // Click text=Edit
    const medicineName = (
      await page
        .locator("//div[contains(@class,'css-1dbjc4n r-1wbh5a2')]")
        .textContent()
    )?.toString();

    console.log("****Medicine name****", medicineName);
    await page.locator("text=Edit").click();

    // Click input
    await page.locator("input").click();
    // Fill input
    const quantity = (
      await page.locator("//input[@inputmode='numeric']").inputValue()
    ).toString();
    const newQuantity = (parseInt(quantity) - 1).toString();

    await page.locator("input").fill(newQuantity);

    // Click text=Add a sale (Show In Sale Report)/Add a purchase (Show in recent purchases)
    await page
      .locator(
        "text=Add a sale (Show In Sale Report)/Add a purchase (Show in recent purchases)"
      )
      .click();
    // Click div:nth-child(12) > div:nth-child(3) > div
    await page.locator("text=Save").click();

    // await page.locator("text=Cancel").click();
    await page.locator("div.css-1dbjc4n.r-1loqt21").first().click();

    await page.locator("div:nth-child(3) > div").first().click();

    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");

    await new Promise((f) => setTimeout(f, 2000));

    await page.locator("(//div[text()='EDIT'])[1]").first().click();

    await expect(page).toHaveURL("https://dev.medbikri.com/EditSale");

    await page.locator("(//div[text()='EDIT'])[1]").first().click();
    // (//input[@dir='auto'])[3]
    const lastSoldMedicine = (
      await page.locator("(//input[@dir='auto'])[3]").inputValue()
    ).toString();

    console.log("****LAST SOLD MEDICINE****", lastSoldMedicine);

    if (lastSoldMedicine === medicineName) {
      page.locator("//div[text()='Cancel']").click();
    } else {
      test.fail(
        true,
        "It fails because last sold medicine is not that  medicine whose quantity we decreased"
      );
    }
  });
});
