# 🌊 SmonthlAPI - Liquid Glass UI Framework

**Make UI Better and Better** with Gooderl Interface

SmonthlAPI is a powerful JSON-based configuration system for creating beautiful liquid glass UI components with jelly physics, magnetic following, and cursor effects.

## ✨ Features

- 🌊 **Liquid Glass Effects** - Frosted glass with backdrop blur and magnifying lens
- 🎯 **Jelly Physics** - Q-soft elastic bouncy movement
- 🧲 **Magnetic Following** - Components attract to cursor
- 💡 **Cursor Light** - Glowing light follows your cursor
- 🎨 **Fully Configurable** - JSON-based configuration
- 📦 **Component Templates** - Pre-built buttons, cards, windows, icons, menus
- 🚀 **Framework Agnostic** - Works with React, Vue, Angular, or pure HTML/JS

## 📦 Installation

### HTML/JavaScript Version
```bash
npm install @gooderl/smonthl-api
```

### React/TypeScript Version
```bash
npm install @gooderl/smonthl-react
```

## 🚀 Quick Start

### HTML Version
```javascript
const smonthlAPI = new SmonthlAPI();
await smonthlAPI.loadConfig('./glass-config.json');

// Create components from templates
const button = smonthlAPI.createFromTemplate('button');
const card = smonthlAPI.createFromTemplate('card');
const window = smonthlAPI.createFromTemplate('window');
```

### React Version
```tsx
import { LiquidGlass } from '@gooderl/smonthl-react';

function App() {
  const config = {
    glass: { transparency: 6, blur: 60, borderRadius: 32 },
    jelly: { enabled: true, elasticity: 0.6 },
    lighting: { cursorFollowEnabled: true }
  };

  return <LiquidGlass config={config} />;
}
```

## 🎮 Run Demos

```bash
# HTML Demo
npm start

# React Demo  
npm run dev:react

# Samples
npx electron samples.html
```

## 📖 Documentation

- JSON_CONFIG_GUIDE.md - Complete configuration guide
- README-HTML-PACKAGE.md - HTML package documentation
- README-REACT-PACKAGE.md - React package documentation
- SAMPLES_GUIDE.md - Component samples guide

## 📄 License

MIT © 2024 Gooderl Interface

---

Built with ❤️ by the Gooderl Interface team
