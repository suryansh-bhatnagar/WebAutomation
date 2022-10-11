// playwright-dev-this.page.ts
import { expect, Page } from "@playwright/test";

export class ProductDetailsFunction {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public productDetials = async (medName: string) => {
    await this.page.locator("//div[text()='Inventory Items']").first().click();

    await this.page
      .locator("(//div[contains(@class,'css-1dbjc4n r-1loqt21')])[1]")
      .first()
      .click();
    await this.page.keyboard.type(medName, { delay: 100 });
    await this.page
      .locator("//div[text()='" + medName + "']")
      .first()
      .click();
    await expect(this.page).toHaveURL(
      "https://dev.medbikri.com/ProductDetails"
    );
  };
}
