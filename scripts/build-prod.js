// Custom build script for production
const { execSync } = require('child_process');

console.log('Cleaning previous build...');
execSync('rm -rf dist', { stdio: 'inherit' });

console.log('Running production build...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build complete. Output in ./dist');
