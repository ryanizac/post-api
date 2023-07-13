import { CreateUser } from "../../domain";
import {
  UuidGenerator,
  CreateUserController,
  UserPrismaRepository,
} from "../../infra";

export function makeCreateUserController() {
  const idGenerator = new UuidGenerator();
  const userRepository = new UserPrismaRepository();
  const usecase = new CreateUser({ idGenerator, userRepository });
  const controller = new CreateUserController(usecase);

  return controller;
}
