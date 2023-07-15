import { ClientError, Login } from "../../domain";
import { GenericController, Http } from "./common";

export class LoginController implements GenericController {
  constructor(private readonly login: Login) {}

  async handle({ body }: Http.Request): Promise<Http.Response> {
    try {
      const data = await this.login.execute({
        email: body.email,
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
