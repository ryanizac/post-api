import { CreatePost } from "../../domain";
import {
  UuidGenerator,
  CreatePostController,
  PostPrismaRepository,
  UserPrismaRepository,
} from "../../infra";

export function makeCreatePostController() {
  const idGenerator = new UuidGenerator();
  const userRepository = new UserPrismaRepository();
  const postRepository = new PostPrismaRepository();
  const usecase = new CreatePost({
    idGenerator,
    userRepository,
    postRepository,
  });
  const controller = new CreatePostController(usecase);

  return controller;
}
