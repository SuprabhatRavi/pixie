const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the build process exits on error
process.on('unhandledRejection', error => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

try {
  // First, run the build:wasm script from package.json
  console.log('Running build:wasm script...');
  execSync('npm run build:wasm', { stdio: 'inherit' });

  // Then run Angular build
  console.log('Building Angular application...');
  execSync('ng build', { stdio: 'inherit' });

  // Ensure WASM files are in the dist folder
  const distDir = path.join('dist', 'pixie', 'assets', 'wasm');
  const srcWasmDir = path.join('src', 'assets', 'wasm');
  
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Copy WASM files from src/assets/wasm to dist/pixie/assets/wasm
  if (fs.existsSync(srcWasmDir)) {
    fs.readdirSync(srcWasmDir).forEach(file => {
      fs.copyFileSync(
        path.join(srcWasmDir, file),
        path.join(distDir, file)
      );
    });
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}