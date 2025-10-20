import { Redis as upstashRedis } from "@upstash/redis";

const globalForRedis = globalThis as unknown as {
  redis: upstashRedis | undefined;
};

function createRedisClient(): upstashRedis | undefined {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.warn("Redis environment variables are not set properly");
    return undefined;
  }

  try {
    return new upstashRedis({
      url: process.env.KV_REST_API_URL as string,
      token: process.env.KV_REST_API_TOKEN as string,
    });
  } catch (error) {
    console.error("Failed to initialize Redis client:", error);
    return undefined;
  }
}

const getRedisClient = (): upstashRedis | undefined => {
  if (process.env.NODE_ENV === "production") {
    if (!globalForRedis.redis) {
      globalForRedis.redis = createRedisClient();
    }
    return globalForRedis.redis;
  }

  return createRedisClient();
};

const redisClient = getRedisClient();
if (!redisClient) {
  throw new Error("Failed to initialize Redis client");
}

export const redis = redisClient;
