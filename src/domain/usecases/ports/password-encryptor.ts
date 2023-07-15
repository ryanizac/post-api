export type PasswordEncryptor = {
  encrypt(password: string): Promise<string>;
  isValid(raw: string, encrypted: string): Promise<boolean>;
};
