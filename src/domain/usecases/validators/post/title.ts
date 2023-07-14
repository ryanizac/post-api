import { GenericValidator } from "../common";

export namespace TitleValidator {
  export function validate(raw: any): GenericValidator.Validation<string> {
    if (GenericValidator.isEmpty(raw)) {
      return { error: "The title must be provided" };
    }

    if (typeof raw !== "string") {
      return { error: "The title must be a string" };
    }

    const value = raw.trim().replace(/ {2,}/g, " ");

    if (value.length < 4) {
      return { error: "The title must be at least 4 characters long" };
    }

    if (value.length > 240) {
      return { error: "The title must be a maximum of 240 characters" };
    }

    return value;
  }
}
