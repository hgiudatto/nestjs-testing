import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TweetsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  tweets: string[] = [];

  createTweet(tweet: string) {
    if (tweet.length > 100) {
      throw new Error(`Tweet too long`);
    }
    this.tweets.push(tweet);
    return tweet;
  }

  updateTweet(tweet: string, id: number) {
    const tweetToUpdate = this.tweets[id];
    if (!tweetToUpdate) {
      throw new Error(`This tweet does not exist`);
    }
    if (tweet.length > 100) {
      throw new Error(`Tweet too long`);
    }
    this.tweets[id] = tweet;
    return tweet;
  }

  getTweets() {
    return this.tweets;
  }

  deleteTweet(id: number) {
    const tweetToDelete = this.tweets[id];
    if (!tweetToDelete) {
      throw new Error(`This tweet does not exist`);
    }
    const deletedTweet = this.tweets.splice(id, 1);
    return deletedTweet;
  }
}
