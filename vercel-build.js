const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function logSection(message) {
  console.log('\n-----------------------------------');
  console.log(message);
  console.log('-----------------------------------\n');
}

function executeCommand(command, message) {
  if (message) logSection(message);
  console.log(`Executing: ${command}`);
  try {
    process.env.HOME = '/root';
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${message || command} completed successfully`);
  } catch (error) {
    console.error(`❌ ${message || command} failed:`, error);
    throw error;
  }
}

try {
    logSection('Install Rust');
    executeCommand('curl -sSf https://sh.rustup.rs | sh -s -- -y');
    
    logSection('Setup Rust environment');
    // Explicitly set PATH to include cargo
    process.env.PATH = `${process.env.HOME}/.cargo/bin:${process.env.PATH}`;
    executeCommand('. $HOME/.cargo/env');
    
    logSection('Install wasm-pack using cargo');
    executeCommand('cargo install wasm-pack');
  
    // Log environment for debugging
    logSection('Environment Check');
    console.log('PATH:', process.env.PATH);
    executeCommand('rustc --version', 'Check Rust version');
    executeCommand('wasm-pack --version', 'Check wasm-pack version');

    // Build WASM
    executeCommand('wasm-pack build --target web ./wasm --verbose', 'WASM Build');

    if (fs.existsSync('./wasm/pkg')) {
        logSection('WASM pkg directory contents');
        console.log('wasm/pkg contents:', fs.readdirSync('./wasm/pkg'));
    } else {
        console.warn('⚠️ wasm/pkg directory not found after build');
    }

    // Copy WASM files 
    executeCommand('node scripts/copy-wasm-prod.js', 'Copy WASM files');

    if (fs.existsSync('./src/assets/wasm')) {
        logSection('src/assets/wasm directory contents');
        console.log('Contents:', fs.readdirSync('./src/assets/wasm'));
    } else {
        console.warn('⚠️ src/assets/wasm directory not found after copy');
    }

    // Build Angular
    executeCommand('ng build --verbose', 'Angular Build');

    if (fs.existsSync('./dist/pixie/assets/wasm')) {
        logSection('Final dist/pixie/assets/wasm contents');
        console.log('Contents:', fs.readdirSync('./dist/pixie/assets/wasm'));
    } else {
        console.warn('⚠️ dist/pixie/assets/wasm directory not found in final build');
    }

    if (fs.existsSync('./dist/pixie')) {
        logSection('Final dist/pixie');
        console.log('Contents:', fs.readdirSync('./dist/pixie'));
    } else {
        console.warn('⚠️ dist/pixie directory not found in final build');
    }

    if (fs.existsSync('./dist/pixie/browser')) {
        console.log('Contents of dist/pixie/browser:', fs.readdirSync('./dist/pixie/browser'));
    } else {
        console.warn('⚠️ dist/pixie directory not found in final build');
    }

    logSection('Build completed successfully! 🎉');
} catch (error) {
    logSection('Build failed! ❌');
    console.error(error);
    process.exit(1);
}