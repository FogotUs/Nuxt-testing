import { builtinModules } from "module"

import jsLint from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort"
import vueLint from "eslint-plugin-vue"
import globals from "globals"
import tsLint from "typescript-eslint"

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"]
    },
    {
        files: ["*.vue", "**/*.vue"],
        languageOptions: {
            parser: "vue-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                sourceType: "module",
            },
        },
    },
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        }
    },
    jsLint.configs.recommended,
    ...tsLint.configs.recommended,
    ...vueLint.configs["flat/essential"],
    {
        rules: {
            'vue/multi-word-component-names': 0,
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    prefer: "type-imports",
                    fixStyle: "separate-type-imports"
                }
            ],
            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                    allowTaggedTemplates: true
                }
            ]
        }
    },
    {
        plugins: {
            "simple-import-sort": pluginSimpleImportSort
        },
        rules: {
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        [
                            `node:`,
                            `^(${builtinModules.join("|")})(/|$)`
                        ],
                        ["^.+\\.less$", "^.+\\.s?css$"],
                        ["^\\u0000"],
                        ["^@?\\w.*\\u0000$", "^[^.].*\\u0000$", "^\\..*\\u0000$"],
                        ["^vue", "^@vue", "^@?\\w", "^\\u0000"],
                        ["^@/utils"],
                        ["^@/composables"],
                        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
                    ]
                }
            ]
        }
    },
    stylistic.configs["disable-legacy"],
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
        commaDangle: "never",

        jsx: true
    }),
    {
        ignores: [
            ".nuxt/**",
            "node_modules",
            "**/node_modules",
            "!./packages/manual-add-lib/node_modules/local-lib.js",
            ".prettierrc.js",
            "eslint.config.mjs",
        ]
    }
]