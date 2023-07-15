import { ClientError, ReadAllPostsByUser } from "../../domain";
import { GenericController, Http, CacheUseCase } from "./common";

export class ReadAllPostsByUserController implements GenericController {
  constructor(
    private readonly readAllPostsByUser: ReadAllPostsByUser,
    private readonly cachePolicy: CacheUseCase<ReadAllPostsByUser>,
  ) {}

  async handle({ params, query }: Http.Request): Promise<Http.Response> {
    try {
      const args = { userId: params.userId, pagination: query.pagination };
      const dataInCache = await this.cachePolicy.get(args);
      if (dataInCache) {
        return { code: 200, data: dataInCache };
      }

      const data = await this.readAllPostsByUser.execute(args);
      await this.cachePolicy.set(args, data);
      return { code: 200, data };
    } catch (error) {
      if (error instanceof ClientError) {
        return { code: 400, error: error.message };
      }

      return { code: 400, error: "unknown error" };
    }
  }
}
