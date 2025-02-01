// scripts/copy-wasm.js
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../wasm/pkg');
const targetDir = path.join(__dirname, '../src/assets/wasm');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy WASM files
const filesToCopy = [
  'image_editor_backend_bg.wasm',
  'image_editor_backend.js'
];

filesToCopy.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to ${targetDir}`);
  } catch (error) {
    console.error(`Error copying ${file}:`, error);
    process.exit(1);
  }
});

console.log('WASM files copied successfully!');