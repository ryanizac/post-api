import { ClientError, CreatePost } from "../../domain";
import { GenericController, Http } from "./common";

export class CreatePostController implements GenericController {
  constructor(private readonly createPost: CreatePost) {}

  async handle({ body, headers }: Http.Request): Promise<Http.Response> {
    try {
      const data = await this.createPost.execute(
        {
          content: body.content,
          title: body.title,
          userId: body.userId,
        },
        { token: headers.authorization },
      );
      return { code: 200, data };
    } catch (error) {
      if (error instanceof ClientError) {
        return { code: 400, error: error.message };
      }

      return { code: 400, error: "unknown error" };
    }
  }
}
