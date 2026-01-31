# NPM Publishing Guide

Guide for publishing SmonthlAPI packages to npm registry.

## 📦 Available Packages

### 1. @smonthl/liquid-glass-html
HTML/JavaScript version of SmonthlAPI

**Package Name:** `@smonthl/liquid-glass-html`  
**Version:** 1.0.0  
**License:** Apache-2.0

### 2. @smonthl/liquid-glass-react
React TypeScript version of SmonthlAPI

**Package Name:** `@smonthl/liquid-glass-react`  
**Version:** 1.0.0  
**License:** Apache-2.0

---

## 🚀 Publishing to npm

### Prerequisites

1. **npm Account**
   - Create account at https://www.npmjs.com/signup
   - Verify email address

2. **Login to npm**
   ```bash
   npm login
   ```
   Enter your username, password, and email.

3. **Create Organization (Optional)**
   - Go to https://www.npmjs.com/org/create
   - Create organization: `@smonthl`
   - Or use your personal scope

---

## 📤 Publish HTML Version

```bash
cd html-ver

# Test package contents
npm pack
# This creates @smonthl-liquid-glass-html-1.0.0.tgz

# Verify package contents
tar -tzf smonthl-liquid-glass-html-1.0.0.tgz

# Publish to npm
npm publish --access public

# Or use the script
npm run publish:npm
```

### What Gets Published (HTML)
- `smonthl-api.js` - Core API
- `index.html` - Demo page
- `glass-config.json` - Configuration
- `electron-main.js` - Electron support
- `package.json` - Package info
- `README.md` - Documentation

---

## 📤 Publish React Version

```bash
cd tsx-react-ver

# Build the library first
npm run build:lib

# Test package contents
npm pack

# Verify package contents
tar -tzf smonthl-liquid-glass-react-1.0.0.tgz

# Publish to npm
npm publish --access public

# Or use the script
npm run publish:npm
```

### What Gets Published (React)
- `dist/` - Built library files
  - `index.js` - CommonJS bundle
  - `index.esm.js` - ES Module bundle
  - `index.d.ts` - TypeScript definitions
  - `style.css` - Compiled styles
- `package.json` - Package info
- `README.md` - Documentation

---

## 📥 Installation by Users

### HTML Version
```bash
npm install @smonthl/liquid-glass-html
```

**Usage:**
```html
<script src="node_modules/@smonthl/liquid-glass-html/smonthl-api.js"></script>
<script>
  const api = new SmonthlAPI();
  api.loadConfig('./node_modules/@smonthl/liquid-glass-html/glass-config.json');
</script>
```

### React Version
```bash
npm install @smonthl/liquid-glass-react
```

**Usage:**
```typescript
import { SmonthlAPI, LiquidGlassDemo } from '@smonthl/liquid-glass-react';
import '@smonthl/liquid-glass-react/dist/style.css';

const api = new SmonthlAPI();
await api.loadConfig();

function App() {
  return <LiquidGlassDemo />;
}
```

---

## 🔄 Updating Packages

### Update Version

Edit `package.json` in each version folder:

```json
{
  "version": "1.0.1"
}
```

Or use npm version:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### Publish Update

```bash
# HTML version
cd html-ver
npm publish

# React version
cd tsx-react-ver
npm run build:lib
npm publish
```

---

## 🏷️ Version Tags

### Create Git Tags

```bash
# Tag HTML version
git tag html-v1.0.0
git push origin html-v1.0.0

# Tag React version
git tag react-v1.0.0
git push origin react-v1.0.0
```

### npm Tags

```bash
# Publish with tag
npm publish --tag beta
npm publish --tag next

# Set latest tag
npm dist-tag add @smonthl/liquid-glass-html@1.0.0 latest
```

---

## 📊 Package Statistics

### View Package Info

```bash
npm info @smonthl/liquid-glass-html
npm info @smonthl/liquid-glass-react
```

### View Downloads

```bash
npm view @smonthl/liquid-glass-html downloads
npm view @smonthl/liquid-glass-react downloads
```

---

## 🔐 Security

### Two-Factor Authentication

Enable 2FA for publishing:
```bash
npm profile enable-2fa auth-and-writes
```

### Access Tokens

Create automation token:
```bash
npm token create --read-only
npm token create --cidr-whitelist=192.168.1.1/24
```

---

## 🧪 Testing Before Publishing

### Test Local Installation

```bash
# HTML version
cd html-ver
npm pack
npm install -g ./smonthl-liquid-glass-html-1.0.0.tgz

# React version
cd tsx-react-ver
npm pack
cd ../test-project
npm install ../tsx-react-ver/smonthl-liquid-glass-react-1.0.0.tgz
```

### Test in Example Project

Create test project:
```bash
mkdir test-smonthl
cd test-smonthl
npm init -y
npm install ../html-ver/smonthl-liquid-glass-html-1.0.0.tgz
```

---

## 📝 Package.json Fields

### Important Fields

```json
{
  "name": "@smonthl/liquid-glass-html",
  "version": "1.0.0",
  "description": "SmonthlAPI - Liquid glass UI components",
  "main": "smonthl-api.js",
  "keywords": ["smonthl", "liquid-glass", "glassmorphism"],
  "author": "Arthurc1Moude <arch_cheng@163.com>",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/Moude-AI/smonthl_api.git",
    "directory": "html-ver"
  },
  "bugs": {
    "url": "https://github.com/Moude-AI/smonthl_api/issues"
  },
  "homepage": "https://github.com/Moude-AI/smonthl_api#readme"
}
```

---

## 🚫 .npmignore

Files to exclude from npm package:

```
node_modules/
dist-electron/
.vscode/
*.log
.DS_Store
.env
.env.local
```

---

## 📚 Documentation

After publishing, update:
- README.md with installation instructions
- VERSIONS.md with npm package names
- ET.md with package structure

---

## 🔗 Useful Links

- npm Registry: https://www.npmjs.com/
- npm Documentation: https://docs.npmjs.com/
- Package Search: https://www.npmjs.com/search?q=%40smonthl
- HTML Package: https://www.npmjs.com/package/@smonthl/liquid-glass-html
- React Package: https://www.npmjs.com/package/@smonthl/liquid-glass-react

---

## ✅ Publishing Checklist

Before publishing:

- [ ] Update version number
- [ ] Update CHANGELOG.md
- [ ] Run tests
- [ ] Build library (React version)
- [ ] Test local installation
- [ ] Update documentation
- [ ] Commit all changes
- [ ] Create git tag
- [ ] npm login
- [ ] npm publish
- [ ] Verify on npmjs.com
- [ ] Test installation from npm
- [ ] Update GitHub README

---

**Last Updated**: January 31, 2025  
**Maintainer**: Arthurc1Moude  
**License**: Apache-2.0
