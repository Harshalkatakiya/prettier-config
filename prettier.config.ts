import type { Config } from 'prettier';

const config: Config = {
  experimentalTernaries: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'always',
  singleAttributePerLine: false,
  embeddedLanguageFormatting: 'auto'
};

export default config;
