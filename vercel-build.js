const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("=== Vercel Build Script STARTING ===");

function logSection(message) {
  console.log('\n-----------------------------------');
  console.log(message);
  console.log('-----------------------------------\n');
}

function executeCommand(command, message) {
  logSection(message);
  console.log(`Executing: ${command}`);
  try {
    execSync(command, { stdio: 'inherit', env: { ...process.env, RUST_BACKTRACE: '1' } });
    console.log(`✅ ${message} completed successfully`);
  } catch (error) {
    console.error(`❌ ${message} failed:`, error);
    throw error;
  }
}

try {
  // Log current directory and list files
  logSection('Current directory contents');
  console.log('Current directory:', process.cwd());
  console.log('Directory contents:', fs.readdirSync('.'));

  // Build WASM with verbose logging
  executeCommand('wasm-pack build --target web ./wasm --verbose', 'WASM Build');

  // List wasm/pkg contents
  if (fs.existsSync('./wasm/pkg')) {
    logSection('WASM pkg directory contents');
    console.log('wasm/pkg contents:', fs.readdirSync('./wasm/pkg'));
  } else {
    console.warn('⚠️ wasm/pkg directory not found after build');
  }

  // Copy WASM files
  executeCommand('node scripts/copy-wasm-prod.js', 'Copy WASM files');

  // Verify src/assets/wasm contents
  if (fs.existsSync('./src/assets/wasm')) {
    logSection('src/assets/wasm directory contents');
    console.log('Contents:', fs.readdirSync('./src/assets/wasm'));
  } else {
    console.warn('⚠️ src/assets/wasm directory not found after copy');
  }

  // Build Angular
  executeCommand('ng build --verbose', 'Angular Build');

  // Verify final dist directory
  if (fs.existsSync('./dist/pixie/assets/wasm')) {
    logSection('Final dist/pixie/assets/wasm contents');
    console.log('Contents:', fs.readdirSync('./dist/pixie/assets/wasm'));
  } else {
    console.warn('⚠️ dist/pixie/assets/wasm directory not found in final build');
  }

  logSection('Build completed successfully! 🎉');
} catch (error) {
  logSection('Build failed! ❌');
  console.error(error);
  process.exit(1);
}