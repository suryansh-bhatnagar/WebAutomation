// playwright-dev-page.ts
import { expect, Locator, Page } from "@playwright/test";

export class ShopDetails {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private eleOwnerName = async () =>
    this.page.locator('input[type="text"]').first();

  private eleShopName = async () =>
    this.page.locator('input[type="text"]').nth(1);

  private elePinCode = async () => this.page.locator("input").nth(2);
  private eleAddress = async () => this.page.locator("textarea");
  eleSumbit = async () => this.page.locator("div:nth-child(14) > div");
  //   eleOTPTextField = async () =>
  //     await this.page.$("//input[@inputmode='numeric']");

  //   public get proceedBtn() {
  //     return this.page.locator('#root div:has-text("Proceed")').nth(3);
  //   }

  public async enterShopName(name: string) {
    const ele = await this.eleShopName();
    if (ele != null) await ele.fill(name);
    else throw new Error("No element, hence failed");
  }
  public async enterOwnerName(name: string) {
    const ele = await this.eleOwnerName();
    if (ele != null) await ele.fill(name);
    else throw new Error("No element, hence failed");
  }
  public async enterPinCode(pin: string) {
    const ele = await this.elePinCode();
    if (ele != null) await ele.fill(pin);
    else throw new Error("No element, hence failed");
  }
  public async enterAddress(address: string) {
    const ele = await this.eleAddress();
    if (ele != null) await ele.fill(address);
    else throw new Error("No element, hence failed");
  }
  //   public async enterOTP(pass: string) {
  //     const ele = await this.eleOTPTextField();
  //     await ele?.fill(pass);
  //   }

  public async shopdetails() {
    // await this.page.locator('input[type="text"]').first().click();
    // Fill input[type="text"] >> nth=0
    // await this.page.locator('input[type="text"]').first().fill("xyzzxy");
    // Click input[type="text"] >> nth=1
    // await this.page.locator('input[type="text"]').nth(1).click();
    // Fill input[type="text"] >> nth=1
    // await this.page.locator('input[type="text"]').nth(1).fill("shop name");
    // Click input >> nth=2
    // await this.page.locator("input").nth(2).click();
    // Fill input >> nth=2
    // await this.page.locator("input").nth(2).fill("242001");
    // Click textarea
    // await this.page.locator("textarea").click();
    // Fill textarea
    // await this.page.locator("textarea").fill("abc");
    // Click div:nth-child(14) > div
    // await this.page.locator("div:nth-child(14) > div").click();
    // await expect(this.page).toHaveURL(
    //   "https://dev.medbikri.com/KYCRegistration"
    // );
    // await this.page.locator("text=Submit").first().click();
    // await this.enterShopName()
    await expect(this.page).toHaveURL("https://dev.medbikri.com/");
  }
}
