import { Auth } from "../../structs";

export type AuthGenerator = {
  generate(payload: Auth.Payload): Promise<Auth>;
  check(auth: Auth): Promise<Auth.Payload | AuthGenerator.CheckError>;
};

export namespace AuthGenerator {
  export type CheckError = {
    error: string;
  };
}
