// vercel-build.js
const { execSync } = require('child_process');
const fs = require('fs');

// Ensure the wasm output directory exists
if (!fs.existsSync('src/assets/wasm')) {
    fs.mkdirSync('src/assets/wasm', { recursive: true });
}

// Build wasm
execSync('npm run build:wasm', { stdio: 'inherit' });

// Copy wasm files
execSync('cp -r wasm/pkg/* src/assets/wasm/', { stdio: 'inherit' });

// Build Angular
execSync('npm run build', { stdio: 'inherit' });