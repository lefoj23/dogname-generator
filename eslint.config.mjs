import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "prettier",
    "stylelint-config-prettier",
    "eslint-config-prettier",
    "eslint-plugin-prettier",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-import",
    "eslint-plugin-node",
    "eslint-plugin-promise",
    "eslint-plugin-unicorn",
    "eslint-plugin-sonarjs",
    "eslint-plugin-security",
    "eslint-plugin-compat",
    "eslint-plugin-etc",
    "eslint-plugin-jest",
    "eslint-plugin-testing-library",
  ]),
]);

export default eslintConfig;
