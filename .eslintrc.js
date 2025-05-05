module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-expressions": "off",
      },
    },
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": ["error", { allow: ["warn"] }],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-expressions": "off",
  },
  ignorePatterns: [
    "src/**/*.test.ts",
    "src/frontend/generated/*",
    "main.ts",
    "vite.config.ts",
  ],
};
