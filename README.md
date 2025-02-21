# 🎨 @harshalkatakiya/prettier-config

**A shareable Prettier configuration by Harshal Katakiya, with built-in support for Tailwind CSS and a simple CLI setup command to quickly integrate Prettier into your projects.**

![Prettier](https://img.shields.io/badge/Prettier-2F1A3E?style=for-the-badge&logo=prettier&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)  
![NPM](https://img.shields.io/npm/v/@harshalkatakiya/prettier-config?color=red&logo=npm&style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

---

## 📑 Table of Contents

- [📖 Introduction](#-introduction)
- [🌟 Features](#-features)
- [🚀 Installation & Usage](#-installation--usage)
  - [⚡ Automatic CLI Setup](#-automatic-cli-setup)
  - [🔧 Manual Setup](#-manual-setup)
- [📜 Scripts](#-scripts)
- [⚙️ Configuration Options](#️-configuration-options)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## 📖 Introduction

`@harshalkatakiya/prettier-config` is a **shareable Prettier configuration** designed to provide consistent code formatting across projects.

✅ **Opinionated rules** for clean, readable, and maintainable code.  
🌀 **Built-in Tailwind CSS support** via `prettier-plugin-tailwindcss`.  
⚡ **Easy CLI setup** – installs dependencies, creates configs, and updates `package.json`.  
🔄 **Auto-detects TypeScript & JavaScript projects** and generates the right config file.  
📜 **Prettier scripts** for easy formatting and validation.

Whether you’re starting a new project or integrating Prettier into an existing one, this package streamlines your setup process.

---

## 🌟 Features

✔ **Pre-configured Prettier Rules** – Opinionated defaults for better readability.  
🎨 **Tailwind CSS Support** – Formats Tailwind classes with `prettier-plugin-tailwindcss`.  
⚡ **Automatic Setup** – One command sets up everything in seconds.  
📂 **Project Type Detection** – Generates `prettier.config.ts` (TypeScript) or `prettier.config.js` (JavaScript).  
🛠 **Customizable** – Extend or override the base configuration.  
🚀 **Modern & Up-to-Date** – Works with the latest Prettier and Tailwind CSS versions.

---

## 🚀 Installation & Usage

### ⚡ Automatic CLI Setup

The simplest way to set up Prettier with this configuration is to use the CLI command. Run the following in your project root:

```bash
npx @harshalkatakiya/prettier-config add
```

✅ **Prompts for Tailwind CSS support** and applies the appropriate configuration.  
🔄 **Installs dependencies** (`prettier`, `@harshalkatakiya/prettier-config`, and `prettier-plugin-tailwindcss` if needed).  
📂 **Generates configuration files** (`prettier.config.js` or `.ts` and `.prettierignore`).  
📜 **Updates `package.json` scripts** to include `prettier` commands.

> **After setup:**  
> Check your generated `prettier.config.js` or `prettier.config.ts`. Update paths if needed.

### 🔧 Manual Setup

If you prefer manual installation, follow these steps:

#### 1️⃣ Install Dependencies

```bash
npm install --save-dev prettier @harshalkatakiya/prettier-config prettier-plugin-tailwindcss
```

#### 2️⃣ Create Configuration File

- **Without Tailwind CSS:**

  ```js
  import baseConfig from '@harshalkatakiya/prettier-config';

  export default { ...baseConfig };
  ```

- **With Tailwind CSS (v3)**:

  ```js
  import baseConfig from '@harshalkatakiya/prettier-config';

  export default {
    ...baseConfig,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindConfig: './tailwind.config.js',
    tailwindFunctions: ['cn']
  };
  ```

- **With Tailwind CSS (v4)**:

  ```js
  import baseConfig from '@harshalkatakiya/prettier-config';

  export default {
    ...baseConfig,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/app/globals.css', // update this path yo your main CSS file
    tailwindFunctions: ['cn']
  };
  ```

#### 3️⃣ Create a `.prettierignore` File

```text
node_modules
dist
build
```

#### 4️⃣ Update `package.json` Scripts

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

The following scripts are added to your `package.json`:

| Command                  | Description                       |
| ------------------------ | --------------------------------- |
| `npm run prettier`       | Formats all files in the project. |
| `npm run prettier:check` | Checks for unformatted code.      |

---

## ⚙️ Configuration Options

This package comes with the following Prettier rules pre-configured:

| Option                       | Value       | Description                                                 |
| ---------------------------- | ----------- | ----------------------------------------------------------- |
| `experimentalTernaries`      | `true`      | Enables experimental ternary formatting.                    |
| `printWidth`                 | `80`        | The maximum line width.                                     |
| `tabWidth`                   | `2`         | Number of spaces per indentation level.                     |
| `useTabs`                    | `false`     | Use spaces for indentation.                                 |
| `semi`                       | `true`      | Add semicolons at the end of statements.                    |
| `singleQuote`                | `true`      | Use single quotes instead of double quotes.                 |
| `quoteProps`                 | `as-needed` | Quote object properties only when required.                 |
| `jsxSingleQuote`             | `true`      | Use single quotes in JSX.                                   |
| `trailingComma`              | `none`      | Do not add trailing commas.                                 |
| `bracketSpacing`             | `true`      | Add spaces between brackets in object literals.             |
| `bracketSameLine`            | `true`      | Keep the closing bracket of a JSX element on the same line. |
| `arrowParens`                | `always`    | Always include parentheses in arrow functions.              |
| `singleAttributePerLine`     | `false`     | Allow multiple attributes on a single line.                 |
| `embeddedLanguageFormatting` | `auto`      | Automatically format embedded languages.                    |

**Tailwind-specific settings (if enabled):**

- **Tailwind CSS v3:**

  ```js
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["cn"]
  ```

- **Tailwind CSS v4:**

  ```js
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css", // update this path yo your main CSS file
  tailwindFunctions: ["cn"]
  ```

---

## 🤝 Contributing

💡 **Want to contribute?** Open an issue or submit a PR on the [GitHub repository](https://github.com/Harshalkatakiya/prettier-config/issues).

### How to Contribute

1️⃣ **Fork** the repository.  
2️⃣ **Create a new branch** for your feature or fix.  
3️⃣ **Commit your changes** with a descriptive message.  
4️⃣ **Open a pull request** and describe your changes.

---

## 📄 License

This package is licensed under the **[MIT License](LICENSE)**.

---

## 👤 Author

### **Harshal Katakiya**

- **GitHub:** [@Harshalkatakiya](https://github.com/Harshalkatakiya)
- **Email:** [katakiyaharshl001@gmail.com](mailto:katakiyaharshl001@gmail.com)
- **NPM:** [@harshalkatakiya](https://www.npmjs.com/~harshalkatakiya)

---

🌟 Enjoy clean and consistent code with `@harshalkatakiya/prettier-config`! 😊
