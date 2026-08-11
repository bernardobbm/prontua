import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores(['dist', './**/routeTree.gen.ts']),
  {
    files: [
      './src/**/*.{ts,tsx,js,jsx}',
      './src/*.{ts,tsx,js,jsx}',
      './**/**/*.{ts,tsx,js,jsx}',
    ],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,

      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          plugins: ['prettier-plugin-tailwindcss'],
          singleQuote: true,
          trailingComma: 'all',
          jsxSingleQuote: true,
        },
      ],
    },
  },
]);
