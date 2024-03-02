module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "preact",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
  ignorePatterns: ["**/*.css", "**/*.woff2", "**/*.woff"],
};
