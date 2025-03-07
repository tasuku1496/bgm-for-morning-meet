import dotenv from "dotenv";
import puppeteer, { Browser } from "puppeteer";
import { enterGoogleMeet } from "./googleMeet";

dotenv.config();

const meetLink = process.env.MEET_LINK;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

async function startGoogleMeet(browser: Browser) {
  if (!meetLink || !email || !password) {
    return console.error(
      "MEET_LINK, EMAIL, and PASSWORD must be set in the environment variables."
    );
  }

  try {
    await enterGoogleMeet(browser, meetLink, email, password);
    console.log("Google Meet に成功しました。");
  } catch (err) {
    console.error("Google Meet の参加に失敗しました:", err);
  }
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });

  await startGoogleMeet(browser);
}

main();
