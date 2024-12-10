module.exports = {
	trailingComma: 'es5',
	tabWidth: 4,
	semi: true,
	singleQuote: true,
	printWidth: 80,
	bracketSpacing: true,
	arrowParens: 'avoid', // other option 'always'
	requirePragma: false,
	insertPragma: false,
	bracketSameLine: true,
	proseWrap: 'never',
	htmlWhitespaceSensitivity: 'ignore',
	endOfLine: 'auto',
	singleAttributePerLine: false,
	quoteProps: 'as-needed',
	parser: 'typescript',
	useTabs: true,
	overrides: [
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
			options: {
				printWidth: 100,
				tabWidth: 4,
			},
		},
		{
			files: ['*.json', '*.json5'],
			options: {
				printWidth: 200,
				tabWidth: 2,
			},
		},
		{
			files: ['*.md', '*.mdx'],
			options: {
				printWidth: 80,
				proseWrap: 'always',
			},
		},
		{
			files: '.prettierrc',
			options: {
				parser: 'json',
			},
		},
	],
};
