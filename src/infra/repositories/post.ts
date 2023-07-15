import { PostRepository } from "../../domain";
import { db } from "./common";

export class PostPrismaRepository implements PostRepository {
  async create(data: PostRepository.Data): Promise<void> {
    await db.post.create({
      data: {
        id: data.id,
        createAt: data.createAt,
        updateAt: data.updateAt,
        title: data.title,
        content: data.content,
        userId: data.userId,
      },
    });
  }

  async exists(title: string): Promise<boolean> {
    const found = await db.post.findFirst({
      where: { title },
    });
    return !!found;
  }

  async findAllByUserId(
    userId: string,
    pagination: number,
    take: number,
  ): Promise<PostRepository.Data[]> {
    const skip = pagination * take - take;
    const list = await db.post.findMany({
      where: { userId },
      orderBy: { createAt: "asc" },
      skip,
      take,
    });
    return list;
  }
}
