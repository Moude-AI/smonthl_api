# SmonthlAPI

Beautiful frosted glass UI components with real magnifying lens effects, jelly physics, magnetic cursor following, and dynamic lighting.

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ Features

- 🔍 **Magnifying Lens Effect** - Real backdrop-filter magnification
- 🎨 **Liquid Glass** - Frosted glass with customizable blur and transparency
- 🎯 **Jelly Physics** - Spring-based elastic animations
- 🧲 **Magnetic Following** - Cursor attraction with smooth interpolation
- � **Doynamic Lighting** - Cursor-following light effects
- ⚙️ **JSON Configuration** - Complete API for configuration management
- 📦 **Templates** - Pre-built components (button, card, window, icon, menu)
- � **Imtport/Export** - Save and load configurations

## 📦 Installation

### HTML/JavaScript Version
```bash
npm install smonthl
```

### React TypeScript Version
```bash
npm install smonthl-react
```

## 📁 Available Versions

SmonthlAPI comes in two versions:

### [HTML/JavaScript Version](./html-ver)
Pure HTML and vanilla JavaScript - zero dependencies, runs directly in browser.

**Install:**
```bash
npm install smonthl
```

**Or clone:**
```bash
cd html-ver
npm install
npm start
```

### [React TypeScript Version](./tsx-react-ver)
Modern React with TypeScript, Vite, and full type safety.

**Install:**
```bash
npm install smonthl-react
```

**Or clone:**
```bash
cd tsx-react-ver
npm install
npm run dev:all
```

See [VERSIONS.md](./VERSIONS.md) for detailed comparison.

## 🚀 Quick Start

### HTML Version
```html
<script src="smonthl-api.js"></script>
<script>
  const api = new SmonthlAPI();
  api.loadConfig('./glass-config.json').then(config => {
    console.log('Loaded:', config);
  });
</script>
```

### React Version
```typescript
import { SmonthlAPI } from './types/SmonthlAPI';
import LiquidGlassDemo from './components/LiquidGlassDemo';

const api = new SmonthlAPI();
await api.loadConfig();

<LiquidGlassDemo />
```

## 📖 Documentation

- [VERSIONS.md](./VERSIONS.md) - Version comparison and selection guide
- [BUILD_AND_RUN.md](./BUILD_AND_RUN.md) - Build and run instructions
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Coding standards and best practices
- [LIQUID_GLASS_GUIDE.md](./LIQUID_GLASS_GUIDE.md) - Glass effects implementation
- [JSON_CONFIG_GUIDE.md](./JSON_CONFIG_GUIDE.md) - Configuration reference
- [FEATURES.md](./FEATURES.md) - Complete feature list
- [MODERN_STYLES.md](./MODERN_STYLES.md) - Modern styling techniques

## ⚙️ Configuration

SmonthlAPI uses JSON configuration files:

```json
{
  "glass": {
    "transparency": 6,
    "blur": 60,
    "magnifyingBlur": 30,
    "magnifyingBrightness": 115,
    "lensSize": 40,
    "borderRadius": 32
  },
  "jelly": {
    "elasticity": 0.6,
    "friction": 0.85,
    "magneticRange": 150,
    "magneticStrength": 0.3
  },
  "lighting": {
    "cursorFollowEnabled": true,
    "lightIntensity": 0.8,
    "lightSize": 120
  }
}
```

## 🎯 API Usage

### Load Configuration
```javascript
const api = new SmonthlAPI();
await api.loadConfig('./glass-config.json');
```

### Update Configuration
```javascript
api.updateConfig('glass.blur', 60);
api.updateConfig('jelly.elasticity', 0.6);
```

### Use Templates
```javascript
const buttonConfig = api.createFromTemplate('button');
const cardConfig = api.createFromTemplate('card');
const windowConfig = api.createFromTemplate('window');
```

### Export/Import
```javascript
const json = api.exportConfig();
api.importConfig(jsonString);
```

### Event Listeners
```javascript
api.on('configLoaded', (config) => {
  console.log('Config loaded:', config);
});

api.on('configUpdated', ({ path, value }) => {
  console.log(`Updated ${path} to ${value}`);
});
```

### LocalStorage
```javascript
api.saveToLocalStorage();
api.loadFromLocalStorage();
```

## 🌐 Browser Support

Requires `backdrop-filter` CSS support:

- Chrome/Edge 76+
- Safari 9+ (with -webkit- prefix)
- Firefox 103+
- Opera 63+

## 📦 Project Structure

```
SmonthlAPI/
├── html-ver/              # HTML/JavaScript version
│   ├── index.html
│   ├── smonthl-api.js
│   ├── electron-main.js
│   └── glass-config.json
│
├── tsx-react-ver/         # React TypeScript version
│   ├── src/
│   │   ├── components/
│   │   ├── types/
│   │   └── ...
│   ├── electron-main.js
│   └── vite.config.ts
│
├── VERSIONS.md            # Version comparison
├── BUILD_AND_RUN.md       # Build instructions
├── STYLE_GUIDE.md         # Coding standards
└── LICENSE                # Apache 2.0
```

## 🛠️ Development

### HTML Version
```bash
cd html-ver
npm install
npm start
```

### React Version
```bash
cd tsx-react-ver
npm install
npm run dev        # Vite dev server
npm run dev:electron  # Electron app
npm run dev:all    # Both
```

## 📦 Building

### HTML Electron App
```bash
cd html-ver
npm run build
```

### React Electron App
```bash
cd tsx-react-ver
npm run build:electron
```

## 🤝 Contributing

Contributions are welcome! Please read [STYLE_GUIDE.md](./STYLE_GUIDE.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Apache 2.0 License - See [LICENSE](./LICENSE) file for details.

## 📧 Contact

- **GitHub**: https://github.com/Moude-AI/smonthl_api
- **Issues**: https://github.com/Moude-AI/smonthl_api/issues

## 🙏 Acknowledgments

- Inspired by modern glassmorphism design trends
- Built with React, TypeScript, and Electron
- Uses Vite for blazing fast development

---

Made with ❤️ by [Moude-AI](https://github.com/Moude-AI)
