// import { chromium } from "playwright";
import { test, expect, Page, chromium } from "@playwright/test";
import { LoginFunction } from "../pages/Login.page";
import loginCred from "../Data/LoginData.json";
test.describe("Testing Home screen buttons", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    // const browser = await chromium.launch();
    page = await browser.newPage();
    const login = new LoginFunction(page);
    await login.login(loginCred.phone, loginCred.otp);
    await expect(page).toHaveURL("https://dev.medbikri.com/");

    // Go to the starting url before each test.
  });
  test("Overview Sales", async () => {
    await page.locator("text=TodaySales").click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/SalesTab?previousButton=+Sales+tab&previousMeta=%5Bobject+Object%5D"
    );
    await expect(
      page.locator("//div[text()='Total Sales Amount']")
    ).toBeVisible();
    await page.goto("https://dev.medbikri.com/");
  });

  test("Overview Alerts", async () => {
    await page.locator("text= Alerts").click();
    await page.goto("https://dev.medbikri.com/");
  });

  test("Overview Inventory", async () => {
    await page
      .locator("div:nth-child(4) > .overview-item-container > div")
      .click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/InventoryTab?previousButton=Inventory&previousMeta=%5Bobject+Object%5D"
    );
    await page.goto("https://dev.medbikri.com/");
  });

  test("Overview Savings", async () => {
    await page.locator("text=daysSavings").click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/StoreSavings?previousButton=Savings&previousMeta=%5Bobject+Object%5D"
    );
    await expect(page.locator("//div[text()='You have saved']")).toBeVisible();

    await page.goto("https://dev.medbikri.com/");
  });

  test("Sales Report Button", async () => {
    await page.locator(".row-1 > div > div").first().click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/SalesReport?previousButton=See+sales+report&previousMeta=%5Bobject+Object%5D"
    );
    await page.goto("https://dev.medbikri.com/");
  });

  test("view all sales Button", async () => {
    await expect(page).toHaveURL("https://dev.medbikri.com/");
    await page
      .locator(".sales-container > div:nth-child(5) > div > div")
      .click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesList");
    await page.goto("https://dev.medbikri.com/");
  });

  test("view all sales ", async () => {
    await expect(page).toHaveURL("https://dev.medbikri.com/");
    await page.locator("text=View All Sales").nth(1).click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesList");
    await page.goto("https://dev.medbikri.com/");
  });

  test("Add Sale ", async () => {
    await expect(page).toHaveURL("https://dev.medbikri.com/");
    await page.locator(".home-item-container").first().click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/CreateSale?previousButton=Add+sale&previousMeta=%5Bobject+Object%5D"
    );
    await expect(page.locator("//div[text()='Add Medicine']")).toBeVisible();
    await page.goto("https://dev.medbikri.com/");
  });

  test("Add Purchase ", async () => {
    await expect(page).toHaveURL("https://dev.medbikri.com/");
    await page.locator("div:nth-child(3) > .home-item-container").click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/AddPurchaseManual?previousButton=Add+purchase&previousMeta=%5Bobject+Object%5D"
    );
    await expect(page.locator("//div[text()='Next']")).toBeVisible();
    await page.goto("https://dev.medbikri.com/");
  });

  test("Sidebar ", async () => {
    await expect(page).toHaveURL("https://dev.medbikri.com/");
    // Click .css-1dbjc4n > div:nth-child(2) > div >> nth=0
    await page.locator(".css-1dbjc4n > div:nth-child(2) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/InventoryTab");
    // Click div:nth-child(3) > div >> nth=0
    await page.locator("div:nth-child(3) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/SalesTab");
    await expect(
      page.locator("//div[text()='Total Sales Amount']")
    ).toBeVisible();
    // Click div:nth-child(4) > div >> nth=0
    await page.locator("div:nth-child(4) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/PurchasesTab");
    // Click div:nth-child(5) > div >> nth=0
    await page.locator("div:nth-child(5) > div").first().click();
    await expect(page).toHaveURL("https://dev.medbikri.com/MoreTab");

    await page.goto("https://dev.medbikri.com/");
  });

  test("Graph visibility ", async () => {
    const locator = page.locator("div.VictoryContainer");
    await expect(locator).toBeVisible();
  });
});
