import { makeCreatePostController } from "../factories";
import { Route } from "./common";

export const postRoutes: Route[] = [
  ["/post", "post", makeCreatePostController],
];
