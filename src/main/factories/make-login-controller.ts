import { Login } from "../../domain";
import {
  LoginController,
  UserPrismaRepository,
  JWTGenerator,
  BcryptPassword,
} from "../../infra";

export function makeLoginController() {
  const authGenerator = new JWTGenerator();
  const userRepository = new UserPrismaRepository();
  const passwordEncryptor = new BcryptPassword();
  const usecase = new Login({
    userRepository,
    authGenerator,
    passwordEncryptor,
  });
  const controller = new LoginController(usecase);

  return controller;
}
