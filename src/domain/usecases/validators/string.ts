import { GenericValidator } from "./common";

export namespace StringValidator {
  export function validate(
    value: any,
    key: string,
  ): GenericValidator.Validation<string> {
    if (GenericValidator.isEmpty(value)) {
      return { error: `The ${key} must be provided` };
    }

    if (typeof value !== "string") {
      return { error: `The ${key} must be a string` };
    }

    return value;
  }

  export function optional(
    value: any,
    key: string,
  ): GenericValidator.Validation<string | undefined> {
    if (GenericValidator.isEmpty(value)) {
      return undefined;
    }

    if (typeof value !== "string") {
      return { error: `The ${key} must be a string` };
    }

    return value;
  }
}
