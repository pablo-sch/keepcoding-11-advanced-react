import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist'],

    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },

    extends: [
      js.configs.recommended,
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react-refresh/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],

    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'warn',
    },
  },
];
