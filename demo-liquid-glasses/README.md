# SmonthlAPI Demo Examples

Real demos using the published `smonthl@1.0.3` npm package!

## 🎯 Shape Demos

### 1. **demo-circle-80.html**
- 80x80 circular icon 🚀
- All features enabled

### 2. **demo-square-200.html**
- 200x200 square card
- All features enabled

### 3. **demo-rectangle-400x200.html**
- 400x200 wide panel
- All features enabled

### 4. **demo-pill-button.html**
- 300x70 pill button
- Fully rounded ends

## 🎛️ Feature Control Demos

### 5. **demo-static-nodrag.html** ❌ No Interaction
- ❌ Not draggable
- ❌ No jelly physics
- ❌ No magnetic following
- ❌ No cursor lights
- ✅ Magnifying lens only
- **Use case**: Static display cards, info panels

### 6. **demo-drag-only.html** 🖱️ Drag Only
- ✅ Draggable
- ❌ No jelly physics
- ❌ No magnetic following
- ❌ No cursor lights
- ❌ No magnifying lens
- **Use case**: Simple draggable windows, movable panels

### 7. **demo-jelly-only.html** 🎈 Jelly Physics
- ✅ Draggable
- ✅ Jelly physics (bouncy, elastic)
- ❌ No magnetic following
- ❌ No cursor lights
- ❌ No magnifying lens
- **Use case**: Fun, playful UI elements

### 8. **demo-magnetic-only.html** 🧲 Magnetic
- ❌ Not draggable
- ❌ No jelly physics
- ✅ Magnetic cursor following
- ❌ No cursor lights
- ❌ No magnifying lens
- **Use case**: Interactive hover effects, attention-grabbing elements

### 9. **demo-lights-only.html** 💡 Cursor Lights
- ❌ Not draggable
- ❌ No jelly physics
- ❌ No magnetic following
- ✅ Cursor lights (hover to see)
- ❌ No magnifying lens
- **Use case**: Spotlight effects, hover highlights

### 10. **demo-all-enabled.html** ✨ Full Featured
- ✅ Draggable
- ✅ Jelly physics
- ✅ Magnetic following
- ✅ Cursor lights
- ✅ Magnifying lens
- **Use case**: Premium interactive elements, hero sections

## 📋 Feature Matrix

| Demo | Draggable | Jelly | Magnetic | Lights | Lens |
|------|-----------|-------|----------|--------|------|
| static-nodrag | ❌ | ❌ | ❌ | ❌ | ✅ |
| drag-only | ✅ | ❌ | ❌ | ❌ | ❌ |
| jelly-only | ✅ | ✅ | ❌ | ❌ | ❌ |
| magnetic-only | ❌ | ❌ | ✅ | ❌ | ❌ |
| lights-only | ❌ | ❌ | ❌ | ✅ | ❌ |
| all-enabled | ✅ | ✅ | ✅ | ✅ | ✅ |

## ⚙️ Configuration Options

Each feature can be controlled in the config JSON:

```json
{
  "draggable": true,           // Enable/disable dragging
  "magnifyingLens": true,      // Enable/disable lens effect
  "jelly": {
    "enabled": true,           // Enable/disable jelly physics
    "elasticity": 0.6,         // 0-1, bounciness
    "friction": 0.85,          // 0-1, damping
    "magneticRange": 150,      // Pixels, 0 to disable
    "magneticStrength": 0.3    // 0-1, attraction force
  },
  "lighting": {
    "cursorFollowEnabled": true, // Enable/disable cursor lights
    "lightIntensity": 0.8,       // 0-1, brightness
    "lightSize": 120             // Pixels, light radius
  }
}
```

## 🚀 How to Run

Just open any HTML file in your browser! They all use the real `smonthl@1.0.3` package from npm.

## 🎨 Create Your Own

1. Copy any config file
2. Modify the features you want:
   - Set `draggable: false` for static elements
   - Set `jelly.enabled: false` to disable physics
   - Set `jelly.magneticStrength: 0` to disable magnetic
   - Set `lighting.cursorFollowEnabled: false` to disable lights
   - Set `magnifyingLens: false` to disable lens
3. Adjust size, shape, and content
4. Open the HTML file!

## 📦 Package Used

- **Package**: `smonthl@1.0.3`
- **Published**: https://www.npmjs.com/package/smonthl
- **GitHub**: https://github.com/Moude-AI/smonthl_api

## 💡 Use Cases

- **Static cards**: Use `static-nodrag` config
- **Draggable windows**: Use `drag-only` or `jelly-only`
- **Interactive buttons**: Use `magnetic-only` or `lights-only`
- **Hero elements**: Use `all-enabled` for maximum impact
- **Info panels**: Disable drag, enable lights for hover feedback
- **Game UI**: Enable jelly for fun, bouncy elements
