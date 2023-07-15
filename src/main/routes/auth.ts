import { makeLoginController } from "../factories";
import { Route } from "./common";

export const authRoutes: Route[] = [
  ["/auth/login", "post", makeLoginController],
];
