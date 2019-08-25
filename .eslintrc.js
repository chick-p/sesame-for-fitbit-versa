module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
  "rules": {
    "quotes": [2, "single"],
    "no-var": 2,
    "indent": ["warn", 2, { SwitchCase: 1 }],
    "key-spacing": "warn",
    "keyword-spacing": "warn"
  }
};
