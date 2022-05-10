import dotenv from 'dotenv'
import Twitter from 'twitter';

dotenv.config()


const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
});


async function main() {

  var today = new Date();
  today.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
  var dd: any = String(today.getDate()).padStart(2, '0');
  let elecday = 22
  let daystoelec = elecday - dd
  let days;

  if( daystoelec == 1 ){
    days = "📣 Tomorrow is Bangkok election day"
  } else if ( daystoelec == 0) {
    days = "📣 Today is Bangkok election day"
  } else {
    days = `📣 Bangkok election in ${daystoelec} days`
  }
  const tweet = {
    status: `${days}\n\nAuto tweet from ronnapat.com/tw-bot`
  }
  if ( daystoelec <= -1 ){
    console.log("Fail!")
  } else {
    await client.post("statuses/update", tweet);
    console.log("🎉 Success! Updated Twitter statuses/update");
  }
}
main().catch(err=> console.log(err))
