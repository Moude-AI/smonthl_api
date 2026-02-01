# ✅ Published Packages

## Successfully Published to GitHub Packages!

### 📦 HTML Version
- **Package:** `@moude-ai/smonthl@2.0.7`
- **Registry:** https://npm.pkg.github.com
- **Repository:** https://github.com/Moude-AI/smonthl-html
- **Size:** 27.5 kB
- **Status:** ✅ Published

### 📦 React Version
- **Package:** `@moude-ai/smonthl-react@2.0.7`
- **Registry:** https://npm.pkg.github.com
- **Repository:** https://github.com/Moude-AI/smonthl-react
- **Size:** 342.3 kB
- **Status:** ✅ Published

## Installation

### For Users

**1. Create `.npmrc` in your project:**
```
@moude-ai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

**2. Install packages:**
```bash
# HTML version
npm install @moude-ai/smonthl

# React version
npm install @moude-ai/smonthl-react
```

### Usage

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

View packages on GitHub:
- HTML: https://github.com/orgs/Moude-AI/packages?repo_name=smonthl-html
- React: https://github.com/orgs/Moude-AI/packages?repo_name=smonthl-react

## What's Included

### HTML Package (`@moude-ai/smonthl`)
- `smonthl-api.js` - Complete API (76.9 kB)
- `index.html` - Demo page
- `glass-config.json` - Configuration
- `electron-main.js` - Electron support
- `README.md` - Documentation

### React Package (`@moude-ai/smonthl-react`)
- `dist/` - Built files for production
- `src/` - Source TypeScript files
- `glass-config.json` - Configuration
- `README.md` - Documentation

## Features

Both packages include:
- ✨ Liquid Glass UI with magnifying lens
- 🎪 Jelly physics animations
- 🧲 Magnetic interactions
- 💡 Cursor-following lighting
- 🎨 Multiple style presets
- 📝 Creative DSL syntax
- 🔧 JSON configuration
- 🎯 Advanced features (AI-style chains, performance monitoring)

## Version History

- **v2.0.7** (Current) - Fixed Electron blank screens, auto-starting Vite, GitHub Packages support
- **v2.0.0 - v2.0.6** - Major feature releases
- **v1.0.0 - v1.0.6** - Initial releases

## Support

- **Issues:** https://github.com/Moude-AI/smonthl_api/issues
- **Documentation:** https://github.com/Moude-AI/smonthl_api
- **Author:** Arthurc1Moude <arch_cheng@163.com>

## License

Apache-2.0

---

**Published:** February 1, 2026
**Registry:** GitHub Packages (npm)
