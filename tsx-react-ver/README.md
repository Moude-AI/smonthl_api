# SmonthlAPI - React TypeScript Version

React and TypeScript implementation of SmonthlAPI with liquid glass effects.

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

### Development Mode
```bash
npm run dev
```

This will start Vite dev server at http://localhost:5173

### Build for Production
```bash
npm run build
```

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
