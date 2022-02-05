import dotenv from 'dotenv'
// import { format } from "date-fns";
import Twitter from 'twitter';

dotenv.config()


const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
});

async function main() {
  let countDownDate = new Date("Jan 1, 2023").getTime();
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let newyear = `New year is in ${days} day`
  const params = {
    description: newyear,
  };


  await client.post("account/update_profile", params);
    console.log("🎉 Success! Updated Twitter bio/location and website");
}

main().catch(err=> console.log(err))
