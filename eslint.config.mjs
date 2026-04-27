import { fixupPluginRules } from '@eslint/compat';
import expoConfig from 'eslint-config-expo/flat.js';
import lodashPlugin from 'eslint-plugin-lodash';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactNativePlugin from 'eslint-plugin-react-native';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	expoConfig,
	// eslint-plugin-react uses removed ESLint 10 APIs when resolving "detect".
	{
		settings: {
			react: {
				version: '19.2',
			},
		},
	},
	eslintPluginPrettierRecommended,
	{
		ignores: ['dist/*'],
	},
	{
		files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
		rules: {
			'prefer-const': 'warn',
			'no-constant-binary-expression': 'error',
		},
	},
	{
		plugins: {
			lodash: fixupPluginRules(lodashPlugin),
			'react-native': fixupPluginRules(reactNativePlugin),
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					jsxSingleQuote: true,
					printWidth: 120,
					useTabs: true,
				},
			],
			'lodash/import-scope': ['error', 'method'],
			'lodash/prefer-lodash-method': [
				'error',
				{
					ignoreMethods: ['replace'],
				},
			],
			'react-native/no-unused-styles': 'error',
		},
	},
]);
