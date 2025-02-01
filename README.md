# 🎨 Pixie - Modern Image Editor

A powerful, fast, and intuitive image editor built with Angular and Rust WebAssembly. Combine the performance of Rust with the flexibility of Angular for seamless image manipulation! ✨

## ✨ Features

- 🚀 Lightning-fast image processing powered by Rust WASM
- 🎯 Intuitive user interface built with Angular
- 🛠️ Modern architecture combining web and native performance
- 🎹 Real-time image manipulation and filters
- 📦 Lightweight and efficient

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Rust and Cargo
- wasm-pack
- Angular CLI

### 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pixie.git
cd pixie
```

2. Install dependencies:
```bash
npm install
```

3. Build the WebAssembly module:
```bash
npm run build:wasm
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200` 🌐

## 📜 Available Scripts

- `npm start`: Launch the development environment with hot-reload for both Angular and WASM
- `npm run build`: Build the Angular application for production
- `npm run build:wasm`: Compile the Rust code to WebAssembly
- `npm run watch:wasm`: Watch for changes in Rust code and rebuild WASM automatically
- `npm test`: Run the test suite
- `npm run ng`: Run Angular CLI commands

## 🏗️ Project Structure

```
pixie/
├── src/                # Angular source files
├── wasm/              # Rust WebAssembly source code
├── scripts/           # Build and utility scripts
└── dist/              # Compiled output
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

