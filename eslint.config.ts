import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  {
    files: ['**/*.{js,mjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.cjs', '*.config.js', '*.config.cjs', '.stylelintrc.cjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 5,
          multiline: 3,
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': [
        'error',
        {
          svg: {
            use: 'never',
          },
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,ts,mts,cts,vue}'],
    rules: {
      // 关闭原生 JavaScript 未使用变量检查
      'no-unused-vars': 'off',
      // 关闭 TypeScript 未使用导入/变量检查（你报错的核心规则）
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])
