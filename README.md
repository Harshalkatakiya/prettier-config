# @harshalkatakiya/prettier-config

**A shareable Prettier configuration by Harshal Katakiya, with built-in support for Tailwind CSS and a simple CLI setup command to quickly integrate Prettier into your projects.**

---

## 📑 Table of Contents

- [📖 Introduction](#-introduction)
- [🌟 Features](#-features)
- [🚀 Usage](#-usage)
  - [1️⃣ Automatic CLI Setup](#1️⃣-automatic-cli-setup)
  - [2️⃣ Manual Setup (Optional)](#2️⃣-manual-setup-optional)
- [📜 Scripts](#-scripts)
- [⚙️ Configuration Options](#️-configuration-options)
- [🤝 Contributing](#-contributing)
  - [How to Contribute](#how-to-contribute)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## 📖 Introduction

`@harshalkatakiya/prettier-config` is a sharable Prettier configuration designed to simplify consistent code formatting across projects. It provides:

- **Opinionated rules** for clean, readable, and maintainable code.
- **Built-in Tailwind CSS support** via `prettier-plugin-tailwindcss`.
- A **CLI tool** that automatically:
  - Installs necessary dependencies.
  - Creates a configuration file tailored to your project’s language (JavaScript or TypeScript).
  - Generates a `.prettierignore` file with common ignore patterns.
  - Updates your `package.json` with useful Prettier scripts.

Whether you’re starting a new project or integrating Prettier into an existing one, this package streamlines your setup process.

---

## 🌟 Features

- ✅ **Pre-configured Prettier Rules**: Consistent code style with a robust base configuration.
- 🌀 **Tailwind CSS Support**: Comes with `prettier-plugin-tailwindcss` for better Tailwind class formatting.
- ⚡ **Automatic CLI Setup**: One command installs dependencies, creates config files, and updates your project.
- 🔄 **TypeScript & JavaScript Compatibility**: Detects your project type and generates a `prettier.config.ts` for TypeScript projects or a `prettier.config.js` for JavaScript projects.
- 🔧 **Customizable**: Extend or override the default configuration as needed.
- 🛠️ **Modern Config**: Compatible with the latest Prettier features and syntax.
- 🚀 **Ready-to-Use Scripts**: Adds formatting and validation scripts to your `package.json`.

---

## 🚀 Usage

### 1️⃣ Automatic CLI Setup

The simplest way to set up Prettier with this configuration is to use the CLI command. Run the following in your project root:

```bash
npx @harshalkatakiya/prettier-config add
```

This command will:

- **Prompt for Tailwind CSS support:**  
  You’ll be asked whether to configure Prettier for Tailwind CSS (default is _yes_).  
  - If enabled, it detects your Tailwind setup and applies one of two configurations:
    - **Tailwind CSS v3:** If a `tailwind.config.js` (or `.ts` for TypeScript projects) exists.
    - **Tailwind CSS v4:** If no Tailwind config file is found (defaulting to a setup that uses your main stylesheet).
- **Install Dependencies:**  
  Installs `prettier`, `@harshalkatakiya/prettier-config`, and if Tailwind is enabled, also installs `prettier-plugin-tailwindcss`.
- **Generate Configuration Files:**  
  - Creates a `prettier.config.js` or `prettier.config.ts` (depending on your project) that extends the base configuration.
  - Generates a `.prettierignore` file containing common patterns (`node_modules`, `dist`, `build`).
- **Update `package.json`:**  
  Adds the following scripts:
  - `prettier:check` – to verify that your code adheres to the formatting rules.
  - `prettier` – to automatically format your code.

After setup, review the generated `prettier.config.js` or `prettier.config.ts` file. If you enabled Tailwind CSS support, you might need to update the file path for your Tailwind configuration (v3) or your main Tailwind stylesheet (Main CSS File) (v4) as indicated in the comments.

### 2️⃣ Manual Setup (Optional)

If you prefer to set up Prettier manually, follow these steps:

1. **Install Dependencies:**

   ```bash
   npm install --save-dev prettier @harshalkatakiya/prettier-config prettier-plugin-tailwindcss
   ```

2. **Create the Configuration File:**

   Create a file named `prettier.config.js` (or `prettier.config.ts` for TypeScript projects) in your project root with the following content:

   - `prettier.config.js` (Without Tailwind CSS):
  
      ```js
      /**
      * @see https://prettier.io/docs/en/configuration.html
      * @type {import("prettier").Config}
      */
      import baseConfig from '@harshalkatakiya/prettier-config';

      const config = {
        ...baseConfig
      };

      export default config;
      ```

   - `prettier.config.js` (Tailwind CSS `v3`):

      ```js
      /**
      * @see https://prettier.io/docs/en/configuration.html
      * @type {import("prettier").Config}
      */
      import baseConfig from '@harshalkatakiya/prettier-config';

      const config = {
        ...baseConfig,
        plugins: ['prettier-plugin-tailwindcss'],
        tailwindConfig: './tailwind.config.js',
        tailwindFunctions: ['cn']
      };

      export default config;
      ```

   - `prettier.config.js` (Tailwind CSS `v4`):
  
      ```js
      /**
      * @see https://prettier.io/docs/en/configuration.html
      * @type {import("prettier").Config}
      */
      import baseConfig from '@harshalkatakiya/prettier-config';

      const config = {
        ...baseConfig,
        plugins: ['prettier-plugin-tailwindcss'],
        tailwindStylesheet: "./src/app/globals.css", // update this path according to your main CSS file
        tailwindFunctions: ['cn']
      };

      export default config;
      ```

3. **Create a Prettier Ignore File:**

   Create a `.prettierignore` file in your project root with the following content:

   ```text
   node_modules
   dist
   build
   ```

4. **Update `package.json` Scripts:**

   Add the following scripts to the `"scripts"` section of your `package.json`:

   ```json
   {
     "scripts": {
       "prettier:check": "prettier -c .",
       "prettier": "prettier -w -u ."
     }
   }
   ```

---

## 📜 Scripts

When using the CLI setup, the following scripts are automatically added to your `package.json`:

- **Format Your Code:**

  ```bash
  npm run prettier
  ```

- **Check for Unformatted Code:**

  ```bash
  npm run prettier:check
  ```

These scripts help you quickly validate and apply Prettier formatting across your project.

---

## ⚙️ Configuration Options

This package comes with the following Prettier rules pre-configured:

| Option                       | Value         | Description                                                 |
| ---------------------------- | ------------- | ----------------------------------------------------------- |
| `experimentalTernaries`      | `true`        | Enables experimental ternary formatting.                  |
| `printWidth`                 | `80`          | The maximum line width.                                     |
| `tabWidth`                   | `2`           | Number of spaces per indentation level.                     |
| `useTabs`                    | `false`       | Use spaces for indentation.                                 |
| `semi`                       | `true`        | Add semicolons at the end of statements.                    |
| `singleQuote`                | `true`        | Use single quotes instead of double quotes.                 |
| `quoteProps`                 | `as-needed`   | Quote object properties only when required.               |
| `jsxSingleQuote`             | `true`        | Use single quotes in JSX.                                   |
| `trailingComma`              | `none`        | Do not add trailing commas.                                 |
| `bracketSpacing`             | `true`        | Add spaces between brackets in object literals.             |
| `bracketSameLine`            | `true`        | Keep the closing bracket of a JSX element on the same line. |
| `arrowParens`                | `always`      | Always include parentheses in arrow functions.              |
| `singleAttributePerLine`     | `false`       | Allow multiple attributes on a single line.                 |
| `embeddedLanguageFormatting` | `auto`        | Automatically format embedded languages.                    |

Additionally, if Tailwind CSS support is enabled, extra options are injected:

- **For Tailwind CSS v3:**
  - `plugins: ["prettier-plugin-tailwindcss"]`
  - `tailwindConfig: "./tailwind.config.js"`
  - `tailwindFunctions: ["cn"]`

- **For Tailwind CSS v4:**
  - `plugins: ["prettier-plugin-tailwindcss"]`
  - `tailwindStylesheet: "./src/app/globals.css"` (update this path according to your main CSS file)
  - `tailwindFunctions: ["cn"]`

**Note:** The CLI tool automatically detects your project type (TypeScript or JavaScript) and whether a Tailwind configuration file exists, then applies the corresponding setup.

---

## 🤝 Contributing

Contributions are welcome! If you find bugs or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/Harshalkatakiya/prettier-config/issues).

### How to Contribute

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with a clear message.
4. Open a pull request and detail your changes.

---

## 📄 License

This package is licensed under the [MIT License](LICENSE).

---

## 👤 Author

### Harshal Katakiya

- GitHub: [@Harshalkatakiya](https://github.com/Harshalkatakiya)
- Email: [katakiyaharshl001@gmail.com](mailto:katakiyaharshl001@gmail.com)
- NPM: [@harshalkatakiya](https://www.npmjs.com/~harshalkatakiya)

---

🌟 Enjoy clean and consistent code with `@harshalkatakiya/prettier-config`! 😊
