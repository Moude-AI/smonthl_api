# @liquid-glass/html

Beautiful frosted glass UI with jelly physics, magnetic following, and cursor lights.

![Version](https://img.shields.io/npm/v/@liquid-glass/html)
![License](https://img.shields.io/npm/l/@liquid-glass/html)
![Downloads](https://img.shields.io/npm/dt/@liquid-glass/html)

## ✨ Features

- 🌊 **Liquid Glass Effect** - Realistic frosted glass with backdrop blur
- 🎯 **Jelly Physics** - Q-soft elastic bouncy movement
- 🧲 **Magnetic Following** - Glass attracts to cursor when nearby
- 🔙 **Snap Back** - Returns to center when dragged too far
- 💡 **Cursor Light** - Glowing light follows your cursor
- 🎨 **Fully Configurable** - JSON-based configuration
- 📦 **Zero Dependencies** - Pure HTML/JavaScript

## 🚀 Installation

### NPM
```bash
npm install @liquid-glass/html
```

### CDN
```html
<script src="https://unpkg.com/@liquid-glass/html@latest/glass-api.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@liquid-glass/html@latest/index.html">
```

### Download
Download the latest release from [GitHub Releases](https://github.com/yourusername/liquid-glass-html/releases)

## 📖 Usage

### Basic Usage
```html
<!DOCTYPE html>
<html>
<head>
  <title>Liquid Glass</title>
</head>
<body>
  <script src="smonthl-api.js"></script>
  <script>
    const smonthlAPI = new SmonthlAPI();
    smonthlAPI.loadConfig('./glass-config.json');
  </script>
</body>
</html>
```

### Configuration
Create `glass-config.json`:
```json
{
  "glass": {
    "transparency": 6,
    "blur": 60,
    "borderRadius": 32
  },
  "jelly": {
    "enabled": true,
    "elasticity": 0.6,
    "snapBackDistance": 400,
    "magneticStrength": 0.3
  },
  "lighting": {
    "cursorFollowEnabled": true,
    "lightIntensity": 0.8
  }
}
```

### API

```javascript
// Load configuration
const config = await smonthlAPI.loadConfig('./glass-config.json');

// Update settings
smonthlAPI.updateConfig('jelly.elasticity', 0.8);
smonthlAPI.updateConfig('glass.blur', 80);

// Export configuration
const json = smonthlAPI.exportConfig();

// Import configuration
smonthlAPI.importConfig(jsonString);

// Save to localStorage
smonthlAPI.saveToLocalStorage();

// Load from localStorage
smonthlAPI.loadFromLocalStorage();
```

## 🎮 Controls

- **Drag** - Move the glass window
- **Release far away** - Watch it snap back to center
- **Move cursor near** - See magnetic attraction
- **Adjust sliders** - Real-time configuration

## ⚙️ Configuration Options

### Glass Settings
- `transparency` (0-30) - Glass opacity
- `blur` (10-150) - Backdrop blur amount
- `magnifyingBlur` (10-80) - Lens blur effect
- `borderRadius` (8-60) - Corner roundness

### Jelly Physics
- `elasticity` (0-1) - Bounce strength
- `friction` (0-1) - Movement damping
- `snapBackDistance` (px) - Distance before snap back
- `snapBackSpeed` (0-1) - Snap back speed
- `magneticRange` (px) - Magnetic attraction range
- `magneticStrength` (0-1) - Magnetic pull force

### Lighting
- `cursorFollowEnabled` (boolean) - Enable cursor light
- `followDistance` (px) - Light activation range
- `lightIntensity` (0-1) - Light brightness
- `lightSize` (px) - Light diameter

## 📦 Build & Publish

```bash
# Install dependencies
npm install

# Run locally
npm start

# Build for production
npm run build

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

Report bugs at [GitHub Issues](https://github.com/yourusername/liquid-glass-html/issues)
