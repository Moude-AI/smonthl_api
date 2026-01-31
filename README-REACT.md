# Liquid Glass - React TypeScript Version

## Features

### Jelly Physics (Q-Soft Elastic Chewy)
- Smooth elastic spring physics
- Bouncy wobble animation when touched
- Adjustable elasticity and friction
- Slight rotation and scale for realistic jelly effect

### Snap Back Feature
- Glass automatically returns to center when dragged too far (400px default)
- Smooth snap-back animation
- Configurable snap distance and speed
- Stays sticky when within range

### Magnetic Following
- Glass attracts to cursor when nearby (150px range)
- Adjustable magnetic strength
- Only works when not dragging
- Smooth pull effect

### Cursor-Following Light
- Glowing light follows cursor near glass
- Fades based on distance
- Screen blend mode for realistic glow
- Configurable size, intensity, and color

## Configuration

All settings are in `glass-config.json`:

```json
{
  "jelly": {
    "snapBackDistance": 400,  // Distance before snap back (px)
    "snapBackSpeed": 0.05,    // Speed of snap back (0-1)
    "elasticity": 0.6,        // Jelly elasticity (0-1)
    "friction": 0.85,         // Movement friction (0-1)
    "magneticRange": 150,     // Magnetic attraction range (px)
    "magneticStrength": 0.3   // Magnetic pull strength (0-1)
  }
}
```

## Usage

### HTML Version
```bash
npm start
```
Opens `index.html` with Electron

### React TypeScript Version
```typescript
import { LiquidGlass } from './components/LiquidGlass';
import { GlassConfig } from './types/GlassConfig';

function App() {
  const [config, setConfig] = useState<GlassConfig>(defaultConfig);
  
  return <LiquidGlass config={config} onConfigChange={setConfig} />;
}
```

## API

### Load Configuration
```typescript
const config = await fetch('./glass-config.json').then(r => r.json());
```

### Update Settings
```typescript
config.jelly.snapBackDistance = 500;
config.jelly.elasticity = 0.8;
```

### Export/Import
- Click "Export JSON" to save current settings
- Click "Import JSON" to load saved settings

## Files

- `index.html` - HTML/JavaScript version (original)
- `src/App.tsx` - React TypeScript main app
- `src/components/LiquidGlass.tsx` - Main glass component
- `src/types/GlassConfig.ts` - TypeScript interfaces
- `glass-config.json` - Configuration file
- `glass-api.js` - Configuration API

## How It Works

1. **Jelly Physics**: Uses spring physics with elasticity and friction
2. **Snap Back**: Monitors distance from center, smoothly returns when > 400px
3. **Magnetic**: Calculates cursor distance, applies pull force when nearby
4. **Sticky**: Glass "sticks" to cursor within magnetic range
5. **Q-Soft**: Elastic deformation with rotation and scale effects
