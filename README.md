# @harshalkatakiya/prettier-config

**A shareable and opinionated Prettier configuration by Harshal Katakiya.**

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration Options](#configuration-options)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

`@harshalkatakiya/prettier-config` is a shareable Prettier configuration designed to simplify consistent code formatting across your projects. This configuration comes with opinionated rules that enforce clean, readable, and maintainable code while staying flexible for modern development workflows.

---

## Features

- **Strict Formatting Rules:** Enforces clear and consistent code style across projects.
- **Customizable:** You can extend or override the configuration as needed.
- **Pre-configured Scripts:** Ready-to-use scripts for formatting and validating code.
- **Modern Config:** Supports the latest Prettier features and syntax.

---

## Installation

To install this Prettier configuration package, run the following command:

```bash
npm install -D -E prettier @harshalkatakiya/prettier-config@latest
```

---

## Usage

1. Add the following feilds in your `package.json` to use this configuration:

   ```json
   {
     "scripts": {
       "prettier:check": "prettier -c .",
       "prettier": "prettier -w -u ."
     },
     "prettier": "@harshalkatakiya/prettier-config"
   }
   ```

2. Alternatively, create a `.prettierrc` file in your project root with the following content:

   ```json
   "@harshalkatakiya/prettier-config"
   ```

3. You can now use Prettier with this configuration by running the provided scripts (see [Scripts](#scripts)).

---

## Configuration Options

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

## Scripts

The following npm scripts are included for convenience:

- **Format your code:**

  ```bash
  npm run prettier
  ```

  This will apply the Prettier formatting rules to your project files.

- **Check for unformatted code:**

  ```bash
  npm run prettier:check
  ```

  This will validate whether the files follow the specified Prettier configuration.

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/Harshalkatakiya/prettier-config/issues) for any open tickets or to report problems.

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

---

## License

This package is licensed under the [MIT License](LICENSE).

---

## Author

**Harshal Katakiya**

- GitHub: [@Harshalkatakiya](https://github.com/Harshalkatakiya)
- Email: [katakiyaharshl001@gmail.com](mailto:katakiyaharshl001@gmail.com)
- NPM: [@harshalkatakiya](https://www.npmjs.com/package/@harshalkatakiya)

---

Enjoy clean and consistent code with `@harshalkatakiya/prettier-config`! 😊
