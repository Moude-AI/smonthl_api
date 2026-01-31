# SmonthlAPI Usage Guide

Complete guide for using SmonthlAPI in your projects.

## 📦 Installation

### HTML/JavaScript Version
```bash
npm install smonthl
```

### React TypeScript Version
```bash
npm install smonthl-react
```

---

## 🚀 Quick Start

### HTML Version

#### 1. Basic Setup
```html
<!DOCTYPE html>
<html>
<head>
  <title>SmonthlAPI Demo</title>
</head>
<body>
  <div id="glass-container"></div>
  
  <script src="node_modules/smonthl/smonthl-api.js"></script>
  <script>
    // Initialize SmonthlAPI
    const api = new SmonthlAPI();
    
    // Load configuration
    api.loadConfig('./node_modules/smonthl/glass-config.json').then(config => {
      console.log('Configuration loaded:', config);
    });
  </script>
</body>
</html>
```

#### 2. Custom Configuration
```javascript
const api = new SmonthlAPI();

// Load default config
await api.loadConfig();

// Update specific values
api.updateConfig('glass.blur', 80);
api.updateConfig('glass.transparency', 10);
api.updateConfig('jelly.elasticity', 0.8);
api.updateConfig('jelly.magneticStrength', 0.5);
```

#### 3. Using Templates
```javascript
const api = new SmonthlAPI();
await api.loadConfig();

// Create button from template
const buttonConfig = api.createFromTemplate('button');
console.log('Button config:', buttonConfig);

// Create card from template
const cardConfig = api.createFromTemplate('card');

// Create window from template
const windowConfig = api.createFromTemplate('window');

// Get all templates
const templates = api.getTemplates();
console.log('Available templates:', Object.keys(templates));
```

---

### React Version

#### 1. Basic Setup
```typescript
import React from 'react';
import { LiquidGlassDemo } from 'smonthl-react';
import 'smonthl-react/dist/assets/index-o7YR0u-a.css';

function App() {
  return (
    <div className="App">
      <LiquidGlassDemo />
    </div>
  );
}

export default App;
```

#### 2. Using SmonthlAPI
```typescript
import { SmonthlAPI } from 'smonthl-react';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [api] = useState(() => new SmonthlAPI());
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.loadConfig().then(cfg => {
      setConfig(cfg);
    });
  }, [api]);

  const handleUpdateBlur = (value: number) => {
    api.updateConfig('glass.blur', value);
  };

  return (
    <div>
      <h1>{config?.content.title}</h1>
      <button onClick={() => handleUpdateBlur(100)}>
        Increase Blur
      </button>
    </div>
  );
}
```

#### 3. Custom Component with Glass Effect
```typescript
import React from 'react';
import { SmonthlAPI } from 'smonthl-react';
import 'smonthl-react/dist/assets/index-o7YR0u-a.css';

interface GlassCardProps {
  title: string;
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ title, children }) => {
  const api = new SmonthlAPI();
  const config = api.getDefaultConfig();

  return (
    <div 
      style={{
        background: `rgba(255, 255, 255, ${config.glass.transparency / 100})`,
        backdropFilter: `blur(${config.glass.blur}px)`,
        borderRadius: `${config.glass.borderRadius}px`,
        padding: '20px'
      }}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default GlassCard;
```

---

## ⚙️ Configuration

### Configuration Structure

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
    "subtitle": "Real lens magnification"
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
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
  ],
  "backgroundChangeInterval": 10000
}
```

### Configuration Options

#### Glass Properties
- `transparency` (0-30): Glass transparency percentage
- `blur` (10-150): Backdrop filter blur amount in pixels
- `magnifyingBlur` (10-80): Magnifying lens blur amount
- `magnifyingBrightness` (100-150): Magnifying lens brightness percentage
- `lensSize` (20-80): Magnifying lens size in pixels
- `borderRadius` (8-60): Corner radius in pixels
- `width` / `height`: Component dimensions

#### Jelly Physics
- `enabled` (boolean): Enable/disable jelly physics
- `elasticity` (0-1): Spring elasticity (0.6 recommended)
- `friction` (0-1): Movement friction (0.85 recommended)
- `bounceIntensity` (0-30): Bounce strength
- `wobbleSpeed` (0-1): Wobble animation speed
- `magneticRange` (0-300): Magnetic attraction range in pixels
- `magneticStrength` (0-1): Magnetic force strength

#### Lighting
- `cursorFollowEnabled` (boolean): Enable cursor light
- `followDistance` (0-500): Light follow distance
- `lightIntensity` (0-1): Light brightness
- `lightSize` (50-300): Light size in pixels
- `lightColor` (RGB): Light color as "R, G, B"

---

## 🎯 API Methods

### SmonthlAPI Class

#### `loadConfig(url?: string): Promise<SmonthlConfig>`
Load configuration from JSON file.

```javascript
const api = new SmonthlAPI();
const config = await api.loadConfig('./my-config.json');
```

#### `getDefaultConfig(): SmonthlConfig`
Get default configuration.

```javascript
const api = new SmonthlAPI();
const defaultConfig = api.getDefaultConfig();
```

#### `updateConfig(path: string, value: any): void`
Update configuration value using dot notation.

```javascript
api.updateConfig('glass.blur', 80);
api.updateConfig('jelly.elasticity', 0.7);
api.updateConfig('lighting.cursorFollowEnabled', false);
```

#### `getConfig(path: string): any`
Get configuration value using dot notation.

```javascript
const blur = api.getConfig('glass.blur');
const elasticity = api.getConfig('jelly.elasticity');
```

#### `createFromTemplate(templateName: string): SmonthlConfig | null`
Create configuration from template.

```javascript
const buttonConfig = api.createFromTemplate('button');
const cardConfig = api.createFromTemplate('card');
const windowConfig = api.createFromTemplate('window');
const iconConfig = api.createFromTemplate('icon');
const menuConfig = api.createFromTemplate('menu');
```

#### `getTemplates(): Record<string, Partial<SmonthlConfig>>`
Get all available templates.

```javascript
const templates = api.getTemplates();
console.log(Object.keys(templates)); // ['button', 'card', 'window', 'icon', 'menu']
```

#### `exportConfig(): string`
Export configuration as JSON string.

```javascript
const jsonString = api.exportConfig();
console.log(jsonString);
```

#### `importConfig(jsonString: string): boolean`
Import configuration from JSON string.

```javascript
const success = api.importConfig(jsonString);
if (success) {
  console.log('Configuration imported successfully');
}
```

#### `saveToLocalStorage(): void`
Save configuration to browser localStorage.

```javascript
api.saveToLocalStorage();
```

#### `loadFromLocalStorage(): boolean`
Load configuration from browser localStorage.

```javascript
const loaded = api.loadFromLocalStorage();
if (loaded) {
  console.log('Configuration loaded from localStorage');
}
```

#### `on(event: string, callback: Function): void`
Add event listener.

```javascript
api.on('configLoaded', (config) => {
  console.log('Config loaded:', config);
});

api.on('configUpdated', ({ path, value }) => {
  console.log(`Updated ${path} to ${value}`);
});

api.on('configImported', (config) => {
  console.log('Config imported:', config);
});
```

---

## 🎨 Examples

### Example 1: Dynamic Blur Control

```html
<input type="range" id="blurSlider" min="10" max="150" value="60">
<div id="glassElement"></div>

<script>
  const api = new SmonthlAPI();
  await api.loadConfig();
  
  const slider = document.getElementById('blurSlider');
  const element = document.getElementById('glassElement');
  
  slider.addEventListener('input', (e) => {
    const blur = e.target.value;
    api.updateConfig('glass.blur', parseInt(blur));
    element.style.backdropFilter = `blur(${blur}px)`;
  });
</script>
```

### Example 2: Template Switcher

```javascript
const api = new SmonthlAPI();
await api.loadConfig();

function switchTemplate(templateName) {
  const config = api.createFromTemplate(templateName);
  if (config) {
    // Apply configuration to your component
    applyGlassEffect(config);
  }
}

// Switch to button template
switchTemplate('button');

// Switch to card template
switchTemplate('card');
```

### Example 3: React Hook

```typescript
import { useState, useEffect } from 'react';
import { SmonthlAPI, SmonthlConfig } from 'smonthl-react';

function useSmonthlAPI() {
  const [api] = useState(() => new SmonthlAPI());
  const [config, setConfig] = useState<SmonthlConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.loadConfig().then(cfg => {
      setConfig(cfg);
      setLoading(false);
    });

    api.on('configUpdated', ({ path, value }) => {
      setConfig({ ...api.config });
    });
  }, [api]);

  const updateConfig = (path: string, value: any) => {
    api.updateConfig(path, value);
  };

  return { api, config, loading, updateConfig };
}

// Usage
function MyComponent() {
  const { config, loading, updateConfig } = useSmonthlAPI();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{config?.content.title}</h1>
      <button onClick={() => updateConfig('glass.blur', 100)}>
        Increase Blur
      </button>
    </div>
  );
}
```

### Example 4: Save/Load Configuration

```javascript
const api = new SmonthlAPI();
await api.loadConfig();

// Modify configuration
api.updateConfig('glass.blur', 80);
api.updateConfig('jelly.elasticity', 0.8);

// Save to localStorage
api.saveToLocalStorage();

// Later, load from localStorage
const loaded = api.loadFromLocalStorage();
if (loaded) {
  console.log('Configuration restored');
}
```

### Example 5: Export/Import Configuration

```javascript
const api = new SmonthlAPI();
await api.loadConfig();

// Export configuration
const jsonString = api.exportConfig();

// Save to file (browser)
const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'my-glass-config.json';
a.click();

// Import configuration
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'application/json';
fileInput.onchange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const success = api.importConfig(event.target.result);
    if (success) {
      console.log('Configuration imported');
    }
  };
  reader.readAsText(file);
};
fileInput.click();
```

---

## 🌐 Browser Support

SmonthlAPI requires `backdrop-filter` CSS support:

- ✅ Chrome/Edge 76+
- ✅ Safari 9+ (with -webkit- prefix)
- ✅ Firefox 103+
- ✅ Opera 63+

### Fallback for Unsupported Browsers

```css
.glass-element {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

@supports not (backdrop-filter: blur(10px)) {
  .glass-element {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

---

## 🔧 Troubleshooting

### Issue: Glass effect not visible
**Solution**: Ensure element has content behind it and backdrop-filter is supported.

### Issue: Jelly physics not working
**Solution**: Check that `jelly.enabled` is `true` in configuration.

### Issue: Configuration not loading
**Solution**: Verify JSON file path and format. Check browser console for errors.

### Issue: TypeScript errors
**Solution**: Import types from package:
```typescript
import { SmonthlAPI, SmonthlConfig } from 'smonthl-react';
```

---

## 📚 Additional Resources

- [README.md](./README.md) - Project overview
- [VERSIONS.md](./VERSIONS.md) - Version comparison
- [BUILD_AND_RUN.md](./BUILD_AND_RUN.md) - Build instructions
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Coding standards
- [ET.md](./ET.md) - Environment trees
- [FEATURES.md](./FEATURES.md) - Feature list
- [LIQUID_GLASS_GUIDE.md](./LIQUID_GLASS_GUIDE.md) - Glass effects guide
- [JSON_CONFIG_GUIDE.md](./JSON_CONFIG_GUIDE.md) - Configuration reference

---

## 🤝 Support

- **GitHub**: https://github.com/Moude-AI/smonthl_api
- **Issues**: https://github.com/Moude-AI/smonthl_api/issues
- **npm (HTML)**: https://www.npmjs.com/package/smonthl
- **npm (React)**: https://www.npmjs.com/package/smonthl-react

---

**Version**: 1.0.1  
**License**: Apache-2.0  
**Author**: Arthurc1Moude
