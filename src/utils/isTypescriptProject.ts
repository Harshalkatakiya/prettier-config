import fs from 'fs';
import path from 'path';

const isTypeScriptProject = (projectPath: string): boolean => {
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  try {
    const { dependencies = {}, devDependencies = {} } = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf-8')
    );
    return 'typescript' in dependencies || 'typescript' in devDependencies;
  } catch (error) {
    console.error('Error reading package.json: ', error);
    return false;
  }
};

export default isTypeScriptProject;
