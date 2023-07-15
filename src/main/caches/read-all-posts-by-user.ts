import { ReadAllPostsByUser } from "../../domain";
import { CacheUseCase } from "../../infra";
import { MappedCache, redis } from "./common";

export class ReadAllPostsByUserCache
  implements CacheUseCase<ReadAllPostsByUser>
{
  private readonly base = MappedCache.POSTS;

  private mountKey({ userId, pagination }: ReadAllPostsByUser.Args) {
    return `${this.base}-${userId}-${pagination}`;
  }

  async get(
    args: ReadAllPostsByUser.Args,
  ): Promise<ReadAllPostsByUser.Result | null> {
    const key = this.mountKey(args);
    const result = await redis.get(key);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  async set(
    args: ReadAllPostsByUser.Args,
    data: ReadAllPostsByUser.Result,
  ): Promise<void> {
    const key = this.mountKey(args);
    await redis.set(key, JSON.stringify(data));
  }
}
