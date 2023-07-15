import { GenericValidator } from "./common";

export namespace NumberValidator {
  export function optional(
    raw: any,
    key: string,
  ): GenericValidator.Validation<number | undefined> {
    if (GenericValidator.isEmpty(raw)) {
      return undefined;
    }

    if (raw === "") {
      return { error: `The ${key} cannot be empty if provided` };
    }

    const value = Number(raw);

    if (Number.isNaN(value)) {
      return { error: `The ${key} must be a number` };
    }

    return value;
  }
}
