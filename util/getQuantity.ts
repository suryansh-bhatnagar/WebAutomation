// playwright-dev-page.ts
import { expect, Page } from "@playwright/test";

export class GetQuantityFunction {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public getMedicineQuantity = async (inventoyrMedName: string) => {
    await this.page.locator("//div[text()='Inventory Items']").first().click();

    await this.page
      .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
      .first()
      .click();
    await this.page.keyboard.type(inventoyrMedName, { delay: 100 });
    await this.page
      .locator("//div[text()='" + inventoyrMedName + "']")
      .first()
      .click();

    await expect(this.page).toHaveURL(
      "https://dev.medbikri.com/ProductDetails"
    );

    await this.page.locator("text=Edit").click();
    // Click input
    await this.page.locator("input").click();
    // Fill input
    const quantity = (
      await this.page.locator("//input[@inputmode='numeric']").inputValue()
    ).toString();

    await this.page.locator("text=Cancel").click();

    // await this.page.locator("text=Cancel").click();
    await this.page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await this.page.locator("div.css-1dbjc4n.r-1loqt21").first().click();
    await this.page.locator("//div[text()='Home']").first().click();

    return quantity;
  };
}
