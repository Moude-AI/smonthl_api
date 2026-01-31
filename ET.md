# Environment Trees (ET.md)

Complete directory structure and file organization for SmonthlAPI project.

## 📁 Root Directory Structure

```
SmonthlAPI/
├── html-ver/                    # HTML/JavaScript Version
├── tsx-react-ver/               # React TypeScript Version
├── node_modules/                # Root dependencies (gitignored)
├── .git/                        # Git repository
├── .vscode/                     # VSCode settings (gitignored)
│
├── README.md                    # Main project documentation
├── ET.md                        # This file - Environment Trees
├── VERSIONS.md                  # Version comparison guide
├── BUILD_AND_RUN.md            # Build and run instructions
├── STYLE_GUIDE.md              # Coding standards
├── LICENSE                      # Apache 2.0 License
│
├── FEATURES.md                  # Complete feature list
├── LIQUID_GLASS_GUIDE.md       # Glass effects guide
├── JSON_CONFIG_GUIDE.md        # Configuration reference
├── MODERN_STYLES.md            # Modern styling techniques
│
├── package.json                 # Root package configuration
├── package-lock.json           # Dependency lock file
└── .gitignore                  # Git ignore rules
```

---

## 🌐 HTML/JavaScript Version (`/html-ver`)

Complete standalone HTML implementation with vanilla JavaScript.

```
html-ver/
├── index.html                   # Main HTML file with UI
├── smonthl-api.js              # Core SmonthlAPI implementation
├── electron-main.js            # Electron main process
├── glass-config.json           # Configuration file
├── package.json                # Package configuration
└── README.md                   # HTML version documentation
```

### File Details

#### `index.html` (22,261 bytes)
- Complete demo application
- Inline CSS styles
- Inline JavaScript logic
- Control panel UI
- Glass container with effects
- Background management
- Jelly physics implementation
- Magnetic following
- Cursor lights

#### `smonthl-api.js` (3,795 bytes)
- SmonthlAPI class
- Configuration loading
- Template system
- Event system
- Import/Export functionality
- LocalStorage persistence

#### `electron-main.js` (648 bytes)
- Electron window creation
- Development mode support
- Window management

#### `glass-config.json` (2,903 bytes)
- Glass properties
- Jelly physics settings
- Lighting configuration
- Background images
- Component templates

#### `package.json` (1,633 bytes)
- Electron dependencies
- Build scripts
- electron-builder configuration

---

## ⚛️ React TypeScript Version (`/tsx-react-ver`)

Modern React implementation with TypeScript, Vite, and full type safety.

```
tsx-react-ver/
├── src/
│   ├── components/
│   │   ├── LiquidGlassDemo.tsx      # Main demo component
│   │   └── LiquidGlassDemo.css      # Component styles
│   │
│   ├── types/
│   │   └── SmonthlAPI.ts            # TypeScript types & API class
│   │
│   ├── App-React.tsx                # Root App component
│   └── index-react.tsx              # React DOM entry point
│
├── index.html                        # HTML template
├── electron-main.js                  # Electron main process
├── glass-config.json                 # Configuration file
│
├── vite.config.ts                    # Vite bundler configuration
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.node.json                # TypeScript Node configuration
│
├── package.json                      # Package configuration
└── README.md                         # React version documentation
```

### File Details

#### `src/components/LiquidGlassDemo.tsx` (~500 lines)
- Main React component
- State management with hooks
- Jelly physics with refs
- Magnetic following logic
- Cursor light effects
- Control panel UI
- Configuration management
- Import/Export handlers

#### `src/components/LiquidGlassDemo.css` (~200 lines)
- Glass container styles
- Magnifying lens effects
- Control panel styles
- Cursor light styles
- Jelly animations
- Responsive design

#### `src/types/SmonthlAPI.ts` (~250 lines)
- TypeScript interfaces:
  - `GlassConfig`
  - `ContentConfig`
  - `JellyConfig`
  - `LightingConfig`
  - `SmonthlConfig`
  - `ConfigListener`
- SmonthlAPI class implementation
- Full type safety

#### `src/App-React.tsx` (~15 lines)
- Root application component
- Renders LiquidGlassDemo

#### `src/index-react.tsx` (~10 lines)
- React DOM rendering
- Root element mounting

#### `electron-main.js` (~40 lines)
- Electron window creation
- Development/Production mode handling
- Vite dev server integration
- Window management

#### `vite.config.ts` (~10 lines)
- Vite configuration
- React plugin
- Server settings
- Build options

#### `tsconfig.json` (~25 lines)
- TypeScript compiler options
- ES2020 target
- React JSX
- Strict mode
- Module resolution

#### `tsconfig.node.json` (~10 lines)
- Node-specific TypeScript config
- For Vite configuration

#### `package.json` (~80 lines)
- Dependencies:
  - react
  - react-dom
- DevDependencies:
  - @types/react
  - @types/react-dom
  - @vitejs/plugin-react
  - electron
  - electron-builder
  - typescript
  - vite
  - concurrently
- Scripts:
  - dev
  - dev:electron
  - dev:all
  - build
  - build:electron
  - start

---

## 📄 Configuration Files

### `glass-config.json`

Used by both versions. Contains:

```json
{
  "componentType": "liquid-glass",
  "glass": {
    "transparency": 6,
    "blur": 60,
    "magnifyingBlur": 30,
    "magnifyingBrightness": 115,
    "lensSize": 40,
    "borderRadius": 32,
    "width": 700,
    "height": 140
  },
  "content": {
    "type": "text",
    "title": "Magnifying Liquid Glass",
    "subtitle": "Real lens magnification • Beautiful backgrounds"
  },
  "jelly": {
    "enabled": true,
    "elasticity": 0.6,
    "friction": 0.85,
    "bounceIntensity": 15,
    "wobbleSpeed": 0.3,
    "magneticRange": 150,
    "magneticStrength": 0.3
  },
  "lighting": {
    "cursorFollowEnabled": true,
    "followDistance": 200,
    "lightIntensity": 0.8,
    "lightSize": 120,
    "lightColor": "255, 255, 255"
  },
  "backgrounds": [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    "..."
  ],
  "backgroundChangeInterval": 10000,
  "templates": {
    "button": { ... },
    "card": { ... },
    "window": { ... },
    "icon": { ... },
    "menu": { ... }
  }
}
```

---

## 🔧 Build Output Directories

### HTML Version
```
html-ver/
└── dist/                        # electron-builder output
    ├── mac/                     # macOS builds
    ├── win/                     # Windows builds
    └── linux/                   # Linux builds
```

### React Version
```
tsx-react-ver/
├── dist/                        # Vite build output
│   ├── index.html
│   └── assets/
│       ├── index-[hash].js
│       └── index-[hash].css
│
└── dist-electron/               # electron-builder output
    ├── mac/                     # macOS builds
    ├── win/                     # Windows builds
    └── linux/                   # Linux builds
```

---

## 📦 Dependencies

### HTML Version Dependencies
```json
{
  "devDependencies": {
    "electron": "^40.1.0",
    "electron-builder": "^26.4.0"
  }
}
```

### React Version Dependencies
```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@types/node": "^25.1.0",
    "@types/react": "^19.2.10",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^4.2.1",
    "concurrently": "^8.2.2",
    "electron": "^40.1.0",
    "electron-builder": "^26.4.0",
    "typescript": "^5.9.3",
    "vite": "^5.0.12"
  }
}
```

---

## 🚫 Ignored Files (`.gitignore`)

```
node_modules/
dist/
dist-electron/
.vscode/
*.log
.DS_Store
.env
.env.local
package-lock.json
```

---

## 📊 File Size Summary

### HTML Version
- Total: ~30 KB (excluding node_modules)
- index.html: 22 KB
- smonthl-api.js: 4 KB
- glass-config.json: 3 KB
- Other files: 1 KB

### React Version
- Total: ~50 KB (excluding node_modules)
- Source files: 40 KB
- Configuration: 10 KB

### Documentation
- Total: ~80 KB
- README files: 15 KB
- Guides: 65 KB

---

## 🔄 Development Workflow

### HTML Version
```bash
cd html-ver
npm install          # Install Electron
npm start           # Run Electron app
# OR
open index.html     # Open in browser
```

### React Version
```bash
cd tsx-react-ver
npm install         # Install all dependencies
npm run dev         # Start Vite dev server
npm run dev:electron # Start Electron (in another terminal)
# OR
npm run dev:all     # Start both concurrently
```

---

## 🏗️ Build Process

### HTML Version
```bash
cd html-ver
npm run package     # Build Electron app
# Output: dist/
```

### React Version
```bash
cd tsx-react-ver
npm run build       # Build React app with Vite
# Output: dist/

npm run build:electron  # Build Electron app
# Output: dist-electron/
```

---

## 📝 Notes

### Version Control
- Both versions are completely independent
- Each has its own package.json
- Each has its own dependencies
- No shared code between versions (by design)

### Electron Support
- Both versions support Electron
- HTML version: Direct file loading
- React version: Vite dev server integration

### Browser Support
- Both require `backdrop-filter` CSS support
- Chrome/Edge 76+
- Safari 9+ (with -webkit- prefix)
- Firefox 103+
- Opera 63+

### Performance
- HTML version: Smaller bundle, faster load
- React version: Better development experience, HMR

---

## 🔗 Related Files

- [README.md](./README.md) - Main documentation
- [VERSIONS.md](./VERSIONS.md) - Version comparison
- [BUILD_AND_RUN.md](./BUILD_AND_RUN.md) - Build instructions
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Coding standards

---

**Last Updated**: January 31, 2025  
**Project**: SmonthlAPI v1.0.0  
**License**: Apache 2.0
