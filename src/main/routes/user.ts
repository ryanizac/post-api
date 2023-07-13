import { makeCreateUserController } from "../factories";
import { Route } from "./common";

export const userRoutes: Route[] = [
  ["/user", "post", makeCreateUserController],
];
