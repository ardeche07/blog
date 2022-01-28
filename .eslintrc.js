module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "jsx-a11y"],
  extends: [
    "next",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  rules: {
    "import/no-anonymous-default-export": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@next/next/no-img-element": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
    linkComponents: [{ name: "Link", linkAttribute: "href" }],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
