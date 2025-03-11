import js from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist"] },
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "func-style": ["error", "expression"],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "react/destructuring-assignment": ["error", "always"],
    },
  },
  {
    plugins: {
      import: eslintPluginImport,
    },

    rules: {
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "object",
          ], // 그룹핑 순서
          "pathGroups": [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "./pages/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "./layouts/**",
              group: "internal",
            },
            {
              pattern: "./apis/**",
              group: "internal",
            },
            {
              pattern: "./components/**",
              group: "internal",
            },
            {
              pattern: "./hooks/**",
              group: "internal",
            },
            {
              pattern: "./assets/**",
              group: "internal",
              position: "after",
            },
          ],
          "pathGroupsExcludedImportTypes": ["react"], // external로 간주되어 alias 적용안되는 문제 해결
          "alphabetize": {
            order: "asc",
            caseInsensitive: true, // 대문자 우선
          },
          "newlines-between": "always",
        },
      ],
    },
  },
];
