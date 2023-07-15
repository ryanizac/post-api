import { ReadAllPostsByUser } from "../../domain";
import {
  PostPrismaRepository,
  ReadAllPostsByUserController,
  UserPrismaRepository,
} from "../../infra";
import { ReadAllPostsByUserCache } from "../caches";

export function makeReadAllPostsByUserController() {
  const userRepository = new UserPrismaRepository();
  const postRepository = new PostPrismaRepository();
  const usecase = new ReadAllPostsByUser({
    userRepository,
    postRepository,
  });
  const cachePolicy = new ReadAllPostsByUserCache();
  const controller = new ReadAllPostsByUserController(usecase, cachePolicy);

  return controller;
}
