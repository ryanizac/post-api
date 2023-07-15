import { authRoutes } from "./auth";
import { Route } from "./common";
import { postRoutes } from "./post";
import { userRoutes } from "./user";

export const routes: Route[] = [...userRoutes, ...postRoutes, ...authRoutes];
