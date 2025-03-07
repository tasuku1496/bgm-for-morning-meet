import puppeteer, { Page, Browser } from "puppeteer";
import { loginWithGoogle, clickButtonBySelector, waitFor } from "./utils";

// Google Meet に参加する処理
export async function enterGoogleMeet(
  meetLink: string,
  email: string,
  password: string
): Promise<Browser> {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();

  // Googleアカウントにログイン
  await loginWithGoogle(page, email, password);

  // Google Meet にアクセス
  await page.goto(meetLink);

  // マイクとカメラを許可しない
  await clickButtonBySelector(page, 'button[jsname="IbE0S"]');

  // 5秒待機
  await waitFor(5000);

  // 今すぐ参加ボタンをクリック
  await clickButtonBySelector(page, '[data-promo-anchor-id="w5gBed"]');

  console.log("Google Meet に参加しました");
  return browser;
}
