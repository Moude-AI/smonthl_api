# SmonthlAPI

A powerful, flexible configuration API for creating beautiful frosted glass UI components with liquid glass effects, advanced code execution, AI-style chain builders, and performance monitoring. Build buttons, cards, windows, icons, menus, and custom glass elements with real magnifying lens effects, jelly physics, magnetic cursor following, dynamic lighting, and much more.

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.7-green.svg)
![npm](https://img.shields.io/npm/v/smonthl)
![npm](https://img.shields.io/npm/v/smonthl-react)

## 🚀 Latest Release: v2.0.7

**AI-Style Chain Builder & Performance Monitoring**

New in v2.0.7:
- � *AI-Style Chain Builder with conditional operations, loops, and parallel execution
- 📊 Real-time Performance Monitoring with FPS tracking and memory profiling
- ⚡ Auto-optimization system with performance scoring
- 📦 Batch processing with progress tracking
- 🛠️ Utility helpers: memoize, debounce, throttle

## ✨ Features

### Core Features
- 🎨 **Flexible Component System** - Create any glass component: buttons, cards, windows, icons, menus, custom shapes
- 📐 **Customizable Sizes & Shapes** - Configure width, height, border radius, and custom dimensions
- 🔍 **Magnifying Lens Effect** - Real backdrop-filter magnification
- 🎯 **Jelly Physics** - Spring-based elastic animations
- 🧲 **Magnetic Following** - Cursor attraction with smooth interpolation
- 💡 **Dynamic Lighting** - Cursor-following light effects
- ⚙️ **JSON Configuration** - Complete API for configuration management
- 📦 **Templates** - Pre-built component configs
- 🎭 **Icon Support** - Add icons and custom content
- � **Imporbt/Export** - Save and load configurations

### Advanced Features (v2.x)
- 🎪 **Creative Syntax Language** - Natural language DSL for building components
- 🌐 **External Resource Loading** - Import CSS, JS, fonts, icons from any URL
- 🎨 **Liquid Glass Text** - Beautiful text effects with blur, glow, gradients, animations
- 🔌 **Plugin System** - Extend functionality with plugins and CDN loaders
- 💻 **Full Code Features** - Execute, analyze, transform, and optimize code
- 🎯 **Advanced Styling** - Tailwind-like utilities, animations, transitions, filters
- 🔗 **Chain Builder** - AI-style chainable operations with conditionals and loops
- 📊 **Performance Monitoring** - Real-time FPS, memory, and operation tracking
- ⚡ **Auto-optimization** - Automatic performance improvements
- 🎭 **Theme System** - Create and apply custom themes
- 📡 **State Management** - Reactive state with Proxy-based watchers
- 🔄 **Batch Processing** - Efficient large dataset processing

## 📦 Installation

### HTML/JavaScript Version
```bash
npm install smonthl
```

### React TypeScript Version
```bash
npm install smonthl-react
```

## 🎯 Quick Start

### Simple Example
```javascript
import SmonthlAPI from 'smonthl';

const api = new SmonthlAPI();

// Create a beautiful glass button
const config = api.button(200, 60, 'Click Me')
  .blur(80)
  .transparent(10)
  .rounded(16)
  .preset('frosted')
  .theme('ocean');
```

### AI-Style Chain Builder (v2.0.7)
```javascript
api.chain()
   .then(api => api.circle(100, '🚀'))
   .then(api => api.blur(80))
   .if(
     () => window.innerWidth > 768,
     api => api.preset('frosted'),
     api => api.preset('minimal')
   )
   .repeat(3, (api, i) => {
     api.icon(['⭐', '🌙', '☀️'][i], 60);
   })
   .delay(1000)
   .parallel(
     api => api.animate('bounce'),
     api => api.theme('ocean')
   )
   .execute();
```

### Performance Monitoring (v2.0.7)
```javascript
const monitor = api.monitor();
monitor.startTracking();

// Track operations
monitor.trackOperation('createCircle', () => {
  api.circle(100, '🎯').preset('crystal');
});

// Get performance report
const report = monitor.report();
// 🔍 SmonthlAPI Performance Report
// 📊 Metrics: { fps: 60, memoryUsage: 45.2, ... }
// ⚡ Performance Score: 95/100

// Auto-optimize if needed
monitor.autoOptimize();
```

### Liquid Glass Text (v2.0.3+)
```javascript
// Create beautiful liquid glass text
api.text('Hello World', {
  fontSize: 48,
  blur: 60,
  glow: true,
  glowColor: '255, 255, 255'
});

// Animated neon text
api.neonText('NEON', '#00ffff', {
  fontSize: 64,
  animate: true,
  animationType: 'pulse'
});

// Gradient text
api.gradientText('Gradient', ['#60a5fa', '#3b82f6'], {
  fontSize: 56
});
```

### Code Execution (v2.0.5+)
```javascript
// Execute code safely
const result = api.code('2 + 2', 'javascript', { execute: true });

// Syntax highlighting
const highlighted = api.highlight(`
function hello() {
  console.log('Hello World');
}
`, 'javascript', 'dark');

// Code analysis
const analysis = api.analyze(sourceCode, 'javascript');
// Returns: { lines, characters, functions, variables, complexity, dependencies }
```

### Plugin System (v2.0.4-beta+)
```javascript
// Load from CDN
await api.loadCDN('gsap', '3.12.0');
await api.loadCDN('anime', 'latest');

// Load from npm
await api.loadNPM('lodash', 'lodash.min.js');

// Install plugins
await api.installPlugin('particles');
await api.installPlugin('animations');
```

## 📁 Available Versions

SmonthlAPI comes in two versions:

### [HTML/JavaScript Version](./html-ver)
Pure HTML and vanilla JavaScript - zero dependencies, runs directly in browser.

**Install:**
```bash
npm install smonthl
```

**Features:**
- Zero dependencies
- Runs in any browser
- Electron app included
- 111.2 kB unpacked

### [React TypeScript Version](./tsx-react-ver)
Modern React with TypeScript, Vite, and full type safety.

**Install:**
```bash
npm install smonthl-react
```

**Features:**
- Full TypeScript support
- React 19 compatible
- Vite for fast development
- Electron app included
- 1.5 MB unpacked

See [VERSIONS.md](./VERSIONS.md) for detailed comparison.

## 📖 Documentation

- [CHANGELOG.md](./CHANGELOG.md) - Complete version history with examples
- [VERSIONS.md](./VERSIONS.md) - Version comparison and selection guide
- [DSL_SYNTAX_GUIDE.md](./DSL_SYNTAX_GUIDE.md) - Creative syntax language guide
- [BUILD_AND_RUN.md](./BUILD_AND_RUN.md) - Build and run instructions
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Coding standards and best practices
- [LIQUID_GLASS_GUIDE.md](./LIQUID_GLASS_GUIDE.md) - Glass effects implementation
- [JSON_CONFIG_GUIDE.md](./JSON_CONFIG_GUIDE.md) - Configuration reference
- [FEATURES.md](./FEATURES.md) - Complete feature list
- [MODERN_STYLES.md](./MODERN_STYLES.md) - Modern styling techniques
- [USAGE.md](./USAGE.md) - Usage examples and patterns

## 🌟 Version Roadmap

### v2.x Family (Current)
- ✅ v2.0.1 - Creative Syntax Language & External Imports
- ✅ v2.0.2-beta - Extended syntax grammar
- ✅ v2.0.3 - Liquid Glass Text Features
- ✅ v2.0.4-beta - Plugin System & Resource Loaders
- ✅ v2.0.5 - Full Code Features
- ✅ v2.0.6 - Expanded Features (Advanced Code, Styles & Syntax)
- ✅ v2.0.7 - AI-Style Chain Builder & Performance Monitoring
- 🔜 v2.0.8 - Final v2 Extended Version (Coming Soon)

### Next Generation
- 🚀 v3.0.0 - Next Generation Architecture (Planned)
- 🌟 v4.0.0 - Future Vision (Planned)

## ⚙️ Configuration

SmonthlAPI is highly flexible - create any glass component with custom sizes, shapes, and effects:

```json
{
  "componentType": "button",
  "glass": {
    "transparency": 6,
    "blur": 60,
    "magnifyingBlur": 30,
    "magnifyingBrightness": 115,
    "lensSize": 40,
    "borderRadius": 32,
    "width": 200,
    "height": 60
  },
  "content": {
    "type": "text",
    "title": "Click Me",
    "icon": "✨"
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

// Option 1: Use default configuration (built-in)
await api.loadConfig();

// Option 2: Load from included glass-config.json
await api.loadConfig('./node_modules/smonthl/glass-config.json');

// Option 3: Copy and customize your own config
// cp node_modules/smonthl/glass-config.json ./my-config.json
// await api.loadConfig('./my-config.json');
```

### Update Configuration
```javascript
api.updateConfig('glass.blur', 60);
api.updateConfig('jelly.elasticity', 0.6);
```

### Use Templates
```javascript
// Pre-configured component templates
const buttonConfig = api.createFromTemplate('button');
const cardConfig = api.createFromTemplate('card');
const windowConfig = api.createFromTemplate('window');
const iconConfig = api.createFromTemplate('icon');
const menuConfig = api.createFromTemplate('menu');
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
├── CHANGELOG.md           # Complete version history
├── VERSIONS.md            # Version comparison
├── DSL_SYNTAX_GUIDE.md    # Syntax guide
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
- **npm (HTML)**: https://www.npmjs.com/package/smonthl
- **npm (React)**: https://www.npmjs.com/package/smonthl-react
- **Issues**: https://github.com/Moude-AI/smonthl_api/issues

## 🙏 Acknowledgments

- Inspired by modern glassmorphism design trends
- Built with React, TypeScript, and Electron
- Uses Vite for blazing fast development
- Powered by advanced performance monitoring and optimization

---

Made with ❤️ by [Moude-AI](https://github.com/Moude-AI)
