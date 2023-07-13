export namespace GenericValidator {
  const emptyValues = [null, undefined] as const;

  export function isEmpty(value: any): value is null | undefined {
    return emptyValues.includes(value);
  }

  export type ObjectValidation<T extends object> = T | Error;

  export type Validation<T> =
    | (T extends object ? T & { error?: never } : T)
    | { error: string };
}
