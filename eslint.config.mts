import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import adminAppEslintrcAutoImportJson from './admin-app/.eslintrc-auto-import.json'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'] },
  {
    ignores: ['node_modules', '**/dist/**'],
  },
  { languageOptions: { globals: globals.browser } },
  // admin-app项目，增加增加auto-imports的相关globals
  {
    files: ['admin-app/**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...adminAppEslintrcAutoImportJson.globals,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser, ecmaFeatures: { jsx: true } },
    },
    rules: {},
  },
  { files: ['**/__tests__/*'], ...pluginVitest.configs.recommended },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // 添加这一行来强制类型导入使用 import type
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      'vue/multi-word-component-names': 'off',
    },
  },
  eslintConfigPrettier,
]
