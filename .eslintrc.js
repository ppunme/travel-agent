module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module",
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/attribute-hyphenation": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/require-prop-types": "off",
    "vue/no-v-html": "off",
  },
};
