import dotenv from 'dotenv'
import { format } from "date-fns";
import Twitter from 'twitter';

dotenv.config()


const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
});



async function main() {
  const currentYear = format(new Date(), "yyyy");
  const d = new Date();
  let nextyear = d.getFullYear() + 1;

  let countDownDate = new Date(`Jan 1, ${nextyear}`).getTime();
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let newyears = Math.floor(distance / (1000 * 60 * 60 * 24));

  let chistmasday = new Date(`Dec 25, ${currentYear}`).getTime();
  let distances = chistmasday - now;
  let christmass = Math.floor(distances / (1000 * 60 * 60 * 24));

  const tweet = {
    status: `New year is in ${newyears} days\nChrismas is in ${christmass} days\n\nAuto tweet from ronnapat.com/tw-bot`
  }

  await client.post("statuses/update", tweet);
    console.log("🎉 Success! Updated Twitter statuses/update");
}
main().catch(err=> console.log(err))
