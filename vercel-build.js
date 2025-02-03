const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

function executeCommand(command) {
  console.log(`Executing: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Command failed: ${command}`, error);
    process.exit(1);
  }
}

function setupRustAndWasm() {
  // Safer Rust installation
  executeCommand('curl https://sh.rustup.rs -sSf | sh -s -- -y');
  executeCommand('source $HOME/.cargo/env');
  executeCommand('rustup default stable');
  executeCommand('cargo install wasm-pack');
}

function main() {
  // Set explicit home directory
  process.env.HOME = process.env.HOME || '/vercel';

  // Ensure Rust and wasm-pack are installed
  setupRustAndWasm();

  // Build WASM
  executeCommand('wasm-pack build --target web ./wasm');

  // Copy WASM files
  executeCommand('node scripts/copy-wasm-prod.js');

  // Build Angular app
  executeCommand('ng build --configuration=production');
}

main();