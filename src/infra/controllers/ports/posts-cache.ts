import { ReadAllPostsByUser } from "../../../domain";

export type PostsCache = {
  get(
    userId: string,
    pagination: number,
  ): Promise<ReadAllPostsByUser.Result | null>;
  set(
    userId: string,
    pagination: number,
    data: ReadAllPostsByUser.Result,
  ): Promise<void>;
  clear(userId: string): Promise<void>;
};
