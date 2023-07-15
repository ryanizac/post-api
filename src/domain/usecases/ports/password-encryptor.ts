export type PasswordEncryptor = {
  encrypt(password: string): Promise<string>;
};
