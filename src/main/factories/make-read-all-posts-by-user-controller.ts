import { ReadAllPostsByUser } from "../../domain";
import {
  PostPrismaRepository,
  ReadAllPostsByUserController,
  UserPrismaRepository,
} from "../../infra";

export function makeReadAllPostsByUserController() {
  const userRepository = new UserPrismaRepository();
  const postRepository = new PostPrismaRepository();
  const usecase = new ReadAllPostsByUser({
    userRepository,
    postRepository,
  });
  const controller = new ReadAllPostsByUserController(usecase);

  return controller;
}
