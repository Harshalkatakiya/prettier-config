#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import getPackageManager from './utils/getPackageManager.js';
import installDependenciesCommand from './utils/installDependenciesCommand.js';

const prettierConfigContent = `import baseConfig from "@harshalkatakiya/prettier-config";

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.js",
  tailwindStylesheet: "./src/app/globals.css"
};

export default config;
`;
const prettierIgnoreData = ['node_modules', 'dist', 'build'];
const prettierScripts = {
  'prettier:check': 'prettier -c .',
  prettier: 'prettier -w -u .'
};

const installDependencies = async () => {
  const packageManager = await getPackageManager();
  const installCommand = installDependenciesCommand(packageManager, [
    'prettier',
    '@harshalkatakiya/prettier-config',
    'prettier-plugin-tailwindcss'
  ]);
  console.log('\n🔧 Installing dependencies...');
  try {
    execSync(installCommand, { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install dependencies: ', error.message);
    process.exit(1);
  }
};

const createPrettierConfigFile = () => {
  const prettierConfigPath = resolve(process.cwd(), 'prettier.config.js');
  if (!existsSync(prettierConfigPath)) {
    console.log('\n📄 Creating prettier.config.js file...');
    writeFileSync(prettierConfigPath, prettierConfigContent);
    console.log(
      '✅ prettier.config.js file created with Tailwind CSS configuration!'
    );
  } else {
    console.log(
      '\n⚠️  prettier.config.js file already exists. Skipping creation.'
    );
  }
};

const createPrettierIgnoreFile = () => {
  const prettierIgnorePath = resolve(process.cwd(), '.prettierignore');
  if (!existsSync(prettierIgnorePath)) {
    console.log('\n📄 Creating .prettierignore file...');
    writeFileSync(prettierIgnorePath, prettierIgnoreData.join('\n'));
    console.log('✅ .prettierignore file created with common ignores!');
  } else {
    console.log(
      '\n⚠️  .prettierignore file already exists. Skipping creation.'
    );
  }
};

const addScriptsToPackageJson = () => {
  const packageJsonPath = resolve(process.cwd(), 'package.json');
  if (!existsSync(packageJsonPath)) {
    console.error(
      '❌ package.json not found. Please ensure you are running this command in the root of a Node.js project.'
    );
    process.exit(1);
  }
  console.log('\n📄 Adding Prettier scripts to package.json...');
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    packageJson.scripts = {
      ...packageJson.scripts,
      ...prettierScripts
    };
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Prettier scripts added to package.json!');
  } catch (error) {
    console.error('❌ Failed to update package.json: ', error.message);
    process.exit(1);
  }
};

const main = async () => {
  console.log('\n✨ Setting up Prettier with Tailwind CSS configuration...');
  await installDependencies();
  createPrettierConfigFile();
  createPrettierIgnoreFile();
  addScriptsToPackageJson();
  console.log('\n🎉 Prettier setup complete! Happy coding!');
};

main().catch((error) => {
  console.error('❌ An unexpected error occurred: ', error.message);
  process.exit(1);
});
