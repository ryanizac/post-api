import { PasswordEncryptor } from "../../domain";
import bcrypt from "bcrypt";

export class BcryptPassword implements PasswordEncryptor {
  private readonly saltRounds = 10;

  async encrypt(password: string): Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, this.saltRounds);
    return encryptedPassword;
  }

  async isValid(raw: string, encrypted: string): Promise<boolean> {
    const isValid = await bcrypt.compare(raw, encrypted);
    return isValid;
  }
}
