#!/usr/bin/env node
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import getPackageManager from './utils/getPackageManager';
import installDependenciesCommand from './utils/installDependenciesCommand';

const prettierrcContent = JSON.stringify(
  {
    extends: ['@harshalkatakiya/prettier-config'],
    tailwindConfig: './tailwind.config.js',
    tailwindStylesheet: './src/app/globals.css'
  },
  null,
  2
);

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
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
};

const createPrettierRcFile = () => {
  const prettierRcPath = resolve(process.cwd(), '.prettierrc');
  if (!existsSync(prettierRcPath)) {
    console.log('\n📄 Creating .prettierrc file...');
    writeFileSync(prettierRcPath, prettierrcContent);
    console.log('✅ .prettierrc file created with Tailwind CSS configuration!');
  } else {
    console.log('\n⚠️  .prettierrc file already exists. Skipping creation.');
  }
};

const main = async () => {
  console.log('\n✨ Setting up Prettier with Tailwind CSS configuration...');
  await installDependencies();
  createPrettierRcFile();
  console.log('\n🎉 Prettier setup complete! Happy coding!');
};

main().catch((error) => {
  console.error('❌ An unexpected error occurred:', error.message);
  process.exit(1);
});
