import { CreateUser } from "../../domain";
import {
  UuidGenerator,
  CreateUserController,
  UserPrismaRepository,
  BcryptPassword,
} from "../../infra";

export function makeCreateUserController() {
  const idGenerator = new UuidGenerator();
  const userRepository = new UserPrismaRepository();
  const passwordEncryptor = new BcryptPassword();
  const usecase = new CreateUser({
    idGenerator,
    userRepository,
    passwordEncryptor,
  });
  const controller = new CreateUserController(usecase);

  return controller;
}
