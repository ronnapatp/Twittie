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

    var today = new Date();
    today.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })

    var BigDay = new Date("May 7, 2023");
    var msPerDay = 24 * 60 * 60 * 1000;
    var timeLeft = (BigDay.getTime() - today.getTime());
    var e_daysLeft = timeLeft / msPerDay;
    var daysLeft = Math.floor(e_daysLeft);
    let day = daysLeft 
    var yearsLeft = 0;
    if (daysLeft > 365) {
      yearsLeft = Math.floor(daysLeft / 365);
      daysLeft = daysLeft % 365;
    }

    let days;


  if( day == 1 ){
    days = "📣 Tomorrow is Thailand election day"
  } else if ( day == 0) {
    days = "📣 Today is Thailand election day"
  } else {
    days = `📣 Thailand election in ${day} days`
  }
  
  if ( day <= -1 ){
    console.log("Fail!")
  } else {
    await client.v1.tweet(`${days}`)
    console.log("🎉 Success! Updated Twitter statuses/update");
  }
}
main().catch(err=> console.log(err))
