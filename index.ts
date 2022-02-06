import dotenv from 'dotenv'
import puppeteer from "puppeteer";
import { format } from "date-fns";
import Twitter from 'twitter';

dotenv.config()


const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
});

async function grabGithubData(): Promise<string> {
  const browser = await puppeteer.launch({ executablePath: "chromium" });
  const page = await browser.newPage();

  await page.goto(
    "https://github.com/users/ronnapatp/contributions?from=2022-01-01"
  );
  let contribs = await page.$$eval("[data-count]", (val) =>
    val.reduce((acc, val) => acc + +(val.getAttribute("data-count")!) , 0)
  );

  const currentYear = format(new Date(), "yyyy");
  await browser.close();
  return `${currentYear} Github Contributions: ${contribs}`;
}

async function main() {
  let countDownDate = new Date("Jan 1, 2023").getTime();
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let newyear = `New year is in ${days} day`
  const ans = await grabGithubData();
  const params = {
    location: ans,
    description: newyear,
  };


  await client.post("account/update_profile", params);
    console.log("🎉 Success! Updated Twitter bio/location and website");
}

main().catch(err=> console.log(err))
