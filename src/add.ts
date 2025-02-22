#!/usr/bin/env node
import chalk from 'chalk';
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import inquirer from 'inquirer';
import path, { resolve } from 'path';
import detectTailwindVersion from './utils/detectTailwindVersion.js';
import getPackageManager from './utils/getPackageManager.js';
import installDependenciesCommand from './utils/installDependenciesCommand.js';
import prettierConfigContents from './utils/prettierConfigContent.js';

export type TailwindConfigFileExtension = 'ts' | 'js';
export type ConfigKey = 'base' | 'v3' | 'v4';

interface PrettierConfigFileResult {
  tailwindCssVersion: number;
}

const projectPath = process.cwd();
const prettierIgnoreData: string[] = ['node_modules', 'dist', 'build'];
const prettierScripts: Record<string, string> = {
  'prettier:check': 'prettier -c .',
  prettier: 'prettier -w -u .'
};

const printLine = () =>
  console.log(chalk.cyan('────────────────────────────────────────────'));

const printBanner = () => {
  console.clear();
  console.log(
    chalk.bgBlue.white.bold('  PRETTIER CONFIGURATION SETUP  ')
  );
  printLine();
};

const installDependencies = async (
  additionalDependencies: string[] = []
): Promise<void> => {
  const packageManager = await getPackageManager();
  const dependencies = [
    'prettier',
    '@harshalkatakiya/prettier-config',
    ...additionalDependencies
  ];
  const installCommand = installDependenciesCommand(packageManager, dependencies);
  try {
    console.log(chalk.blueBright('\nInstalling dependencies...'));
    execSync(installCommand, { stdio: 'inherit' });
    console.log(chalk.green.bold('\n✅ Dependencies installed successfully!\n'));
  } catch (error) {
    console.error(
      chalk.red.bold('\n❌ Failed to install dependencies:'),
      (error as Error).message
    );
    process.exit(1);
  }
};

const createPrettierConfigFile = async (
  isTailwindEnabled: boolean
): Promise<PrettierConfigFileResult> => {
  // const langKey: TailwindConfigFileExtension = isTypeScriptProject(projectPath) ? 'ts' : 'js';
  const configFilePath = path.join(projectPath, `prettier.config.js`);
  const tailwindCssVersion = detectTailwindVersion(projectPath);
  const configContent =
    prettierConfigContents['js'][
    isTailwindEnabled
      ? tailwindCssVersion === 3
        ? 'v3'
        : 'v4'
      : 'base'
    ];
  if (existsSync(configFilePath)) {
    const { replace } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'replace',
        message: chalk.yellow(`${configFilePath} already exists. Replace it?`),
        default: false
      }
    ]);
    if (replace) {
      writeFileSync(configFilePath, configContent, 'utf-8');
      console.log(chalk.green.bold(`\n✅ Replaced prettier.config.js\n`));
    } else {
      console.log(chalk.yellow(`\n⚠️  Skipped replacing prettier.config.js\n`));
    }
  } else {
    writeFileSync(configFilePath, configContent, 'utf-8');
    console.log(chalk.green.bold(`\n✅ Created prettier.config.js\n`));
  }
  return { tailwindCssVersion };
};

const createPrettierIgnoreFile = async (): Promise<void> => {
  const prettierIgnorePath = resolve(projectPath, '.prettierignore');
  if (existsSync(prettierIgnorePath)) {
    const { replace } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'replace',
        message: chalk.yellow(`${prettierIgnorePath} already exists. Replace it?`),
        default: false
      }
    ]);
    if (replace) {
      writeFileSync(prettierIgnorePath, prettierIgnoreData.join('\n'));
      console.log(chalk.green.bold('\n✅ Replaced .prettierignore with common patterns'));
    } else {
      console.log(chalk.yellow('\n⚠️  Skipped replacing .prettierignore'));
    }
  } else {
    writeFileSync(prettierIgnorePath, prettierIgnoreData.join('\n'));
    console.log(chalk.green.bold('\n✅ Created .prettierignore with common patterns'));
  }
};

const addScriptsToPackageJson = (): void => {
  const packageJsonPath = resolve(projectPath, 'package.json');
  if (!existsSync(packageJsonPath)) {
    console.error(chalk.red.bold('\n❌ package.json not found. Run this in your project root!'));
    process.exit(1);
  }
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    packageJson.scripts = {
      ...packageJson.scripts,
      ...prettierScripts
    };
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(chalk.green.bold('\n✅ Added Prettier scripts to package.json:'));
    console.log(chalk.cyan('   prettier:check') + ' - Check formatting');
    console.log(chalk.cyan('   prettier') + '      - Format files');
  } catch (error) {
    console.error(
      chalk.red.bold('\n❌ Failed to update package.json:'),
      (error as Error).message
    );
    process.exit(1);
  }
};

const main = async (): Promise<void> => {
  printBanner();
  const { isTailwindEnabled } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isTailwindEnabled',
      message: chalk.bold('Configure Prettier for Tailwind CSS?'),
      default: true
    }
  ]);
  await installDependencies(isTailwindEnabled ? ['prettier-plugin-tailwindcss'] : []);
  const { tailwindCssVersion } = await createPrettierConfigFile(isTailwindEnabled);
  await createPrettierIgnoreFile();
  addScriptsToPackageJson();
  printLine();
  console.log(chalk.green.bold('\n🎉 Prettier setup complete!'));
  printLine();
  console.log(chalk.bold('\nNext steps:'));
  if (isTailwindEnabled && tailwindCssVersion === 4) {
    console.log(
      chalk.yellow(`📢 Update main CSS File Path in prettier.config.js.`)
    );
  }
  console.log(`- Run ${chalk.cyan('npm run prettier:check')} to verify formatting`);
  console.log(`- Run ${chalk.cyan('npm run prettier')} to format your code`);
  printLine();
};

main().catch((error: unknown) => {
  console.error(chalk.red.bold('\n❌ Unexpected error:'), (error as Error).message);
  process.exit(1);
});
