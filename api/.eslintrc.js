module.exports = {
  root: true,
  env: {
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'no-console': 0,
    'no-control-regex': 0,
    camelcase: 0,
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
