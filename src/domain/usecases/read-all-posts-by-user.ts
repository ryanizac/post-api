import { Post } from "../entities";
import { ClientError } from "../errors";
import { PostRepository, UserRepository } from "./ports";
import { ReadAllPostsByUserArgsValidator } from "./validators";

export class ReadAllPostsByUser {
  private readonly userRepository: UserRepository;
  private readonly postRepository: PostRepository;

  constructor(ports: ReadAllPostsByUser.Ports) {
    this.postRepository = ports.postRepository;
    this.userRepository = ports.userRepository;
  }

  async execute(
    rawArgs: ReadAllPostsByUser.Args,
  ): Promise<ReadAllPostsByUser.Result> {
    const args = ReadAllPostsByUserArgsValidator.validate(rawArgs);

    if (args instanceof Error) {
      throw new ClientError(args.message);
    }

    const { userId, pagination = 1 } = args;

    if (pagination < 1) {
      throw new ClientError("Pagination cannot be less than 1 if provided");
    }

    const exists = await this.userRepository.findById(userId);

    if (!exists) {
      throw new ClientError("User not found");
    }

    const take = 10;
    const posts = await this.postRepository.findAllByUserId(
      userId,
      pagination,
      take,
    );

    return {
      posts,
      pagination,
      count: posts.length,
      skiped: pagination * take - take,
    };
  }
}

export namespace ReadAllPostsByUser {
  export type Ports = {
    postRepository: PostRepository;
    userRepository: UserRepository;
  };

  export type Args = {
    userId: string;
    pagination?: number;
  };

  export type Result = {
    posts: Post.Public[];
    pagination: number;
    count: number;
    skiped: number;
  };
}
