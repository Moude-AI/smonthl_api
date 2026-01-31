# SmonthlAPI - HTML/JavaScript Version

Pure HTML and JavaScript implementation of SmonthlAPI with liquid glass effects.

## 📦 Installation

### Via npm
```bash
npm install smonthl
```

## 🚀 Quick Start

After installation, you'll need the configuration file:

```javascript
const api = new SmonthlAPI();
// Load the included glass-config.json
api.loadConfig('./node_modules/smonthl/glass-config.json').then(config => {
  console.log('Configuration loaded:', config);
});
```

Or copy `glass-config.json` to your project and customize it:
```bash
cp node_modules/smonthl/glass-config.json ./my-config.json
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
