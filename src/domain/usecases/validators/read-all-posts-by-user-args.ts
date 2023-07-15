import { GenericValidator } from "./common";
import { NumberValidator } from "./number";
import { StringValidator } from "./string";

export namespace ReadAllPostsByUserArgsValidator {
  type Args = {
    userId: string;
    pagination?: number;
  };

  export function validate(
    args: Args,
  ): GenericValidator.ObjectValidation<Args> {
    const userId = StringValidator.validate(args.userId, "userId");
    const pagination = NumberValidator.optional(args.pagination, "pagination");

    const errors: string[] = [];
    const all = { userId, pagination } as const;

    for (const result of Object.values(all)) {
      if (typeof result === "object") {
        errors.push(result.error);
      }
    }

    if (errors.length > 0) {
      return new Error(errors.join(", "));
    }

    return all as Args;
  }
}
