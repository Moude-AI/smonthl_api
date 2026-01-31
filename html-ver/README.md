# SmonthlAPI - HTML/JavaScript Version

Pure HTML and JavaScript implementation of SmonthlAPI - a flexible configuration system for creating glass UI components with custom sizes, shapes, icons, and effects.

## 📦 Installation

### Via npm
```bash
npm install smonthl
```

## 🚀 Quick Start

```javascript
const api = new SmonthlAPI();

// Option 1: Use default configuration (easiest)
api.loadConfig().then(config => {
  console.log('Configuration loaded:', config);
});

// Option 2: Load the included glass-config.json
// api.loadConfig('./node_modules/smonthl/glass-config.json');

// Option 3: Copy and customize your own config
// cp node_modules/smonthl/glass-config.json ./my-config.json
// api.loadConfig('./my-config.json');
```

## 🎨 Create Custom Components

SmonthlAPI is flexible - create any glass component with custom sizes and shapes:

```javascript
const api = new SmonthlAPI();
await api.loadConfig();

// Create a small circular icon button (60x60)
api.updateConfig('glass.width', 60);
api.updateConfig('glass.height', 60);
api.updateConfig('glass.borderRadius', 30);
api.updateConfig('content.icon', '🎨');

// Create a large card (500x300)
api.updateConfig('glass.width', 500);
api.updateConfig('glass.height', 300);
api.updateConfig('glass.borderRadius', 20);
api.updateConfig('content.title', 'My Card');

// Create a custom window (800x600)
api.updateConfig('glass.width', 800);
api.updateConfig('glass.height', 600);
api.updateConfig('glass.borderRadius', 12);
```

## Features

- Liquid glass effects with magnifying lens
- Jelly physics animations
- Magnetic cursor following
- Dynamic cursor lights
- Real-time configuration controls
- Import/Export JSON configuration

## Running

### Option 1: Direct Browser
Simply open `index.html` in your browser.

### Option 2: Electron (Recommended)
```bash
npm install
npm start
```

Or for development:
```bash
npm run dev
```

## Files

- `index.html` - Main HTML file with all functionality
- `smonthl-api.js` - SmonthlAPI JavaScript implementation
- `glass-config.json` - Configuration file
- `package.json` - Electron package configuration

## Configuration

Edit `glass-config.json` to customize:
- Glass transparency and blur
- Magnifying lens effects
- Jelly physics parameters
- Magnetic following strength
- Cursor light effects
- Background images

## Controls

Use the control panel on the right to adjust:
- Transparency (0-30%)
- Blur Amount (10-150px)
- Magnifying Blur (10-80px)
- Magnifying Brightness (100-150%)
- Lens Size (20-80px)
- Border Radius (8-60px)
- Jelly Elasticity (0-100%)
- Magnetic Strength (0-100%)

## Export/Import

- **Export JSON**: Save current configuration
- **Import JSON**: Load configuration from file
- **Reset**: Restore default settings
