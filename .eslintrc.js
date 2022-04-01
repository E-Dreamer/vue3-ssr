module.exports = {
  root: true,
  env: {
      node: true,
  },
  extends: [
      "plugin:vue/essential",
      "eslint:recommended",
      "@vue/typescript/recommended",
      "@vue/prettier",
      "@vue/prettier/@typescript-eslint", //注意顺序
  ],
  parserOptions: {
      ecmaVersion: 7,
      sourceType: "module"
  },
  rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "prettier/prettier": "off", //关闭prettier的提示
      '@typescript-eslint/no-var-requires': 0,
      "@typescript-eslint/explicit-module-boundary-types":'off',
      "@typescript-eslint/ban-types":'off',
      "vue/no-multiple-template-root":'off'
  },
};