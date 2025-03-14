import { Page } from "puppeteer";

// Googleアカウントにログインする処理
export async function loginWithGoogle(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto("https://accounts.google.com/signin");

  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', email);
  await page.click("#identifierNext");

  await page.waitForNavigation({ waitUntil: "networkidle0" });
  await page.waitForSelector('input[type="password"]');
  await page.type('input[type="password"]', password);
  await page.click("#passwordNext");

  await page.waitForNavigation({ waitUntil: "networkidle0" });
}

// 待機処理
export async function waitFor(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ボタンをクリックする共通処理
export async function clickButtonBySelector(
  page: Page,
  selector: string
): Promise<void> {
  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);
}
