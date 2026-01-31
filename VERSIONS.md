# SmonthlAPI - Version Guide

SmonthlAPI is available in two versions:

## 📁 Versions

### 1. HTML/JavaScript Version (`/html-ver`)

Pure HTML and vanilla JavaScript implementation.

**Best for:**
- Quick demos and prototypes
- Learning the API
- Embedding in existing HTML pages
- No build tools required

**Features:**
- ✅ Zero dependencies (except Electron for desktop)
- ✅ Works directly in browser
- ✅ Simple to understand
- ✅ Easy to customize

**Quick Start:**
```bash
cd html-ver
# Open index.html in browser
# OR run with Electron:
npm install
npm start
```

**Files:**
- `index.html` - Complete demo with UI
- `smonthl-api.js` - Core API implementation
- `glass-config.json` - Configuration file

---

### 2. React TypeScript Version (`/tsx-react-ver`)

Modern React with TypeScript and Vite.

**Best for:**
- Production applications
- Type-safe development
- React projects
- Component-based architecture

**Features:**
- ✅ Full TypeScript support
- ✅ React hooks
- ✅ Hot Module Replacement (HMR)
- ✅ Type-safe API
- ✅ Modern build tools (Vite)

**Quick Start:**
```bash
cd tsx-react-ver
npm install
npm run dev
```

**Structure:**
```
tsx-react-ver/
├── src/
│   ├── components/
│   │   ├── LiquidGlassDemo.tsx
│   │   └── LiquidGlassDemo.css
│   ├── types/
│   │   └── SmonthlAPI.ts
│   ├── App-React.tsx
│   └── index-react.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Features Comparison

| Feature | HTML/JS | React/TS |
|---------|---------|----------|
| Liquid Glass Effects | ✅ | ✅ |
| Magnifying Lens | ✅ | ✅ |
| Jelly Physics | ✅ | ✅ |
| Magnetic Following | ✅ | ✅ |
| Cursor Lights | ✅ | ✅ |
| Configuration API | ✅ | ✅ |
| Import/Export Config | ✅ | ✅ |
| Type Safety | ❌ | ✅ |
| Hot Reload | ❌ | ✅ |
| Build Tools | ❌ | ✅ |
| Component Reusability | ❌ | ✅ |
| Bundle Size | Smaller | Larger |
| Learning Curve | Easy | Moderate |

---

## 🚀 Which Version Should I Use?

### Choose HTML/JS if:
- You want to quickly test the API
- You're building a simple demo
- You don't need a build process
- You prefer vanilla JavaScript
- You want minimal dependencies

### Choose React/TS if:
- You're building a production app
- You want type safety
- You're already using React
- You need component reusability
- You want modern development tools

---

## 📦 SmonthlAPI Core Features

Both versions include the complete SmonthlAPI:

### Configuration Management
```javascript
const api = new SmonthlAPI();
await api.loadConfig('./glass-config.json');
api.updateConfig('glass.blur', 60);
api.exportConfig(); // JSON string
```

### Templates
```javascript
const buttonConfig = api.createFromTemplate('button');
const cardConfig = api.createFromTemplate('card');
const windowConfig = api.createFromTemplate('window');
```

### Event System
```javascript
api.on('configLoaded', (config) => {
  console.log('Config loaded:', config);
});

api.on('configUpdated', ({ path, value }) => {
  console.log(`Updated ${path} to ${value}`);
});
```

### Persistence
```javascript
api.saveToLocalStorage();
api.loadFromLocalStorage();
```

---

## 🎯 Configuration

Both versions use the same `glass-config.json` format:

```json
{
  "componentType": "liquid-glass",
  "glass": {
    "transparency": 6,
    "blur": 60,
    "magnifyingBlur": 30,
    "magnifyingBrightness": 115,
    "lensSize": 40,
    "borderRadius": 32
  },
  "jelly": {
    "enabled": true,
    "elasticity": 0.6,
    "friction": 0.85,
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

## 📚 Documentation

- [BUILD_AND_RUN.md](./BUILD_AND_RUN.md) - Build and run instructions
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Coding standards
- [LIQUID_GLASS_GUIDE.md](./LIQUID_GLASS_GUIDE.md) - Glass effects guide
- [JSON_CONFIG_GUIDE.md](./JSON_CONFIG_GUIDE.md) - Configuration reference

---

## 🌐 Browser Support

Both versions require `backdrop-filter` CSS support:

- Chrome/Edge 76+
- Safari 9+ (with -webkit- prefix)
- Firefox 103+
- Opera 63+

---

## 📄 License

Apache 2.0 License - See [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Contributions welcome! Please read the [STYLE_GUIDE.md](./STYLE_GUIDE.md) first.

---

## 📧 Contact

- GitHub: https://github.com/Moude-AI/smonthl_api
- Issues: https://github.com/Moude-AI/smonthl_api/issues
