import dotenv from 'dotenv'
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { TwitterApi } from 'twitter-api-v2';

dotenv.config()

const client = new TwitterApi({
  appKey:       process.env.TWITTER_CONSUMER_KEY as string,
  appSecret:    process.env.TWITTER_CONSUMER_SECRET as string,
  accessToken:  process.env.TWITTER_ACCESS_TOKEN_KEY as string,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});

async function main() {

    const rl = readline.createInterface({ input, output });


    const message = await rl.question("What's your message?");

    const answer = await rl.question("Are you sure? (y/N) ")
        
    if (answer.toLowerCase() === "y") {
        let tweetID = await client.v1.tweet(message)
    } else {
        console.log("Canceled")
    }


  console.log("Done!")
}
main().catch(err=> console.log(err))
