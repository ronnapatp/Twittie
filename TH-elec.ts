import dotenv from 'dotenv'
import Twitter from 'twitter';
import { TwitterApi } from 'twitter-api-v2';

dotenv.config()


const client = new TwitterApi({
    appKey:       process.env.TWITTER_CONSUMER_KEY as string,
    appSecret:    process.env.TWITTER_CONSUMER_SECRET as string,
    accessToken:  process.env.TWITTER_ACCESS_TOKEN_KEY as string,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
  });


async function main() {
  let today = new Date();
  today.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })

  let ElecDay = new Date("May 7, 2023");
  let msPerDay = 24 * 60 * 60 * 1000;
  let timeLeft = (ElecDay.getTime() - today.getTime());
  let e_daysLeft = timeLeft / msPerDay;
  let daysLeft = Math.floor(e_daysLeft);
  if (daysLeft > 365) {
    daysLeft = daysLeft % 365;
  }

  daysLeft = daysLeft + 1;
  let days: string;

  // Switch case that tweet daysleft
  switch (daysLeft) {
    case 0:
      days = `Today is the Election Day!`
      break;
    case 1:
      days = `Tomorrow is the Election Day!`
      break;
    default:
      days = `${daysLeft} days left until the Election Day!`
      break;
  }
  
  if ( daysLeft <= -1 ){
    console.log("Fail!")
  } else {
    await client.v1.tweet(`${days}`)
    console.log("🎉 Success! Updated Twitter statuses/update");
  }
}
main().catch(err=> console.log(err))
