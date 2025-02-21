"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
// Googleアカウントにログインする処理
function loginWithGoogle(page, email, password) {
  return __awaiter(this, void 0, void 0, function* () {
    yield page.goto("https://accounts.google.com/signin");
    // メールアドレス入力
    yield page.waitForSelector('input[type="email"]');
    yield page.type('input[type="email"]', email);
    yield page.click("#identifierNext");
    // パスワード入力
    yield page.waitForNavigation({ waitUntil: "networkidle0" });
    yield page.waitForSelector('input[type="password"]');
    yield page.type('input[type="password"]', password);
    yield page.click("#passwordNext");
    // ログイン後、ネットワークアイドルを待つ
    yield page.waitForNavigation({ waitUntil: "networkidle0" });
  });
}
// 待機処理を別関数にして再利用可能にする
function waitFor(ms) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve) => setTimeout(resolve, ms));
  });
}
// ボタンをクリックする共通処理
function clickButtonBySelector(page, selector) {
  return __awaiter(this, void 0, void 0, function* () {
    yield page.waitForSelector(selector, { visible: true });
    yield page.click(selector);
  });
}
// Google Meet に参加する処理
function enterGoogleMeet(meetLink, email, password) {
  return __awaiter(this, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    // Googleアカウントにログイン
    yield loginWithGoogle(page, email, password);
    // Google Meet にアクセス
    yield page.goto(meetLink);
    // マイクとカメラを許可しない
    yield clickButtonBySelector(page, 'button[jsname="IbE0S"]');
    // 5秒待機
    yield waitFor(5000);
    // 今すぐ参加ボタンをクリック
    yield clickButtonBySelector(page, '[data-promo-anchor-id="w5gBed"]');
    console.log("Google Meet に参加しました");
    return browser;
  });
}
// 実行例
const meetLink = ""; // 定義追加
const email = ""; // 定義追加
const password = ""; // 定義追加
enterGoogleMeet(meetLink, email, password).catch((err) => console.error(err));
