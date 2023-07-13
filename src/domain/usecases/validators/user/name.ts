import { GenericValidator } from "../common";

export namespace NameValidator {
  export function validate(raw: any): GenericValidator.Validation<string> {
    if (GenericValidator.isEmpty(raw)) {
      return { error: "The name must be provided" };
    }

    if (typeof raw !== "string") {
      return { error: "The name must be a string" };
    }

    const value = raw.trim().replace(/ {2,}/g, " ");

    if (value.length === 0) {
      return { error: "The name cannot be empty" };
    }

    if (value.length < 2) {
      return { error: "The name must be at least 2 characters long" };
    }

    if (value.length > 100) {
      return { error: "The name must be a maximum of 100 characters" };
    }

    return value;
  }
}
