import fs from 'fs';
import path from 'path';
import isTypeScriptProject from './isTypescriptProject.js';

export const tailwindConfigFileName = (projectPath: string): string =>
  isTypeScriptProject(projectPath) ? 'tailwind.config.ts' : (
    'tailwind.config.js'
  );

const detectTailwindVersion = (projectPath: string): number => {
  const configPath = path.join(
    projectPath,
    tailwindConfigFileName(projectPath)
  );
  return fs.existsSync(configPath) ? 3 : 4;
};

export default detectTailwindVersion;
