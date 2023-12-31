import { UserRepository } from "../../domain";
import { db } from "./common";

export class UserPrismaRepository implements UserRepository {
  async create(data: UserRepository.Data): Promise<void> {
    await db.user.create({
      data: {
        id: data.id,
        createAt: data.createAt,
        updateAt: data.updateAt,
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async exists(email: string): Promise<boolean> {
    const found = await db.user.findFirst({
      where: { email },
    });
    return !!found;
  }

  async findById(id: string): Promise<UserRepository.Data | null> {
    const found = await db.user.findFirst({
      where: { id },
    });
    return found;
  }

  async findByEmail(email: string): Promise<UserRepository.Data | null> {
    const found = await db.user.findFirst({
      where: { email },
    });
    return found;
  }
}
