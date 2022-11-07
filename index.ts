import dotenv from 'dotenv'
import puppeteer from "puppeteer";
import { format } from "date-fns";
import { TwitterApi } from 'twitter-api-v2';

dotenv.config()

const client = new TwitterApi({
  appKey:       process.env.TWITTER_CONSUMER_KEY as string,
  appSecret:    process.env.TWITTER_CONSUMER_SECRET as string,
  accessToken:  process.env.TWITTER_ACCESS_TOKEN_KEY as string,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});

async function grabGithubData(): Promise<string> {
  const browser = await puppeteer.launch({ executablePath: "chromium" });
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const currentYear = format(new Date(), "yyyy");
  await page.goto(
    `https://github.com/users/ronnapatp/contributions?from=${currentYear}-01-01`
  );
  let contribs = await page.$$eval("[data-count]", (val) =>
    val.reduce((acc, val) => acc + +(val.getAttribute("data-count")!) , 0)
  );

  await browser.close();
  return `${currentYear} Github Contributions : ${contribs} 👋🏻`;
}

async function main() {
  const d = new Date();
  let nextyear = d.getFullYear() + 1;
  
  let countDownDate = new Date(`Jan 1, ${nextyear}`).getTime();
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let newyears = Math.floor(distance / (1000 * 60 * 60 * 24));
  const githubData = await grabGithubData();

  // await client.v1.updateAccountProfile({ name: 'ronnapatp 🇺🇦', url: 'https://ronnapat.com/', description: `🏳️‍🌈 | #StandWithUkraine | #LetTheEarthBreath | Developer | Student | macOS | Manoonchai | 2023 in ${newyears} days | Update profile with https://ronnapat.com/tw-bot`, location: githubData })
  await client.v1.updateAccountProfile({ name: 'ronnapatp 🇺🇦', url: 'https://ronnapat.com/', description: `Currently in social detox! All tweets are tweeted by Twittie bot. Learn more at https://ronnapat.com/tw-bot`, location: githubData })
  console.log('Done!')
}
main().catch(err=> console.log(err))
