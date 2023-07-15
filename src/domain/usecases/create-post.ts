import { Post } from "../entities";
import { ClientError } from "../errors";
import { Auth } from "../structs";
import {
  AuthGenerator,
  IdGenerator,
  PostRepository,
  UserRepository,
} from "./ports";
import { CreatePostArgsValidator } from "./validators";

export class CreatePost {
  private readonly userRepository: UserRepository;
  private readonly postRepository: PostRepository;
  private readonly idGenerator: IdGenerator;
  private readonly authGenerator: AuthGenerator;

  constructor(ports: CreatePost.Ports) {
    this.userRepository = ports.userRepository;
    this.postRepository = ports.postRepository;
    this.idGenerator = ports.idGenerator;
    this.authGenerator = ports.authGenerator;
  }

  async execute(
    rawArgs: CreatePost.Args,
    auth: Auth,
  ): Promise<CreatePost.Result> {
    const authValidation = await this.authGenerator.check(auth);

    if ("error" in authValidation) {
      throw new ClientError(authValidation.error);
    }

    const args = CreatePostArgsValidator.validate(rawArgs);

    if (args instanceof Error) {
      throw new ClientError(args.message);
    }

    const { content, title, userId } = args;

    if (authValidation.id !== userId) {
      throw new ClientError(
        "It is not possible to create a post for a different user",
      );
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ClientError("User not found");
    }

    const exists = await this.postRepository.exists(title);
    if (exists) {
      throw new ClientError("The title is already in use");
    }

    const id = this.idGenerator.generate();
    const createAt = new Date();
    const updateAt = createAt;

    const post = new Post({
      id,
      createAt,
      updateAt,
      title,
      content,
      userId,
    });

    await this.postRepository.create(post.props);

    return {
      post: post.toPublic(),
    };
  }
}

export namespace CreatePost {
  export type Ports = {
    userRepository: UserRepository;
    postRepository: PostRepository;
    idGenerator: IdGenerator;
    authGenerator: AuthGenerator;
  };

  export type Args = {
    userId: string;
    title: string;
    content: string;
  };

  export type Result = {
    post: Post.Public;
  };
}
