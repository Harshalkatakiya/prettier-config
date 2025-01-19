import { execSync } from 'child_process';

const getPackageManager = async () => {
  const packageManagers = [
    { name: 'bun', command: 'bun -v' },
    { name: 'pnpm', command: 'pnpm -v' },
    { name: 'npm', command: 'npm -v' }
  ];
  for (const { name, command } of packageManagers) {
    execSync(command, { stdio: 'ignore' });
    return name;
  }
  return 'npm';
};

export default getPackageManager;
