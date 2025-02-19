export interface PrettierConfigContentVersions {
  base: string;
  v3: string;
  v4: string;
}

export interface PrettierConfigContent {
  js: PrettierConfigContentVersions;
  ts: PrettierConfigContentVersions;
}

const prettierConfigContents: PrettierConfigContent = {
  js: {
    base: `import baseConfig from "@harshalkatakiya/prettier-config";

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig
};

export default config;
`,
    v3: `import baseConfig from "@harshalkatakiya/prettier-config";

        /**
         * @see https://prettier.io/docs/en/configuration.html
         * @type {import("prettier").Config}
         */
        const config = {
            ...baseConfig,
            plugins: ["prettier-plugin-tailwindcss"],
            tailwindConfig: "./tailwind.config.js",
            tailwindFunctions: ["cn"]
        };

        export default config;
`,
    v4: `import baseConfig from "@harshalkatakiya/prettier-config";

    /**
     * @see https://prettier.io/docs/en/configuration.html
     * @type {import("prettier").Config}
     */
    const config = {
        ...baseConfig,
        plugins: ["prettier-plugin-tailwindcss"],
        tailwindStylesheet: "./src/app/globals.css",
        tailwindFunctions: ["cn"]
    };

    export default config;
`
  },
  ts: {
    base: `import type { Config } from 'prettier';
    import baseConfig from "@harshalkatakiya/prettier-config";
    
    const config: Config = {
        ...baseConfig
    };
    
    export default config;
    `,
    v3: `import type { Config } from 'prettier';
    import baseConfig from "@harshalkatakiya/prettier-config";
    
    const config: Config = {
        ...baseConfig,
        plugins: ["prettier-plugin-tailwindcss"],
            tailwindConfig: "./tailwind.config.js",
            tailwindFunctions: ["cn"]
    };
    
    export default config;
    `,
    v4: `import type { Config } from 'prettier';
    import baseConfig from "@harshalkatakiya/prettier-config";
    
    const config: Config = {
        ...baseConfig,
        plugins: ["prettier-plugin-tailwindcss"],
        tailwindStylesheet: "./src/app/globals.css",
        tailwindFunctions: ["cn"]
    };
    
    export default config;
    `
  }
};
export default prettierConfigContents;
