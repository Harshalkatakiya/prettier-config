const installDependenciesCommand = (
  packageManager: string,
  dependencies: Array<string>
): string => {
  switch (packageManager) {
    case 'npm':
      return `npm install --save-dev ${dependencies.join(' ')}`;
    case 'pnpm':
      return `pnpm add -D ${dependencies.join(' ')}`;
    case 'bun':
      return `bun add -D ${dependencies.join(' ')}`;
    default:
      return `npm install --save-dev ${dependencies.join(' ')}`;
  }
};
export default installDependenciesCommand;
