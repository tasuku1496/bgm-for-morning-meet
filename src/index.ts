import puppeteer, { Page, Browser } from "puppeteer";

// Googleアカウントにログインする処理
async function loginWithGoogle(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto("https://accounts.google.com/signin");

  // メールアドレス入力
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', email);
  await page.click("#identifierNext");

  // パスワード入力
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  await page.waitForSelector('input[type="password"]');
  await page.type('input[type="password"]', password);
  await page.click("#passwordNext");

  // ログイン後、ネットワークアイドルを待つ
  await page.waitForNavigation({ waitUntil: "networkidle0" });
}

// 待機処理を別関数にして再利用可能にする
async function waitFor(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ボタンをクリックする共通処理
async function clickButtonBySelector(
  page: Page,
  selector: string
): Promise<void> {
  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);
}

// Google Meet に参加する処理
async function enterGoogleMeet(
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

// 実行例
const meetLink = ""; // 定義追加
const email = ""; // 定義追加
const password = ""; // 定義追加
enterGoogleMeet(meetLink, email, password).catch((err) => console.error(err));
