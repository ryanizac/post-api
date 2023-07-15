export function loadEnv<R extends boolean = true>(
  key: string,
  required?: R,
): R extends true ? string : string | undefined {
  const value = process.env[key];

  if (required && value === undefined) {
    throw new Error("Error on load env " + key);
  }

  return value as any;
}
