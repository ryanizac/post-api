import { ClientError, CreateUser } from "../../domain";
import { GenericController, Http } from "./common";

export class CreateUserController implements GenericController {
  constructor(private readonly createUser: CreateUser) {}

  async handle({ body }: Http.Request): Promise<Http.Response> {
    try {
      const data = await this.createUser.execute({
        email: body.email,
        name: body.name,
        password: body.password,
      });
      return { code: 200, data };
    } catch (error) {
      if (error instanceof ClientError) {
        return { code: 400, error: error.message };
      }

      return { code: 400, error: "unknown error" };
    }
  }
}
