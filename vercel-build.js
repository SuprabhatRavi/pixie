const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the build process exits on error
process.on('unhandledRejection', error => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

try {
  // Build WASM
  console.log('Building WASM...');
  execSync('wasm-pack build --target web ./wasm', { stdio: 'inherit' });

  // Create assets directory if it doesn't exist
  const assetsDir = path.join('src', 'assets', 'wasm');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Copy WASM files to assets
  console.log('Copying WASM files to assets...');
  const wasmPkgDir = path.join('wasm', 'pkg');
  fs.readdirSync(wasmPkgDir).forEach(file => {
    fs.copyFileSync(
      path.join(wasmPkgDir, file),
      path.join(assetsDir, file)
    );
  });

  // Run Angular build
  console.log('Building Angular application...');
  execSync('ng build', { stdio: 'inherit' });

  // Copy WASM files to distribution
  const distDir = path.join('dist', 'pixie', 'assets', 'wasm');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  fs.readdirSync(assetsDir).forEach(file => {
    fs.copyFileSync(
      path.join(assetsDir, file),
      path.join(distDir, file)
    );
  });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}