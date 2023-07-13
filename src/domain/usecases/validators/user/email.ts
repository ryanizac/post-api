import { GenericValidator } from "../common";

export namespace EmailValidator {
  const emailTester = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+\.[a-z]+$/;

  export function validate(raw: any): GenericValidator.Validation<string> {
    if (GenericValidator.isEmpty(raw)) {
      return { error: "The email must be provided" };
    }

    if (typeof raw !== "string") {
      return { error: "The email must be a string" };
    }

    const value = raw.trim();

    if (!emailTester.test(value)) {
      return { error: "The email has an invalid format" };
    }

    return value;
  }
}
