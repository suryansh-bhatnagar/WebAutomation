// import { chromium } from "playwright";
import { test, expect, Page } from "@playwright/test";
import { KYCRegistration } from "../pages/KYCRegistration.page";
import { LoginFunction } from "../pages/Login.page";
import { ShopDetails } from "../pages/ShopDetails.page";
import ShopDetailData from "../Data/ShopDetailsData.json";
import KYCRegData from "../Data/KYCRegData.json";
import SingupCred from "../Data/SingupData.json"


test.describe("Signup to Medbikri", () => {
  test("Signup to dev.medbikri.com", async ({ page }) => {
    const signup = new LoginFunction(page);
    const shopdetails = new ShopDetails(page);
    const KycReg = new KYCRegistration(page);
    await signup.login(SingupCred.phone, SingupCred.otp);
    await expect(page).toHaveURL("https://dev.medbikri.com/ShopDetails");
    await shopdetails.enterShopName(ShopDetailData.shopname);
    await shopdetails.enterOwnerName(ShopDetailData.ownername);
    await shopdetails.enterPinCode(ShopDetailData.pincode);
    await shopdetails.enterAddress(ShopDetailData.address);
    await (await shopdetails.eleSumbit()).click();
    await expect(page).toHaveURL(
      "https://dev.medbikri.com/KYCRegistration?previousButton=Shop+Details+Submit+Clicked&previousMeta=%5Bobject+Object%5D"
    );
    await KycReg.enterPan(KYCRegData.panNumber);
    await KycReg.enterDL20A(KYCRegData.dl20A);
    await KycReg.enterDL21A(KYCRegData.dl21A);
    await KycReg.uploadDL20A(KYCRegData.pathDL20A);
    await (await KycReg.eleSubmit()).click();
    // await page.locator("div:nth-child(17) > div").click();
    await expect(page).toHaveURL("https://dev.medbikri.com/");
  });
});
