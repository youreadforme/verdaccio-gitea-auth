const cfg = {
  env: {
    es6: true,
    node: true,
    browser: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended", "eslint:recommended"],
  rules: {
    "prettier/prettier": ["error"],
    "no-console": ["off"]
  },
  globals: {
    should: true
  }
};

module.exports = cfg;
