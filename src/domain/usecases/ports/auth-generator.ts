import { Auth } from "../../structs";

export type AuthGenerator = {
  generate(payload: Auth.Payload): Promise<Auth>;
};
