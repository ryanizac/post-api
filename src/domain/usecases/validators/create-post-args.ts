import { GenericValidator } from "./common";
import { IdValidator } from "./id";
import { ContentValidator, TitleValidator } from "./post";

export namespace CreatePostArgsValidator {
  type CreatePostArgs = {
    userId: string;
    title: string;
    content: string;
  };

  export function validate(
    args: CreatePostArgs,
  ): GenericValidator.ObjectValidation<CreatePostArgs> {
    const title = TitleValidator.validate(args.title);
    const content = ContentValidator.validate(args.content);
    const userId = IdValidator.validate(args.userId, "userId");

    const errors: string[] = [];
    const all = { title, content, userId } as const;

    for (const result of Object.values(all)) {
      if (typeof result !== "string") {
        errors.push(result.error);
      }
    }

    if (errors.length > 0) {
      return new Error(errors.join(", "));
    }

    return all as CreatePostArgs;
  }
}
