/** @type {import("jest").Config} */
module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
};
