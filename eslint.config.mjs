// Root ESLint flat config that covers both the Vue app and NestJS backend
// It resolves plugins relative to each package directory so we can keep dependencies per-package.

// @ts-check
import path from 'node:path'
import {createRequire} from 'node:module'

// Helpers to resolve modules from package subfolders
const requireFrom = (pkgPath) => createRequire(path.resolve(pkgPath))
const requireApp = requireFrom('./app/package.json')
const requireBackend = requireFrom('./backend/package.json')

// Shared
const eslint = requireBackend('@eslint/js')
const globals = requireBackend('globals')
const tseslint = requireBackend('typescript-eslint')
const prettierRecommended = requireBackend('eslint-plugin-prettier/recommended')

// App (Vue) specific
const pluginVue = requireApp('eslint-plugin-vue')
const { defineConfigWithVueTs, vueTsConfigs } = requireApp('@vue/eslint-config-typescript')
const pluginVitest = requireApp('@vitest/eslint-plugin')
const pluginOxlint = requireApp('eslint-plugin-oxlint')
const unusedImports = requireApp('eslint-plugin-unused-imports')

export default [
    // Global ignores
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/coverage/**',
            '**/.output/**',
            '**/.vite/**',
            '**/.nyc_output/**',
            '**/.turbo/**',
            '**/.next/**',
        ],
    },

    // Backend (NestJS/TypeScript)
    ...tseslint.config(
        {
            name: 'backend/files-to-lint',
            files: ['**/*.{ts,js}'],
            ignores: ['app/**'],
        },
        eslint.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
        prettierRecommended,
        {
            languageOptions: {
                globals: {
                    ...globals.node,
                    ...globals.jest,
                },
                sourceType: 'commonjs',
                parserOptions: {
                    projectService: true,
                    // Point TypeScript to the backend folder for tsconfig resolution
                    tsconfigRootDir: path.resolve('backend'),
                },
            },
        },
        {
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-floating-promises': 'warn',
                '@typescript-eslint/no-unsafe-argument': 'warn',
            },
        },
    ),

    // App (Vue + TS)
    defineConfigWithVueTs(
        {
            name: 'app/files-to-lint',
            files: ['app/**/*.{ts,mts,tsx,vue}', '**/*.{ts,mts,tsx,vue}'],
            ignores: ['backend/**'],
        },

        // Basic ignores for app test/build outputs
        {
            ignores: [
                'app/**/dist/**',
                'app/**/dist-ssr/**',
                'app/**/coverage/**',
                'app/**/*.test.{js,ts,jsx,tsx,vue}',
                'app/**/*.spec.{js,ts,jsx,tsx,vue}',
                'app/**/tests/**',
                'app/**/test/**',
                'app/**/__tests__/**',
                'app/e2e/**',
                'app/src/**/__tests__/**',
            ],
        },

        pluginVue.configs['flat/essential'],
        vueTsConfigs.recommended,
        prettierRecommended,

        {
            ...pluginVitest.configs.recommended,
            files: ['app/src/**/__tests__/*'],
        },

        ...pluginOxlint.configs['flat/recommended'],

        {
            plugins: {
                'unused-imports': unusedImports,
            },
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
                'unused-imports/no-unused-imports': 'error',
                'unused-imports/no-unused-vars': [
                    'warn',
                    {
                        vars: 'all',
                        varsIgnorePattern: '^_',
                        args: 'after-used',
                        argsIgnorePattern: '^_',
                    },
                ],
            },
        },
    ),
]
