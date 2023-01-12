module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-template-curly-in-string": "error",
    "no-else-return": "error",
    "no-throw-literal": "error",
    "object-shorthand": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/no-floating-promises": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["services/index.ts"],
      rules: {
        "prefer-template": "off",
      },
    },
    {
      files: ["config/theme.ts"],
      rules: {
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  ],
};
