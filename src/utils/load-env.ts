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

loadEnv.number = function <R extends boolean = true>(
  key: string,
  required?: R,
): R extends true ? number : number | undefined {
  const raw = loadEnv(key, required);

  if (raw === "") {
    if (required) {
      throw new Error(`Env ${key} cannot be empty`);
    }

    return undefined as any;
  }

  const value = Number(raw);

  if (Number.isNaN(value)) {
    throw new Error(`Env ${key} must be a number`);
  }

  return value;
};
