import { ReadAllPostsByUser } from "../../domain";
import { PostsCache } from "../../infra";
import { MappedCache, redis } from "./common";

export class ReadAllPostsByUserCache implements PostsCache {
  private readonly base = MappedCache.POSTS;

  private mountKey(userId: string, pagination: number | string) {
    return `${this.base}-${userId}-${pagination}`;
  }

  async get(
    userId: string,
    pagination: number,
  ): Promise<ReadAllPostsByUser.Result | null> {
    const key = this.mountKey(userId, pagination);
    const result = await redis.get(key);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  async set(
    userId: string,
    pagination: number,
    data: ReadAllPostsByUser.Result,
  ): Promise<void> {
    const key = this.mountKey(userId, pagination);
    await redis.set(key, JSON.stringify(data));
  }
}
