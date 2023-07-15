import { Auth, AuthGenerator } from "../../domain";
import jwt from "jsonwebtoken";
import { loadEnv } from "../../utils";

export class JWTGenerator implements AuthGenerator {
  private readonly secretKey = loadEnv("JWT_SECRET");
  private readonly expiresIn = "1d";

  async generate(payload: Auth.Payload): Promise<Auth> {
    const secretKey = this.secretKey;
    const expiresIn = this.expiresIn;
    const token = jwt.sign(payload, secretKey, { expiresIn });

    return { token };
  }
}
