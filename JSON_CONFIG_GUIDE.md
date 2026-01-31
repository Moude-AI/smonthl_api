# 🌊 Liquid Glass JSON Configuration Guide

The `glass-config.json` file is a powerful configuration system that lets you create **any type of liquid glass component** - buttons, windows, cards, icons, menus, and more!

## 📋 Configuration Structure

```json
{
  "componentType": "liquid-glass",
  "glass": { /* glass properties */ },
  "content": { /* content properties */ },
  "jelly": { /* physics properties */ },
  "lighting": { /* lighting effects */ },
  "backgrounds": [ /* background images */ ],
  "templates": { /* component templates */ }
}
```

---

## 🎨 Glass Properties

Control the appearance of the frosted glass effect:

```json
"glass": {
  "transparency": 6,        // 0-30: Glass opacity
  "blur": 60,              // 10-150: Backdrop blur amount
  "magnifyingBlur": 30,    // 10-80: Magnifying lens blur
  "magnifyingBrightness": 115, // 100-150: Lens brightness
  "lensSize": 40,          // 20-80: Magnifying lens size
  "borderRadius": 32,      // 8-60: Corner roundness
  "width": 700,            // Component width in pixels
  "height": 140            // Component height in pixels
}
```

---

## 📝 Content Properties

Define what appears inside the component:

```json
"content": {
  "type": "text",                    // text, icon, menu, custom
  "title": "My Glass Component",     // Main heading
  "subtitle": "Description here",    // Subtitle text
  "icon": "🏠",                      // Icon emoji/character
  "label": "Home",                   // Icon label
  "items": [                         // Menu items
    { "label": "Item 1", "icon": "📄" }
  ]
}
```

---

## 🎯 Jelly Physics

Control the elastic, bouncy movement:

```json
"jelly": {
  "enabled": true,           // Enable/disable jelly physics
  "elasticity": 0.6,        // 0-1: Bounce strength
  "friction": 0.85,         // 0-1: Movement damping
  "bounceIntensity": 15,    // Bounce power
  "wobbleSpeed": 0.3,       // Wobble animation speed
  "magneticRange": 150,     // Magnetic attraction range (px)
  "magneticStrength": 0.3   // 0-1: Magnetic pull force
}
```

---

## 💡 Lighting Effects

Configure cursor-following light:

```json
"lighting": {
  "cursorFollowEnabled": true,  // Enable cursor light
  "followDistance": 200,        // Activation range (px)
  "lightIntensity": 0.8,       // 0-1: Light brightness
  "lightSize": 120,            // Light diameter (px)
  "lightColor": "255, 255, 255" // RGB color values
}
```

---

## 🖼️ Backgrounds

Beautiful rotating background images:

```json
"backgrounds": [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80"
],
"backgroundChangeInterval": 10000  // Change every 10 seconds
```

---

## 🎭 Templates

Create reusable component templates for different types:

### Button Template
```json
"templates": {
  "button": {
    "componentType": "button",
    "glass": {
      "transparency": 10,
      "blur": 20,
      "borderRadius": 12,
      "width": 150,
      "height": 50
    },
    "content": {
      "type": "text",
      "title": "Glass Button"
    }
  }
}
```

### Card Template
```json
"card": {
  "componentType": "card",
  "glass": {
    "transparency": 8,
    "blur": 30,
    "borderRadius": 16,
    "width": 300,
    "height": 200
  },
  "content": {
    "type": "text",
    "title": "Glass Card",
    "subtitle": "Card content here"
  }
}
```

### Window Template
```json
"window": {
  "componentType": "window",
  "glass": {
    "transparency": 8,
    "blur": 40,
    "borderRadius": 16,
    "width": 500,
    "height": 400
  },
  "content": {
    "type": "text",
    "title": "Glass Window",
    "subtitle": "Window content"
  },
  "draggable": true,
  "resizable": true
}
```

### Icon Template
```json
"icon": {
  "componentType": "icon",
  "glass": {
    "transparency": 10,
    "blur": 20,
    "borderRadius": 50,
    "width": 64,
    "height": 64
  },
  "content": {
    "type": "icon",
    "icon": "🏠",
    "label": "Home"
  }
}
```

### Menu Template
```json
"menu": {
  "componentType": "menu",
  "glass": {
    "transparency": 10,
    "blur": 40,
    "borderRadius": 12,
    "width": 200
  },
  "content": {
    "type": "menu",
    "items": [
      { "label": "New File", "icon": "📄" },
      { "label": "Open", "icon": "📂" },
      { "label": "Save", "icon": "💾" }
    ]
  }
}
```

---

## 🚀 Using the API

### JavaScript (HTML version)

```javascript
// Load configuration
const smonthlAPI = new SmonthlAPI();
const config = await smonthlAPI.loadConfig('./glass-config.json');

// Create component from template
const buttonConfig = smonthlAPI.createFromTemplate('button');
const cardConfig = smonthlAPI.createFromTemplate('card');
const windowConfig = smonthlAPI.createFromTemplate('window');

// Get all available templates
const templates = smonthlAPI.getTemplates();
console.log(templates); // { button: {...}, card: {...}, window: {...} }

// Update configuration
smonthlAPI.updateConfig('glass.blur', 80);
smonthlAPI.updateConfig('jelly.elasticity', 0.8);

// Export/Import
const json = smonthlAPI.exportConfig();
smonthlAPI.importConfig(jsonString);

// Save to localStorage
smonthlAPI.saveToLocalStorage();
smonthlAPI.loadFromLocalStorage();
```

### TypeScript (React version)

```typescript
import { GlassConfig } from './types/GlassConfig';

// Load from JSON
const response = await fetch('./glass-config.json');
const config: GlassConfig = await response.json();

// Use template
const buttonConfig = {
  ...config,
  ...config.templates?.button
};

// Create component
<LiquidGlass config={buttonConfig} />
```

---

## 🎨 Creating Custom Components

You can create **any component** by modifying the JSON:

### Example: Notification Toast
```json
{
  "componentType": "toast",
  "glass": {
    "transparency": 8,
    "blur": 30,
    "borderRadius": 12,
    "width": 350,
    "height": 80
  },
  "content": {
    "type": "text",
    "title": "Notification",
    "subtitle": "Your action was successful!"
  },
  "jelly": {
    "enabled": true,
    "elasticity": 0.4
  }
}
```

### Example: Modal Dialog
```json
{
  "componentType": "modal",
  "glass": {
    "transparency": 6,
    "blur": 50,
    "borderRadius": 20,
    "width": 600,
    "height": 400
  },
  "content": {
    "type": "text",
    "title": "Confirm Action",
    "subtitle": "Are you sure you want to proceed?"
  },
  "draggable": false
}
```

### Example: Sidebar
```json
{
  "componentType": "sidebar",
  "glass": {
    "transparency": 10,
    "blur": 40,
    "borderRadius": 0,
    "width": 250,
    "height": "100vh"
  },
  "content": {
    "type": "menu",
    "items": [
      { "label": "Dashboard", "icon": "📊" },
      { "label": "Settings", "icon": "⚙️" },
      { "label": "Profile", "icon": "👤" }
    ]
  }
}
```

---

## 🔧 Advanced Features

### Dynamic Content
```json
"content": {
  "type": "custom",
  "html": "<div>Custom HTML content</div>",
  "css": "color: white; font-size: 16px;"
}
```

### Animations
```json
"animations": {
  "entrance": "fadeIn",
  "exit": "fadeOut",
  "duration": 300
}
```

### Interactions
```json
"interactions": {
  "onClick": "handleClick",
  "onHover": "handleHover",
  "onDrag": "handleDrag"
}
```

---

## 📦 Complete Example

Here's a full configuration for a dashboard card:

```json
{
  "componentType": "dashboard-card",
  "glass": {
    "transparency": 8,
    "blur": 35,
    "borderRadius": 16,
    "width": 320,
    "height": 240
  },
  "content": {
    "type": "text",
    "title": "Total Users",
    "subtitle": "1,234 active users",
    "icon": "👥"
  },
  "jelly": {
    "enabled": true,
    "elasticity": 0.5,
    "friction": 0.9,
    "magneticRange": 100,
    "magneticStrength": 0.2
  },
  "lighting": {
    "cursorFollowEnabled": true,
    "followDistance": 150,
    "lightIntensity": 0.6,
    "lightSize": 100,
    "lightColor": "96, 165, 250"
  }
}
```

---

## 🎯 Best Practices

1. **Keep blur values reasonable** (20-60px for most components)
2. **Use low transparency** (5-15%) for best glass effect
3. **Match border radius to component size** (larger = more rounded)
4. **Enable jelly physics for interactive elements**
5. **Use magnetic following for important UI elements**
6. **Test with different backgrounds** to ensure readability

---

## 🌟 Tips & Tricks

- **Buttons**: Higher transparency (10-15%), less blur (20-30px)
- **Windows**: Medium transparency (6-10%), more blur (40-60px)
- **Cards**: Low transparency (6-8%), medium blur (30-40px)
- **Icons**: Higher transparency (10-12%), less blur (20px)
- **Menus**: Medium transparency (8-10%), high blur (40-50px)

---

With this JSON configuration system, you can create **unlimited variations** of liquid glass components! 🌊✨
