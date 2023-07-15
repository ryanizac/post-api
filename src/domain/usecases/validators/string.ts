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
}
