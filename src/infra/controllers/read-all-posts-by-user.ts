import { ClientError, ReadAllPostsByUser } from "../../domain";
import { GenericController, Http } from "./common";
import { PostsCache } from "./ports";

export class ReadAllPostsByUserController implements GenericController {
  constructor(
    private readonly readAllPostsByUser: ReadAllPostsByUser,
    private readonly cachePolicy: PostsCache,
  ) {}

  async handle({ params, query }: Http.Request): Promise<Http.Response> {
    try {
      const { userId } = params;
      const { pagination } = query;
      const dataInCache = await this.cachePolicy.get(userId, pagination);
      if (dataInCache) {
        return { code: 200, data: dataInCache };
      }

      const data = await this.readAllPostsByUser.execute({
        userId,
        pagination,
      });
      await this.cachePolicy.set(userId, pagination, data);
      return { code: 200, data };
    } catch (error) {
      if (error instanceof ClientError) {
        return { code: 400, error: error.message };
      }

      return { code: 400, error: "unknown error" };
    }
  }
}
