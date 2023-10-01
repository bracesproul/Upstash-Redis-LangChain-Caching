import { UpstashRedisCache } from "langchain/cache/upstash_redis";
import dotenv from "dotenv";

// Loads our environment variables from a .env file
dotenv.config();

// Ensures we have the required environment variables
if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error("Missing Upstash Redis REST URL or REST TOKEN");
}

export const upstashRedisCache = new UpstashRedisCache({
  config: {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
});
