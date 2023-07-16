import { ClientError, CreatePost } from "../../domain";
import { GenericController, Http } from "./common";
import { PostsCache } from "./ports";

export class CreatePostController implements GenericController {
  constructor(
    private readonly createPost: CreatePost,
    private readonly postsCache: PostsCache,
  ) {}

  async handle({ body, headers }: Http.Request): Promise<Http.Response> {
    try {
      const { userId, title, content } = body;
      const token = headers.authorization;
      const data = await this.createPost.execute(
        { userId, title, content },
        { token },
      );
      await this.postsCache.clear(userId);
      return { code: 200, data };
    } catch (error) {
      if (error instanceof ClientError) {
        return { code: 400, error: error.message };
      }

      return { code: 400, error: "unknown error" };
    }
  }
}
