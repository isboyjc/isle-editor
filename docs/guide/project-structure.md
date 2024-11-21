# Project Structure

Isle Editor is organized as a monorepo using pnpm workspaces. This structure allows us to maintain multiple packages while sharing dependencies and build configurations.

## Directory Structure

```
isle-editor/
├── packages/              # Main packages directory
│   ├── core/             # Core editor functionality
│   │   ├── src/          # Source code
│   │   ├── dist/         # Built files
│   │   └── package.json  # Package config
│   │
│   └── vue3/             # Vue 3 implementation
│       ├── src/          # Source code
│       ├── dist/         # Built files
│       └── package.json  # Package config
│
├── shared/               # Shared configurations
│   ├── eslint/          # ESLint configs
│   ├── prettier/        # Prettier configs
│   └── rollup/          # Rollup configs
│
├── playground/           # Development playground
│   ├── src/             # Source code
│   └── package.json     # Package config
│
├── docs/                # Documentation
│   ├── guide/           # User guide
│   ├── components/      # Component docs
│   └── .vitepress/     # VitePress config
│
├── pnpm-workspace.yaml  # Workspace config
└── package.json         # Root package.json
```

## Packages

### @isle-editor/core

The core package contains the fundamental editor functionality:

- Text manipulation and formatting
- Selection management
- Command system
- Extension system
- State management
- Schema definitions

### @isle-editor/vue3

The Vue 3 package provides Vue-specific implementations:

- Vue components
- Composables
- Directives
- Event handling
- Vue-specific utilities

## Shared Configuration

The shared directory contains configurations used across all packages:

### Rollup Configuration

```js
// shared/rollup/index.js
export const baseConfig = ({ input, pkg }) => ({
  input,
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  // ... other config
});
```

### ESLint Configuration

```js
// shared/eslint/index.js
module.exports = {
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  // ... other rules
};
```

## Development Workflow

1. Install dependencies:

```bash
pnpm install
```

2. Start development:

```bash
# Start playground
pnpm dev:play

# Build specific package
pnpm build:core
pnpm build:vue3

# Build all packages
pnpm build
```

3. Testing:

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

4. Documentation:

```bash
# Start documentation development
pnpm docs:dev

# Build documentation
pnpm docs:build
```

## Version Management

We use Changesets for version management:

1. Create a changeset:

```bash
pnpm changeset
```

2. Version packages:

```bash
pnpm version
```

3. Publish packages:

```bash
pnpm publish
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Create a changeset describing your changes
5. Submit a pull request

For more details, see our [Contributing Guide](/contributing).
