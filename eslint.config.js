import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      /* Marque les composants/variables utilisés en JSX comme utilisés
         (évite les faux positifs no-unused-vars sur `motion`, etc.) */
      'react/jsx-uses-vars': 'error',
      /* Les helpers ouvrirModalContact/ouvrirModalDemo sont exportés depuis
         des fichiers de composants — toléré explicitement */
      'react-refresh/only-export-components': [
        'error',
        { allowExportNames: ['ouvrirModalContact', 'ouvrirModalDemo'] },
      ],
    },
  },
  {
    /* Fonctions serverless Vercel — environnement Node */
    files: ['api/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
