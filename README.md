# @harshalkatakiya/prettier-config

**A shareable Prettier configuration by Harshal Katakiya, with built-in support for Tailwind CSS and a simple CLI setup command for your projects.**

---

## 📑 Table of Contents

- [📖 Introduction](#-introduction)
- [🌟 Features](#-features)
- [🚀 Usage](#-usage)
  - [1️⃣ Use the CLI for Setup](#1️⃣-use-the-cli-for-setup)
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
- **Seamless Tailwind CSS support** using `prettier-plugin-tailwindcss`.
- An easy-to-use **CLI command** for quick project setup.

Whether you're starting a new project or adding Prettier to an existing one, this package makes your workflow faster and more efficient.

---

## 🌟 Features

- ✅ **Prettier Configuration**: Pre-configured for JavaScript and TypeScript projects.
- 🌀 **Tailwind CSS Support**: Comes with `prettier-plugin-tailwindcss` for better Tailwind class formatting.
- ⚡ **Easy CLI Setup**: One command to integrate this configuration into your project.
- 🔧 **Customizable**: Extend or override the default configuration as needed.
- 🚀 **Ready-to-Use Scripts**: Format or validate your code instantly.
- 🛠️ **Modern Config**: Compatible with the latest Prettier features and syntax.
- 🛡️ **Strict Formatting Rules**: Enforces clear and consistent code style across your team.
- 🖥️ **Pre-configured Scripts**: Adds formatting and validation scripts to your `package.json`.

---

## 🚀 Usage

### 1️⃣ Use the CLI for automatic Setup

Run the following command to automatically configure your project:

```bash
npx @harshalkatakiya/prettier-config add
```

This will:

- Install required dev-dependencies in your project.
- Create a `.prettierrc` file extending this configuration.
- Add common ignores to `.prettierignore`.
- Add Prettier scripts to your `package.json`.

### 2️⃣ Manual Setup (Optional)

Install the Packages using the following command:

```bash
npm i -D prettier @harshalkatakiya/prettier-config prettier-plugin-tailwindcss
```

Create a .prettierrc file in your project root and add the following json to your .prettierrc file:

```json
{
  "extends": ["@harshalkatakiya/prettier-config"],
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindConfig": "./tailwind.config.js",
  "tailwindStylesheet": "./src/app/globals.css"
}
```

Create a .prettierignore file in your project root and add the following json to your .prettierignore file:

```text
node_modules
dist
build
```

Add Prettier scripts to your `package.json` in scripts section:

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

### Available Scripts

**These scripts are automatically added to your package.json during CLI setup.**

- **Format your code:**

  ```bash
  npm run prettier
  ```

  This will apply the Prettier formatting rules to your project files.

- **Check for unformatted code:**

  ```bash
  npm run prettier:check
  ```

  Validates if the files follow the configured Prettier rules.

---

## ⚙️ Configuration Options

This package comes with the following Prettier rules pre-configured:

| Option                       | Value         | Description                                                 |
| ---------------------------- | ------------- | ----------------------------------------------------------- |
| `printWidth`                 | `80`          | The maximum line width.                                     |
| `tabWidth`                   | `2`           | Number of spaces per indentation level.                     |
| `useTabs`                    | `false`       | Use spaces for indentation.                                 |
| `semi`                       | `true`        | Add semicolons at the end of statements.                    |
| `singleQuote`                | `true`        | Use single quotes instead of double quotes.                 |
| `quoteProps`                 | `'as-needed'` | Change quotes only when required.                           |
| `jsxSingleQuote`             | `true`        | Use single quotes in JSX.                                   |
| `trailingComma`              | `'none'`      | Avoid trailing commas.                                      |
| `bracketSpacing`             | `true`        | Add spaces between brackets in object literals.             |
| `bracketSameLine`            | `true`        | Keep the closing bracket of a JSX element on the same line. |
| `arrowParens`                | `'always'`    | Always include parentheses in arrow functions.              |
| `singleAttributePerLine`     | `false`       | Allow multiple attributes on a single line.                 |
| `embeddedLanguageFormatting` | `'auto'`      | Format embedded languages automatically.                    |

---

## 🤝 Contributing

Contributions are welcome! If you encounter any bugs or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/Harshalkatakiya/prettier-config/issues).

### How to Contribute

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with a clear message.
4. Open a pull request and describe your changes in detail.

---

## 📄 License

This package is licensed under the [MIT License](LICENSE).

---

## 👤 Author

### Harshal Katakiya

- GitHub: [@Harshalkatakiya](https://github.com/Harshalkatakiya)
- Email: [katakiyaharshl001@gmail.com](mailto:katakiyaharshl001@gmail.com)
- NPM: [@harshalkatakiya](https://www.npmjs.com/package/@harshalkatakiya)

---

🌟 Enjoy clean and consistent code with `@harshalkatakiya/prettier-config`! 😊
