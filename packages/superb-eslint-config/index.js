module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended', // react 规则
    'plugin:jsx-a11y/recommended', // jsx规则
    'plugin:@typescript-eslint/recommended', // ts 规则
    'prettier',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },

  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'no-new': 'off',
    'no-shadow': 'off',
    'no-bitwise': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'default-case': 'off',
    'prefer-template': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-globals': 'off',
    'no-use-before-define': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    // jsx
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/destructuring-assignment': 'off',
    'react/button-has-type': 'off',
    // eslint-plugin-import
    'import/order': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',
    // typescript-eslint
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
