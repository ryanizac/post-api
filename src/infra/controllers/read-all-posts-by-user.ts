import { ClientError, ReadAllPostsByUser } from "../../domain";
import { GenericController, Http } from "./common";

export class ReadAllPostsByUserController implements GenericController {
  constructor(private readonly readAllPostsByUser: ReadAllPostsByUser) {}

  async handle({ params, query }: Http.Request): Promise<Http.Response> {
    try {
      const data = await this.readAllPostsByUser.execute({
        userId: params.userId,
        pagination: query.pagination,
      });
      return { code: 200, data };
    } catch (error) {
      if (error instanceof ClientError) {
        return { code: 400, error: error.message };
      }

      return { code: 400, error: "unknown error" };
    }
  }
}
