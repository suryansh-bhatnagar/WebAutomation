// playwright-dev-page.ts
import { expect, Locator, Page } from "@playwright/test";

export class KYCRegistration {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  private eleGSTinNum = async () =>
    this.page.locator("div:nth-child(3) > div").first();

  private elePanNumber = async () => {
    await this.page.locator("div:nth-child(3) > div").first().click();
    return this.page.locator('text=PAN NumberVERIFY >> input[type="text"]');
  };

  private eleDL20A = async () => this.page.locator('input[type="text"]').nth(1);

  private eleDL21A = async () => this.page.locator('input[type="text"]').nth(2);
  eleSubmit = async () => this.page.locator("div:nth-child(17) > div");

  private eleUploadDL20A = async () =>
    this.page.$("(//input[@type='file']/following-sibling::div)[1]");

  // "div:nth-child(15) > div > div:nth-child(4) > div > div:nth-child(2)"
  public async enterGST(gst: string) {
    const ele = await this.eleGSTinNum();
    if (ele != null) await ele.fill(gst);
    else throw new Error("No element, hence failed");
  }
  public async enterPan(pan: string) {
    const ele = await this.elePanNumber();
    if (ele != null) await ele.fill(pan);
    else throw new Error("No element, hence failed");
  }
  public async enterDL20A(dl: string) {
    const ele = await this.eleDL20A();
    if (ele != null) await ele.fill(dl);
    else throw new Error("No element, hence failed");
  }
  public async enterDL21A(dl: string) {
    const ele = await this.eleDL21A();
    if (ele != null) await ele.fill(dl);
    else throw new Error("No element, hence failed");
  }
  public async uploadDL20A(path: string) {
    const ele = this.page.locator('input[type="file"]').nth(0);
    if (ele != null) await ele.setInputFiles(path);
    else throw new Error("No element, hence failed");
  }
}
