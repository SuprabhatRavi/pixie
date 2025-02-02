const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function logSection(message) {
  console.log('\n-----------------------------------');
  console.log(message);
  console.log('-----------------------------------\n');
}

function executeCommand(command, message) {
  logSection(message);
  console.log(`Executing: ${command}`);
  try {
    // Add cargo and local bin to PATH
    const env = {
      ...process.env,
      PATH: `${process.env.PATH}:${process.env.HOME}/.cargo/bin:${process.env.HOME}/.local/bin`,
      RUST_BACKTRACE: '1'
    };
    execSync(command, { stdio: 'inherit', env });
    console.log(`✅ ${message} completed successfully`);
  } catch (error) {
    console.error(`❌ ${message} failed:`, error);
    throw error;
  }
}

try {
  // Log PATH and verify installations
  logSection('Environment Check');
  console.log('PATH:', process.env.PATH);
  executeCommand('which wasm-pack', 'Check wasm-pack location');
  executeCommand('wasm-pack --version', 'Check wasm-pack version');
  executeCommand('rustc --version', 'Check rust version');

  // Rest of your build script remains the same...
  logSection('Current directory contents');
  console.log('Current directory:', process.cwd());
  console.log('Directory contents:', fs.readdirSync('.'));

  executeCommand('wasm-pack build --target web ./wasm --verbose', 'WASM Build');

  if (fs.existsSync('./wasm/pkg')) {
    logSection('WASM pkg directory contents');
    console.log('wasm/pkg contents:', fs.readdirSync('./wasm/pkg'));
  } else {
    console.warn('⚠️ wasm/pkg directory not found after build');
  }

  executeCommand('node scripts/copy-wasm-prod.js', 'Copy WASM files');

  if (fs.existsSync('./src/assets/wasm')) {
    logSection('src/assets/wasm directory contents');
    console.log('Contents:', fs.readdirSync('./src/assets/wasm'));
  } else {
    console.warn('⚠️ src/assets/wasm directory not found after copy');
  }

  executeCommand('ng build --verbose', 'Angular Build');

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