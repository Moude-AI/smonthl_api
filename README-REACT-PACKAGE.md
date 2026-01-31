# @liquid-glass/react

Beautiful frosted glass UI component with jelly physics, magnetic following, and cursor lights for React/TypeScript.

![Version](https://img.shields.io/npm/v/@liquid-glass/react)
![License](https://img.shields.io/npm/l/@liquid-glass/react)
![Downloads](https://img.shields.io/npm/dt/@liquid-glass/react)

## ✨ Features

- 🌊 **Liquid Glass Effect** - Realistic frosted glass with backdrop blur
- 🎯 **Jelly Physics** - Q-soft elastic bouncy movement
- 🧲 **Magnetic Following** - Glass attracts to cursor when nearby
- 🔙 **Snap Back** - Returns to center when dragged too far
- 💡 **Cursor Light** - Glowing light follows your cursor
- 🎨 **Fully Configurable** - TypeScript interfaces
- ⚛️ **React Hooks** - Modern React patterns
- 📘 **TypeScript** - Full type safety

## 🚀 Installation

```bash
npm install @liquid-glass/react
# or
yarn add @liquid-glass/react
# or
pnpm add @liquid-glass/react
```

## 📖 Usage

### Basic Usage

```tsx
import React from 'react';
import { LiquidGlass } from '@liquid-glass/react';
import type { GlassConfig } from '@liquid-glass/react';

function App() {
  const config: GlassConfig = {
    glass: {
      transparency: 6,
      blur: 60,
      borderRadius: 32,
      width: 700,
      height: 140
    },
    jelly: {
      enabled: true,
      elasticity: 0.6,
      snapBackDistance: 400,
      magneticStrength: 0.3
    },
    lighting: {
      cursorFollowEnabled: true,
      lightIntensity: 0.8
    }
  };

  return <LiquidGlass config={config} />;
}
```

### With State Management

```tsx
import React, { useState } from 'react';
import { LiquidGlass } from '@liquid-glass/react';
import type { GlassConfig } from '@liquid-glass/react';

function App() {
  const [config, setConfig] = useState<GlassConfig>({
    // ... config
  });

  const handleConfigChange = (newConfig: GlassConfig) => {
    setConfig(newConfig);
    // Save to localStorage, API, etc.
  };

  return (
    <LiquidGlass 
      config={config} 
      onConfigChange={handleConfigChange}
    />
  );
}
```

### Load from JSON

```tsx
import React, { useEffect, useState } from 'react';
import { LiquidGlass } from '@liquid-glass/react';

function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('./glass-config.json')
      .then(res => res.json())
      .then(data => setConfig(data));
  }, []);

  if (!config) return <div>Loading...</div>;

  return <LiquidGlass config={config} />;
}
```

## 📘 TypeScript Types

```typescript
interface GlassConfig {
  glass: {
    transparency: number;      // 0-30
    blur: number;             // 10-150
    magnifyingBlur: number;   // 10-80
    magnifyingBrightness: number; // 100-150
    lensSize: number;         // 20-80
    borderRadius: number;     // 8-60
    width: number;
    height: number;
  };
  jelly: {
    enabled: boolean;
    elasticity: number;       // 0-1
    friction: number;         // 0-1
    bounceIntensity: number;
    wobbleSpeed: number;
    magneticRange: number;    // px
    magneticStrength: number; // 0-1
    snapBackDistance: number; // px
    snapBackSpeed: number;    // 0-1
  };
  lighting: {
    cursorFollowEnabled: boolean;
    followDistance: number;   // px
    lightIntensity: number;   // 0-1
    lightSize: number;        // px
    lightColor: string;       // "R, G, B"
  };
  backgrounds: string[];
  backgroundChangeInterval: number;
}
```

## 🎮 Props

### LiquidGlass Component

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `GlassConfig` | Yes | Configuration object |
| `onConfigChange` | `(config: GlassConfig) => void` | No | Callback when config changes |

## ⚙️ Configuration

### Glass Settings
```typescript
glass: {
  transparency: 6,        // Glass opacity (0-30)
  blur: 60,              // Backdrop blur (10-150px)
  magnifyingBlur: 30,    // Lens blur (10-80px)
  borderRadius: 32,      // Corner roundness (8-60px)
  width: 700,            // Width in pixels
  height: 140            // Height in pixels
}
```

### Jelly Physics
```typescript
jelly: {
  enabled: true,
  elasticity: 0.6,           // Bounce strength (0-1)
  friction: 0.85,            // Movement damping (0-1)
  snapBackDistance: 400,     // Distance before snap back (px)
  snapBackSpeed: 0.05,       // Snap back speed (0-1)
  magneticRange: 150,        // Magnetic range (px)
  magneticStrength: 0.3      // Magnetic force (0-1)
}
```

### Lighting
```typescript
lighting: {
  cursorFollowEnabled: true,
  followDistance: 200,       // Activation range (px)
  lightIntensity: 0.8,       // Brightness (0-1)
  lightSize: 120,            // Diameter (px)
  lightColor: "255, 255, 255" // RGB values
}
```

## 🎨 Styling

The component uses CSS modules. You can override styles:

```css
.glass-container {
  /* Your custom styles */
}

.cursor-light {
  /* Custom light styles */
}
```

## 📦 Build & Publish

```bash
# Install dependencies
npm install

# Build library
npm run build

# Run tests
npm test

# Publish to NPM
npm run publish
```

## 🌐 Browser Support

- Chrome/Edge 76+
- Firefox 103+
- Safari 15.4+
- Opera 63+

## 📄 License

MIT © 2024

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md)

## 🐛 Issues

Report bugs at [GitHub Issues](https://github.com/yourusername/liquid-glass-react/issues)

## 📚 Examples

Check out the [examples](./examples) directory for more usage patterns:
- Basic usage
- With Redux
- With Context API
- Custom styling
- Dynamic configuration
