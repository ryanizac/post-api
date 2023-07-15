import { Login } from "../../domain";
import {
  LoginController,
  UserPrismaRepository,
  JWTGenerator,
} from "../../infra";

export function makeLoginController() {
  const authGenerator = new JWTGenerator();
  const userRepository = new UserPrismaRepository();
  const usecase = new Login({ userRepository, authGenerator });
  const controller = new LoginController(usecase);

  return controller;
}
