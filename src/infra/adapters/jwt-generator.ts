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

  async check(auth: Auth): Promise<Auth.Payload | AuthGenerator.CheckError> {
    const secretKey = this.secretKey;
    const expiresIn = this.expiresIn;

    try {
      const payload = jwt.verify(auth.token, secretKey);
      return payload as Auth.Payload;
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message;

        if (
          message.includes("jwt malformed") ||
          message.includes("invalid signature")
        ) {
          return { error: "invalid token" };
        }
      }

      return {
        error: "error validating token",
      };
    }
  }
}
