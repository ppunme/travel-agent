module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module",
  },
  plugins: ["prettier", "vue"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/attribute-hyphenation": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/require-prop-types": "off",
    "vue/no-v-html": "off",
    "prettier/prettier": [
      "error",
      {
        singleAttributePerLine: true,
        vueIndentScriptAndStyle: true,
        bracketSameLine: true,
      },
    ],
  },
};
