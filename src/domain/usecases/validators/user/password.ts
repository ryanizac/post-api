import { GenericValidator } from "../common";

export namespace PasswordValidator {
  const characterTesters: readonly RegExp[] = [
    /[A-z]/g,
    /[0-9]/g,
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
  ];

  export function validate(value: any): GenericValidator.Validation<string> {
    if (GenericValidator.isEmpty(value)) {
      return { error: "The password must be provided" };
    }

    if (typeof value !== "string") {
      return { error: "The password must be a string" };
    }

    if (value.length < 8) {
      return { error: "The password must be at least 8 characters long" };
    }

    if (value.length > 32) {
      return { error: "The password must be a maximum of 32 characters" };
    }

    let passedTestCounter = 0;

    for (const tester of characterTesters) {
      if (tester.test(value)) {
        passedTestCounter++;
      }
    }

    if (passedTestCounter < 2) {
      return {
        error:
          "The password must contain at least two types of characters (letters, numbers and special)",
      };
    }

    return value;
  }
}
