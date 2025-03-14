import { Page, Browser } from "puppeteer";
import { loginWithGoogle, clickButtonBySelector, waitFor } from "./utils";

// Google Meet に参加する処理
export async function enterGoogleMeet(
  browser: Browser, // ← ここでブラウザを受け取るように修正
  meetLink: string,
  email: string,
  password: string
): Promise<void> {
  const page: Page = await browser.newPage();

  // Googleアカウントにログイン
  await loginWithGoogle(page, email, password);

  // Google Meet にアクセス
  await page.goto(meetLink);

  // マイクとカメラを許可しない
  await clickButtonBySelector(page, 'button[jsname="IbE0S"]');

  // 5秒待機
  await waitFor(3000);

  // 今すぐ参加ボタンをクリック
  await clickButtonBySelector(page, '[data-promo-anchor-id="w5gBed"]');
}
