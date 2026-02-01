# How to Publish SmonthlAPI Packages

## ⚠️ Important: GitHub Token Setup Required

To publish to GitHub Packages, you need a Personal Access Token with the correct permissions.

## Step 1: Create GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "NPM Publish Token"
4. **Select these scopes:**
   - ✅ `write:packages` - **Required for publishing**
   - ✅ `read:packages` - Required for installing
   - ✅ `repo` - Required for private repos (optional)
5. Click "Generate token"
6. **Copy the token immediately!**

## Step 2: Set Environment Variable

```bash
export GITHUB_TOKEN=ghp_your_new_token_here
```

Add to `~/.bashrc` or `~/.zshrc` to make it permanent:
```bash
echo 'export GITHUB_TOKEN=ghp_your_token_here' >> ~/.bashrc
source ~/.bashrc
```

## Step 3: Publish Packages

### HTML Version:
```bash
cd html-ver
export GITHUB_TOKEN=ghp_your_token_here
npm publish
```

### React Version:
```bash
cd tsx-react-ver
export GITHUB_TOKEN=ghp_your_token_here
npm run build:lib
npm publish
```

## Alternative: Publish to npm.js (Public Registry)

If you want to publish to the public npm registry instead:

### 1. Remove GitHub Packages Config

Edit `package.json` and remove:
```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
},
```

### 2. Login to npm.js

```bash
npm login
```

### 3. Publish

```bash
npm publish --access public
```

## Current Status

✅ **Configured for GitHub Packages**
- Package names: `@moude-ai/smonthl` and `@moude-ai/smonthl-react`
- Registry: https://npm.pkg.github.com
- Requires: GitHub token with `write:packages` scope

## Troubleshooting

### "403 Forbidden - Permission denied"

**Problem:** Your GitHub token doesn't have `write:packages` scope.

**Solution:** Create a new token with the correct scopes (see Step 1 above).

### "401 Unauthorized"

**Problem:** Token not set or expired.

**Solution:**
```bash
export GITHUB_TOKEN=ghp_your_token_here
```

### Want to use both registries?

You can publish to both GitHub Packages AND npm.js:

```bash
# Publish to GitHub Packages
npm publish

# Also publish to npm.js
npm publish --registry=https://registry.npmjs.org --access public
```

## Package URLs

Once published, packages will be available at:
- https://github.com/Moude-AI/smonthl-html/packages
- https://github.com/Moude-AI/smonthl-react/packages

## Next Steps

1. Create a token with `write:packages` scope
2. Set `GITHUB_TOKEN` environment variable
3. Run `npm publish` in each package directory
4. Packages will be available on GitHub Packages!
