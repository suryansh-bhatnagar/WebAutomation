// playwright-dev-page.ts
import { expect, Page } from "@playwright/test";

export class AddCustomerFunction {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elePhoneTextField = async () =>
    this.page.locator("(//input[@inputmode='numeric'])[2]");

  eleNameTextField = async () =>
    this.page.locator("(//input[contains(@class,'css-11aywtz r-13awgt0')])[1]");

  public get submitBtn() {
    return this.page.locator("text=Submit");
  }
  eleSubmit = async () => this.page.locator("text=Submit");

  public async enterPhone(phone: string) {
    const ele = await this.elePhoneTextField();
    if (ele != null) await ele.type(phone);
    else throw new Error("No element, hence failed");
  }
  public async enterName(name: string) {
    const ele = await this.eleNameTextField();
    await ele?.type(name);
  }

  public addPreviousCustomerByPhone = async (phone: string) => {
    await this.enterPhone(phone);
    await this.page.locator("text=" + phone + "").click();

    await (await this.eleSubmit()).click();

    // await (await this.eleSubmit()).click();

    // await new Promise((f) => setTimeout(f, 2000));
  };
  public addPreviousCustomerByName = async (name: string) => {
    await this.enterName(name);
    await this.page.locator("text=" + name + "").click();

    await (await this.eleSubmit()).click();

    // await (await this.eleSubmit()).click();

    // await new Promise((f) => setTimeout(f, 2000));
  };
  public addNewCustomer = async (name: string, phone: string) => {
    await this.enterName(name);
    await this.enterPhone(phone);
    // await this.page.locator("text=" + name + "").click();

    await (await this.eleSubmit()).click();

    // await (await this.eleSubmit()).click();

    // await new Promise((f) => setTimeout(f, 2000));
  };
}
