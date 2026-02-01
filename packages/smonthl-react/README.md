# SmonthlAPI - React TypeScript Version

React and TypeScript implementation of SmonthlAPI - a flexible configuration system for creating glass UI components with custom sizes, shapes, icons, and effects.

## 📦 Installation

### Via npm
```bash
npm install smonthl-react
```

## 🚀 Usage in Your Project

```typescript
import { SmonthlAPI } from 'smonthl-react';
import { LiquidGlassDemo } from 'smonthl-react';
import 'smonthl-react/dist/style.css';

// Initialize API
const api = new SmonthlAPI();

// Option 1: Use default configuration (easiest)
await api.loadConfig();

// Option 2: Load the included glass-config.json
// await api.loadConfig('./node_modules/smonthl-react/glass-config.json');

// Option 3: Copy and customize your own config
// cp node_modules/smonthl-react/glass-config.json ./my-config.json
// await api.loadConfig('./my-config.json');

// Use component
function App() {
  return <LiquidGlassDemo />;
}
```

## 🎨 Create Custom Components

SmonthlAPI is flexible - create any glass component with custom sizes and shapes:

```typescript
const api = new SmonthlAPI();
await api.loadConfig();

// Create a small circular icon (80x80)
api.updateConfig('glass.width', 80);
api.updateConfig('glass.height', 80);
api.updateConfig('glass.borderRadius', 40);
api.updateConfig('content.type', 'icon');
api.updateConfig('content.icon', '🚀');

// Create a wide button (300x70)
api.updateConfig('glass.width', 300);
api.updateConfig('glass.height', 70);
api.updateConfig('glass.borderRadius', 35);
api.updateConfig('content.title', 'Click Me');

// Create a large window (1000x700)
api.updateConfig('glass.width', 1000);
api.updateConfig('glass.height', 700);
api.updateConfig('glass.borderRadius', 16);

// Use templates for quick setup
const iconConfig = api.createFromTemplate('icon');
const cardConfig = api.createFromTemplate('card');
const menuConfig = api.createFromTemplate('menu');
```

## Features

- Full TypeScript type safety
- React hooks for state management
- Liquid glass effects with magnifying lens
- Jelly physics animations
- Magnetic cursor following
- Dynamic cursor lights
- Real-time configuration controls
- Import/Export JSON configuration

## Installation

```bash
npm install
```

## Running

### Development Mode (Browser)
```bash
npm run dev
```
This will start Vite dev server at http://localhost:5173

### Development Mode (Electron)
```bash
npm run dev:electron
```
This will start Electron app (make sure Vite dev server is running first)

### Development Mode (Both)
```bash
npm run dev:all
```
This will start both Vite dev server and Electron app concurrently

### Build for Production
```bash
npm run build
```

### Build Electron App
```bash
npm run build:electron
```
This will create distributable Electron apps in `dist-electron/`

## Project Structure

```
tsx-react-ver/
├── src/
│   ├── components/
│   │   ├── LiquidGlassDemo.tsx    # Main component
│   │   └── LiquidGlassDemo.css    # Styles
│   ├── types/
│   │   └── SmonthlAPI.ts          # TypeScript types & API
│   ├── App-React.tsx              # App component
│   └── index-react.tsx            # Entry point
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── glass-config.json               # SmonthlAPI configuration
└── package.json                    # Dependencies
```

## Components

### LiquidGlassDemo
Main component that renders the liquid glass effect with all controls.

**Features:**
- Draggable glass container
- Jelly physics with spring animations
- Magnetic cursor attraction
- Dynamic cursor lighting
- Real-time configuration updates
- Background image rotation

### SmonthlAPI
TypeScript class for configuration management.

**Methods:**
- `loadConfig(url)` - Load configuration from JSON
- `updateConfig(path, value)` - Update configuration value
- `getConfig(path)` - Get configuration value
- `exportConfig()` - Export as JSON string
- `importConfig(json)` - Import from JSON string
- `createFromTemplate(name)` - Create from template
- `saveToLocalStorage()` - Save to localStorage
- `loadFromLocalStorage()` - Load from localStorage

## Configuration

Edit `glass-config.json` to customize all aspects:

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

## TypeScript Types

All types are defined in `src/types/SmonthlAPI.ts`:
- `GlassConfig` - Glass visual properties
- `JellyConfig` - Physics parameters
- `LightingConfig` - Cursor light settings
- `SmonthlConfig` - Complete configuration
- `SmonthlAPI` - API class

## Development

### Hot Module Replacement
Vite provides instant HMR for fast development.

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## Building

```bash
npm run build
```

Output will be in `dist/` directory.

## Browser Support

- Chrome/Edge 76+
- Safari 9+ (with -webkit- prefix)
- Firefox 103+
- Opera 63+

Requires `backdrop-filter` CSS support for glass effects.
