// ESLint rules that understand TypeScript syntax
import tseslint from '@typescript-eslint/eslint-plugin';
// Parser that reads TypeScript code (ESLint can't do it on its own)
import tsParser from '@typescript-eslint/parser';
// Turns off ESLint rules that would conflict with Prettier formatting
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    // Only lint TypeScript files
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      // Use the TypeScript parser instead of the default JS one
      parser: tsParser,
      parserOptions: {
        // Support modern JavaScript syntax (async/await, optional chaining, etc.)
        ecmaVersion: 'latest',
        // Treat files as ES modules (allows import/export)
        sourceType: 'module',
      },
    },

    plugins: {
      // Register the TypeScript plugin so we can use its rules
      '@typescript-eslint': tseslint,
    },

    rules: {
      // Apply all recommended TypeScript rules (no-unused-vars, no-explicit-any, etc.)
      ...tseslint.configs.recommended.rules,
    },
  },

  // Disable any ESLint formatting rules — Prettier handles formatting, not ESLint
  prettierConfig,

  {
    // Skip these folders entirely — no need to lint generated or installed files
    ignores: ['node_modules/', 'build/', 'dist/', '.cache/', '**/.react-router/'],
  },
];
