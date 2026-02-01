# GitHub Packages Setup Guide

## Overview

SmonthlAPI packages are published to GitHub Packages (npm registry).

**Packages:**
- `@moude-ai/smonthl` - HTML/JavaScript version
- `@moude-ai/smonthl-react` - React/TypeScript version

## For Package Maintainers (Publishing)

### 1. Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "NPM Publish Token"
4. Select scopes:
   - ✅ `write:packages` - Upload packages
   - ✅ `read:packages` - Download packages
   - ✅ `delete:packages` - Delete packages (optional)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

### 2. Set Environment Variable

```bash
# Add to your ~/.bashrc or ~/.zshrc
export GITHUB_TOKEN=ghp_your_token_here

# Or set temporarily
export GITHUB_TOKEN=ghp_your_token_here
```

### 3. Publish Packages

**HTML Version:**
```bash
cd html-ver
npm publish
```

**React Version:**
```bash
cd tsx-react-ver
npm run build:lib  # Build the library first
npm publish
```

**Both to npm.js (public):**
```bash
cd html-ver
npm publish --registry=https://registry.npmjs.org

cd tsx-react-ver
npm publish --registry=https://registry.npmjs.org
```

## For Package Users (Installing)

### 1. Authenticate with GitHub Packages

Create `~/.npmrc` in your home directory:

```
@moude-ai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Or use npm login:
```bash
npm login --registry=https://npm.pkg.github.com
```

### 2. Install Packages

```bash
# HTML version
npm install @moude-ai/smonthl

# React version
npm install @moude-ai/smonthl-react
```

### 3. Use in Your Project

**HTML Version:**
```html
<script src="node_modules/@moude-ai/smonthl/smonthl-api.js"></script>
<script>
  const api = new SmonthlAPI();
  api.circle(100, '🚀').blur(80).jelly(true);
</script>
```

**React Version:**
```jsx
import { LiquidGlassDemo } from '@moude-ai/smonthl-react';

function App() {
  return <LiquidGlassDemo />;
}
```

## Package URLs

- HTML: https://github.com/Moude-AI/smonthl-html/packages
- React: https://github.com/Moude-AI/smonthl-react/packages

## Troubleshooting

### "401 Unauthorized" Error

Make sure:
1. Your `GITHUB_TOKEN` environment variable is set
2. The token has `write:packages` scope
3. You're logged in: `npm login --registry=https://npm.pkg.github.com`

### "404 Not Found" Error

Make sure:
1. The package name starts with `@moude-ai/`
2. Your `.npmrc` file has the correct registry configuration
3. You have access to the Moude-AI organization

### Publishing to Both GitHub and npm.js

You can publish to both registries:

```bash
# Publish to GitHub Packages (default)
npm publish

# Also publish to npm.js
npm publish --registry=https://registry.npmjs.org
```

## Automated Publishing

The build tools can be updated to automatically publish:

```bash
cd build-tools
# Edit auto-release.sh to add:
# npm publish (in html-ver and tsx-react-ver)
```

## Security Notes

- ⚠️ Never commit `.npmrc` files with tokens to git
- ⚠️ Use environment variables for tokens
- ⚠️ Rotate tokens regularly
- ⚠️ Use minimal scopes (only `write:packages` needed)

## More Information

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [npm Registry Documentation](https://docs.npmjs.com/)
