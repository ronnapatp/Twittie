// import dotenv from 'dotenv'
// import { format } from "date-fns";
// import { TwitterApi } from 'twitter-api-v2';

// dotenv.config()

// const client = new TwitterApi({
//   appKey:       process.env.TWITTER_CONSUMER_KEY as string,
//   appSecret:    process.env.TWITTER_CONSUMER_SECRET as string,
//   accessToken:  process.env.TWITTER_ACCESS_TOKEN_KEY as string,
//   accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
// });

// async function main() {
//   const currentYear = format(new Date(), "yyyy");
//   const d = new Date();
//   let nextyear = d.getFullYear() + 1;

//   let countDownDate = new Date(`Jan 1, ${nextyear}`).getTime();
//   let now = new Date().getTime();
//   let distance = countDownDate - now;
//   let newyears = Math.floor(distance / (1000 * 60 * 60 * 24));

//   let chistmasday = new Date(`Dec 25, ${currentYear}`).getTime();
//   let distances = chistmasday - now;
//   let christmass = Math.floor(distances / (1000 * 60 * 60 * 24));
//   christmass = christmass + 1

//   let tweetID = await client.v1.tweet(`New year is in ${newyears} days`) 
//   await client.v1.reply('Auto tweet from ronnapat.com/tw-bot', tweetID.id_str)

//   console.log("Done!")
// }
// main().catch(err=> console.log(err))
