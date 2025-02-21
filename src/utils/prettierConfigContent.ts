export type TailwindConfigFileExtension = 'ts' | 'js';
export type ConfigKey = 'base' | 'v3' | 'v4';

export type PrettierConfigContent = Record<
  TailwindConfigFileExtension,
  Record<ConfigKey, string>
>;

const createConfigContent = (
  type: 'js' | 'ts',
  version: ConfigKey,
  extraContent: string
) => {
  const typeImports =
    type === 'ts'
      ? "import type { Config } from 'prettier';\n"
      : "/**\n * @see https://prettier.io/docs/en/configuration.html\n * @type {import(\"prettier\").Config}\n */\n";

  return `${typeImports}import baseConfig from "@harshalkatakiya/prettier-config";

${type === 'ts' ? 'const config: Config = {' : 'const config = {'}
  ...baseConfig${extraContent ? ',\n  ' + extraContent : ''}
};

export default config;
`;
};

const prettierConfigContents = {
  js: {
    base: createConfigContent('js', 'base', ''),
    v3: createConfigContent(
      'js',
      'v3',
      'plugins: ["prettier-plugin-tailwindcss"],\n  tailwindConfig: "./tailwind.config.js",\n  tailwindFunctions: ["cn"]'
    ),
    v4: createConfigContent(
      'js',
      'v4',
      'plugins: ["prettier-plugin-tailwindcss"],\n  tailwindStylesheet: "./src/app/globals.css",\n  tailwindFunctions: ["cn"]'
    )
  },
  ts: {
    base: createConfigContent('ts', 'base', ''),
    v3: createConfigContent(
      'ts',
      'v3',
      'plugins: ["prettier-plugin-tailwindcss"],\n  tailwindConfig: "./tailwind.config.js",\n  tailwindFunctions: ["cn"]'
    ),
    v4: createConfigContent(
      'ts',
      'v4',
      'plugins: ["prettier-plugin-tailwindcss"],\n  tailwindStylesheet: "./src/app/globals.css",\n  tailwindFunctions: ["cn"]'
    )
  }
} satisfies PrettierConfigContent;

export default prettierConfigContents;
