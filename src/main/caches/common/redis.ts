import Redis from "ioredis";
import { loadEnv } from "../../../utils";

export const redis = new Redis({
  host: loadEnv("REDIS_HOST"),
  port: loadEnv.number("REDIS_PORT"),
});

redis.on("error", (error) => {
  throw new Error(error.message);
});
