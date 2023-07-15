import { GenericValidator } from "./common";
import { StringValidator } from "./string";

export namespace LoginArgsValidator {
  type Args = {
    email: string;
    password: string;
  };

  export function validate(
    args: Args,
  ): GenericValidator.ObjectValidation<Args> {
    const email = StringValidator.validate(args.email, "email");
    const password = StringValidator.validate(args.password, "password");

    const errors: string[] = [];
    const all = { email, password } as const;

    for (const result of Object.values(all)) {
      if (typeof result !== "string") {
        errors.push(result.error);
      }
    }

    if (errors.length > 0) {
      return new Error(errors.join(", "));
    }

    return all as Args;
  }
}
