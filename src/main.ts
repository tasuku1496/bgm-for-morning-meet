import dotenv from "dotenv";
import { enterGoogleMeet } from "./googleMeet";

dotenv.config();

const meetLink = process.env.MEET_LINK;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (meetLink && email && password) {
  enterGoogleMeet(meetLink, email, password).catch((err) => console.error(err));
} else {
  console.error(
    "MEET_LINK, EMAIL, and PASSWORD must be set in the environment variables."
  );
}
