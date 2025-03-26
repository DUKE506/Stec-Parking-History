import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // '@typescript-eslint/no-explicit-any' 규칙을 비활성화
      "@typescript-eslint/no-explicit-any": "off",

      // 또는 경고 수준으로 완화
      // '@typescript-eslint/no-explicit-any': 'warn'

      // React Hooks 관련 규칙 비활성화
      "react-hooks/exhaustive-deps": "off",

      // 사용되지 않은 변수 무시
      "@typescript-eslint/no-unused-vars": "off",

      // 타입스크립트 표현식 관련 규칙 비활성화
      "@typescript-eslint/no-unused-expressions": "off",

      // React children prop 규칙 비활성화
      "react/no-children-prop": "off",
    },
  },
];

export default eslintConfig;
