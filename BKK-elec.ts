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

  let date = new Date(Date.UTC(2021, 5, 28, 3, 0, 0));
  let formatter = new Intl.DateTimeFormat('en-US', { timeZone: "Asia/Bangkok" });   
  let thDate = formatter.format(date);
  const dates = thDate.split("0")
  const datesFormat = dates[0]
  parseFloat(datesFormat)
  let elecday = 22
  let daystoelec = elecday - parseFloat(datesFormat)
  let days;

  if( daystoelec == 1 ){
    days = "📣 Tomorrow is Bangkok election day"
  } else if ( daystoelec == 0) {
    days = "📣 Today is Bangkok election day"
  } else {
    days = `📣 Bangkok election in ${daystoelec} days`
  }

  const tweet = {
    status: days
  }
  if ( daystoelec <= -1 ){
    console.log("Fail!")
  } else {
    await client.post("statuses/update", tweet);
    console.log("🎉 Success! Updated Twitter statuses/update");
  }
}
main().catch(err=> console.log(err))
