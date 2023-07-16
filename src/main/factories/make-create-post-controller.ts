import { CreatePost } from "../../domain";
import {
  UuidGenerator,
  CreatePostController,
  PostPrismaRepository,
  UserPrismaRepository,
  JWTGenerator,
} from "../../infra";
import { ReadAllPostsByUserCache } from "../caches";

export function makeCreatePostController() {
  const idGenerator = new UuidGenerator();
  const userRepository = new UserPrismaRepository();
  const postRepository = new PostPrismaRepository();
  const authGenerator = new JWTGenerator();
  const usecase = new CreatePost({
    idGenerator,
    userRepository,
    postRepository,
    authGenerator,
  });
  const postCache = new ReadAllPostsByUserCache();
  const controller = new CreatePostController(usecase, postCache);

  return controller;
}
