import pluginJs from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
	},
	{
		languageOptions: {
			ecmaVersion: "latest",
			globals: { ...globals.browser, ...globals.node, React: "readonly" },
			parser: typescriptParser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: process.cwd(),
				sourceType: "module",
			},
		},
	},
	pluginJs.configs.recommended,
	{
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat["jsx-runtime"],
	{
		plugins: {
			"@next/next": nextPlugin,
			"@typescript-eslint": typescriptPlugin,
			react: reactPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,
			"@next/next/no-img-element": "off",
			"react/react-in-jsx-scope": "off",
			"react/no-unescaped-entities": "off",
			"react/no-unknown-property": "off",
			"react/display-name": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
					args: "none",
				},
			],
			"no-unused-vars": "off",
		},
	},
	{
		ignores: [
			"dist/*",
			".cache",
			"public",
			"node_modules",
			"*.esm.js",
			".next/*",
		],
	},
];




