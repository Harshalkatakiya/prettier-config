#!/usr/bin/env node
import chalk from 'chalk';
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import inquirer from 'inquirer';
import path, { resolve } from 'path';
import detectTailwindVersion from './utils/detectTailwindVersion.js';
import getPackageManager from './utils/getPackageManager.js';
import installDependenciesCommand from './utils/installDependenciesCommand.js';
import isTypeScriptProject from './utils/isTypescriptProject.js';
import prettierConfigContents from './utils/prettierConfigContent.js';

export type TailwindConfigFileExtension = 'ts' | 'js';
export type ConfigKey = 'base' | 'v3' | 'v4';

interface PrettierConfigFileResult {
  tailwindCssVersion: number;
  langKey: TailwindConfigFileExtension;
}

const projectPath = process.cwd();

const prettierIgnoreData: string[] = ['node_modules', 'dist', 'build'];
const prettierScripts: Record<string, string> = {
  'prettier:check': 'prettier -c .',
  prettier: 'prettier -w -u .'
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
  const installCommand = installDependenciesCommand(
    packageManager,
    dependencies
  );
  console.log(
    chalk.cyan(`\n📦 Installing dependencies: ${dependencies.join(', ')}...`)
  );
  try {
    execSync(installCommand, { stdio: 'inherit' });
    console.log(chalk.green('✅ Dependencies installed successfully!'));
  } catch (error) {
    console.error(
      chalk.red('❌ Failed to install dependencies: '),
      (error as Error).message
    );
    process.exit(1);
  }
};

const createPrettierConfigFile = async (
  isTailwindEnabled: boolean
): Promise<PrettierConfigFileResult> => {
  const langKey: TailwindConfigFileExtension = isTypeScriptProject(projectPath) ? 'ts' : 'js';
  const configFilePath = path.join(projectPath, `prettier.config.${langKey}`);
  const tailwindCssVersion = detectTailwindVersion(projectPath);
  const configContent =
    prettierConfigContents[langKey][
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
        message: `${configFilePath} already exists. Do you want to replace it?`,
        default: false
      }
    ]);
    if (replace) {
      writeFileSync(configFilePath, configContent, 'utf-8');
      console.log(chalk.green(`Replaced ${configFilePath}`));
    } else {
      console.log(chalk.yellow(`Skipped replacing ${configFilePath}`));
    }
  } else {
    writeFileSync(configFilePath, configContent, 'utf-8');
    console.log(chalk.green(`Created ${configFilePath}`));
  }
  return { tailwindCssVersion, langKey };
};

const createPrettierIgnoreFile = async (): Promise<void> => {
  const prettierIgnorePath = resolve(projectPath, '.prettierignore');
  if (existsSync(prettierIgnorePath)) {
    const { replace } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'replace',
        message: `${prettierIgnorePath} already exists. Do you want to replace it?`,
        default: false
      }
    ]);
    if (replace) {
      writeFileSync(prettierIgnorePath, prettierIgnoreData.join('\n'));
      console.log(
        chalk.green('\n✅ Replaced .prettierignore with common patterns')
      );
    } else {
      console.log(chalk.yellow('\n⚠️  Skipped replacing .prettierignore'));
    }
  } else {
    writeFileSync(prettierIgnorePath, prettierIgnoreData.join('\n'));
    console.log(
      chalk.green('\n✅ Created .prettierignore with common patterns')
    );
  }
};

const addScriptsToPackageJson = (): void => {
  const packageJsonPath = resolve(projectPath, 'package.json');
  if (!existsSync(packageJsonPath)) {
    console.log(
      chalk.red('\n❌ package.json not found. Run this in your project root!')
    );
    process.exit(1);
  }
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    packageJson.scripts = {
      ...packageJson.scripts,
      ...prettierScripts
    };
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(chalk.green('\n✅ Added Prettier scripts to package.json:'));
    console.log(chalk.cyan('   prettier:check') + ' - Check formatting');
    console.log(chalk.cyan('   prettier') + '      - Format files');
  } catch (error) {
    console.error(
      chalk.red('\n❌ Failed to update package.json: '),
      (error as Error).message
    );
    process.exit(1);
  }
};

const main = async (): Promise<void> => {
  console.log(chalk.cyan('\n✨ Starting Prettier Configuration Setup ✨'));
  console.log(chalk.cyan('───────────────────────────────────────────\n'));
  const { isTailwindEnabled } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isTailwindEnabled',
      message: 'Configure Prettier for Tailwind CSS?',
      default: true
    }
  ]);
  await installDependencies(
    isTailwindEnabled ? ['prettier-plugin-tailwindcss'] : []
  );
  const { tailwindCssVersion, langKey } = await createPrettierConfigFile(isTailwindEnabled);
  await createPrettierIgnoreFile();
  addScriptsToPackageJson();
  console.log(chalk.green('\n🎉 Prettier setup complete!'));
  console.log(chalk.cyan('───────────────────────────────────────────'));
  console.log('Next steps:');
  if (isTailwindEnabled) {
    console.log(
      chalk.yellow(
        `📢 Update ${tailwindCssVersion === 3 ? 'TailwindCss Config FIle Path' : 'TailwindCSS main CSS File Path'} in prettier.config.${langKey}.`
      )
    );
  }
  console.log(
    `- Run ${chalk.cyan('npm run prettier:check')} to verify formatting`
  );
  console.log(`- Run ${chalk.cyan('npm run prettier')} to format your code`);
  console.log(chalk.cyan('───────────────────────────────────────────\n'));
};

main().catch((error: unknown) => {
  console.error(chalk.red('\n❌ Unexpected error: '), (error as Error).message);
  process.exit(1);
});
