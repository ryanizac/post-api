import {
  makeCreateUserController,
  makeReadAllPostsByUserController,
} from "../factories";
import { Route } from "./common";

export const userRoutes: Route[] = [
  ["/user", "post", makeCreateUserController],
  ["/user/:userId/posts", "get", makeReadAllPostsByUserController],
];
