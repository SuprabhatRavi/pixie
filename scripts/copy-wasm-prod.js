const fs = require('fs');
const path = require('path');

function copyWasmFiles() {
  // Define directories
  const sourceDir = path.join(process.cwd(), 'wasm/pkg');
  const targetDir = path.join(process.cwd(), 'src/assets/wasm'); // Only ONE target now

  // Files to copy
  const filesToCopy = [
    'image_editor_backend_bg.wasm',
    'image_editor_backend.js'
  ];

  // Create directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`Created directory: ${targetDir}`);
  }

  // Copy files
  filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    try {
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${file} to ${targetDir}`);
      } else {
        console.error(`Source file not found: ${sourcePath}`);
        process.exit(1);
      }
    } catch (error) {
      console.error(`Error copying ${file} to ${targetDir}:`, error);
      process.exit(1);
    }
  });

  console.log('WASM files copied successfully!');
}

// Execute the copy
copyWasmFiles();