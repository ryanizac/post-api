import { GenericValidator } from "./common";
import { EmailValidator, NameValidator, PasswordValidator } from "./user";

export namespace CreateUserArgsValidator {
  type CreateUserArgs = {
    name: string;
    email: string;
    password: string;
  };

  export function validate(
    args: CreateUserArgs,
  ): GenericValidator.ObjectValidation<CreateUserArgs> {
    const name = NameValidator.validate(args.email);
    const email = EmailValidator.validate(args.email);
    const password = PasswordValidator.validate(args.password);

    const errors: string[] = [];
    const all = { name, email, password } as const;

    for (const result of Object.values(all)) {
      if (typeof result !== "string") {
        errors.push(result.error);
      }
    }

    if (errors.length > 0) {
      return new Error(errors.join(", "));
    }

    return all as CreateUserArgs;
  }
}
