import { GenericValidator } from "../common";

export namespace ContentValidator {
  export function validate(raw: any): GenericValidator.Validation<string> {
    if (GenericValidator.isEmpty(raw)) {
      return { error: "The content must be provided" };
    }

    if (typeof raw !== "string") {
      return { error: "The content must be a string" };
    }

    const value = raw.trim().replace(/ {2,}/g, " ");

    if (value.length < 50) {
      return { error: "The content must be at least 50 characters long" };
    }

    if (value.length > 240) {
      return { error: "The content must be a maximum of 240 characters" };
    }

    return value;
  }
}
