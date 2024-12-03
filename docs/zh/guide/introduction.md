# 介绍

## What is Isle Editor?

Isle Editor is a modern rich text editor built for Vue.js applications. It provides a powerful and flexible editing experience while maintaining excellent performance and extensibility.

## Features

- **Vue 3 Integration**: Built from the ground up with Vue 3
- **TypeScript Support**: Full TypeScript support for better development experience
- **Modular Architecture**: Easily extend and customize editor features
- **Rich Text Editing**: Support for basic formatting, lists, tables, and more
- **Collaborative Editing**: Built-in support for real-time collaboration
- **Markdown Support**: Import and export Markdown content
- **Theme Customization**: Easily customize the editor's appearance

## Project Structure

The project is organized as a monorepo using pnpm workspaces:

\`\`\`
isle-editor/
├── packages/
│ ├── core/ # Core editor functionality
│ └── vue3/ # Vue 3 specific implementation
├── shared/ # Shared utilities and configurations
├── playground/ # Development playground
└── docs/ # Documentation
\`\`\`

## Packages

### @isle-editor/core

The core package contains the fundamental editor functionality, including:

- Text manipulation
- Selection management
- Command system
- Extension system

### @isle-editor/vue3

The Vue 3 package provides:

- Vue 3 components
- Vue-specific utilities
- Component styling
- Event handling

### @isle-editor/shared

Shared utilities and configurations used across packages:

- Build configurations
- ESLint rules
- Common utilities

## Getting Started

Check out our [Getting Started](/guide/getting-started) guide to begin using Isle Editor in your project.
