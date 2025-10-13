# Generative AI Services

Modern Node.js + TypeScript backend with ESModules support for AI document generation.

## 🚀 Features

- ✅ Node.js 18+ with TypeScript
- ✅ ESModules (ESM) support
- ✅ Express.js server
- ✅ Strict TypeScript configuration
- ✅ ESLint + Prettier for code quality
- ✅ Path aliases for clean imports
- ✅ Winston logger
- ✅ Error handling middleware

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm (comes with Node.js)

## 🔧 Installation

All dependencies are installed via npm to ensure latest compatible versions:

```bash
# Dependencies were installed using:
npm install express dotenv cors helmet winston
npm install -D typescript @types/node @types/express @types/cors tsx tsc-alias rimraf
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-import-resolver-typescript
npm install -D prettier eslint-config-prettier
```

## 🏃 Usage

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check

# Clean build directory
npm run clean
```

## 📁 Project Structure

```
.
├── src/
│   ├── index.ts           # Main entry point
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── models/            # Data models
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── dist/                  # Compiled output
├── logs/                  # Application logs
├── .env                   # Environment variables
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
└── .prettierrc            # Prettier configuration
```

## 🛠️ Configuration Details

### TypeScript (tsconfig.json)

- **Module System**: ES2022 with `bundler` moduleResolution
- **Strict Mode**: Enabled with comprehensive type checking
- **Path Aliases**: Configured for clean imports (e.g., `@/utils`, `@/config`)
- **Source Maps**: Enabled for debugging

### ESLint (eslint.config.mjs)

- **Parser**: @typescript-eslint/parser
- **Plugins**: TypeScript, Import
- **Config**: Uses flat config format (ESLint 9+)
- **Integration**: eslint-config-prettier to disable conflicting rules
- **Import Resolution**: Configured for TypeScript path aliases

### Prettier (.prettierrc)

- **Format**: Single quotes, semicolons, 80 char width
- **Integration**: Works alongside ESLint (no conflicts)

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module" errors

**Fix**: Ensure you're using correct import extensions and path aliases are properly configured in both `tsconfig.json` and ESLint settings.

### Issue: ESLint "import/no-unresolved" errors

**Fix**: Make sure `eslint-import-resolver-typescript` is installed and configured in ESLint settings.

### Issue: Path aliases not working at runtime

**Fix**: Use `tsc-alias` after TypeScript compilation (already in build script).

### Issue: ESM import/export issues

**Fix**: Ensure `"type": "module"` is in package.json and tsconfig uses ES2022 module system.

### Issue: Prettier vs ESLint conflicts

**Fix**: Use `eslint-config-prettier` (already configured) to disable conflicting ESLint rules.

### Issue: Running TypeScript files directly

**Fix**: Use `tsx` for development (npm run dev) or compile first (npm run build).

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
```

## 📝 Next Steps

1. Add your AI service integrations (OpenAI, Anthropic, Google AI, etc.)
2. Implement document generation logic
3. Add authentication/authorization middleware
4. Set up database connections if needed
5. Add comprehensive error handling
6. Write tests

## 📄 License

ISC
