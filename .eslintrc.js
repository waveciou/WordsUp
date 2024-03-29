module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // indent: ['error', 2, { SwitchCase: 1 }],
    // 'linebreak-style': ['off', 'unix'],
    // quotes: ['error', 'single'],
    // semi: ['error', 'always'],
    // 'max-len': ['off'],
    'no-unused-vars': ['off'],
    'no-undef': ['off'],
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': ['off'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
        custom: 'ignore',
        exceptions: [''],
      },
    ],
    'react-hooks/exhaustive-deps': ['off'],
    'react/require-default-props': ['off'],
  },
};
