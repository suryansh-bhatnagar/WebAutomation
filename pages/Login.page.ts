// playwright-dev-page.ts
import { expect, Page } from "@playwright/test";

export class LoginFunction {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elePhoneTextField = async () =>
    this.page.locator("[placeholder='Enter Mobile Number']");

  eleOTPTextField = async () =>
    this.page.locator("//input[@inputmode='numeric']");

  public get proceedBtn() {
    return this.page.locator("text=Proceed");
  }
  eleSubmit = async () => this.page.locator("text=Proceed");

  public async enterPhone(name: string) {
    const ele = await this.elePhoneTextField();
    if (ele != null) await ele.fill(name);
    else throw new Error("No element, hence failed");
  }
  public async enterOTP(otp: string) {
    const ele = await this.eleOTPTextField();
    await ele?.fill(otp);
  }

  public login = async (phone: string, otp: string) => {
    await this.page.goto("https://dev.medbikri.com/");
    // this.enterPhone(phone);
    // this.enterOTP(otp);

    await this.page.locator("text=Proceed").click();

    await this.enterPhone(phone);

    await (await this.eleSubmit()).click();

    await this.enterOTP(otp);

    // await (await this.eleSubmit()).click();

    await new Promise((f) => setTimeout(f, 2000));

    const headerName = await this.page
      .locator(".css-901oao")
      .first()
      .textContent();

    if (headerName === "Complete your shop's KYC Registration") {
      await this.page.locator("text=Submit").click();

      await expect(this.page).toHaveURL("https://dev.medbikri.com/");
    } else if (headerName == "Home") {
      await expect(this.page).toHaveURL("https://dev.medbikri.com/");
    } else if (headerName == "Enter shop details to create your stores") {
      await this.page.locator("text=Submit & Next").click();

      await this.page.locator("text=Submit").click();

      await expect(this.page).toHaveURL("https://dev.medbikri.com/");
    }
  };
}
