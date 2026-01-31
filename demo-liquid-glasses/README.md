# SmonthlAPI Demo Examples

Real demos using the published `smonthl@1.0.5` npm package!

## 🎯 Shape Demos

### 1-4. Basic Shapes (v1.0.3)
- **demo-circle-80.html** - 80x80 circular icon
- **demo-square-200.html** - 200x200 square card
- **demo-rectangle-400x200.html** - 400x200 wide panel
- **demo-pill-button.html** - 300x70 pill button

## 🎛️ Feature Control Demos (v1.0.4)

### 5-10. Enable/Disable Features
- **demo-static-nodrag.html** - Static display only
- **demo-drag-only.html** - Draggable without effects
- **demo-jelly-only.html** - Jelly physics only
- **demo-magnetic-only.html** - Magnetic attraction only
- **demo-lights-only.html** - Cursor lights only
- **demo-all-enabled.html** - All features enabled

## 🎨 Icon Library & Typography Demos (v1.0.5)

### 11. **demo-fontawesome.html** 🚀 Font Awesome Icons
- Uses Font Awesome 6.5.1
- Icon: `fas fa-rocket`
- Custom font: Poppins
- 100x100 circular icon

### 12. **demo-material-icons.html** 🎨 Material Design
- Uses Material Icons
- Custom font: Roboto
- Material Design typography
- 200x150 card

### 13. **demo-custom-font.html** ✨ Custom Typography
- Elegant Playfair Display serif font
- Custom font sizes and weights
- Letter spacing: -1px
- 400x180 panel

## 📦 What's New in v1.0.5

### Icon Library Support
Load any icon library via CDN:
- Font Awesome
- Material Icons
- Bootstrap Icons
- Feather Icons
- Ionicons
- Or any custom icon library!

### Custom Typography
Full control over fonts and text styling:
- Custom font families (Google Fonts, etc.)
- Title and subtitle sizes
- Font weights
- Letter spacing
- Line height

### Configuration Example

```json
{
  "typography": {
    "fontFamily": "'Poppins', sans-serif",
    "titleSize": "32px",
    "subtitleSize": "16px",
    "titleWeight": "600",
    "subtitleWeight": "400",
    "letterSpacing": "-0.5px",
    "lineHeight": "1.4"
  },
  "externalLibraries": [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
    "https://fonts.googleapis.com/css2?family=Poppins:wght@300,400,600&display=swap"
  ],
  "content": {
    "type": "icon-library",
    "iconClass": "fas fa-rocket",
    "iconLibrary": "fontawesome"
  }
}
```

## 🎯 API Methods (v1.0.5)

### Load Icon Libraries
```javascript
const api = new SmonthlAPI();

// Load Font Awesome
api.loadIconLibrary('fontawesome');

// Load Material Icons
api.loadIconLibrary('material');

// Load Bootstrap Icons
api.loadIconLibrary('bootstrap');

// Load custom library
api.loadIconLibrary('custom', 'https://your-cdn.com/icons.css');
```

### Load Custom Fonts
```javascript
// Load Google Font
api.loadGoogleFont('Poppins', '300,400,600');

// Load custom font
api.loadFont('MyFont', 'https://fonts.com/myfont.css');
```

### Set Typography
```javascript
api.setTypography({
  fontFamily: "'Poppins', sans-serif",
  titleSize: '32px',
  subtitleSize: '16px',
  titleWeight: '600',
  subtitleWeight: '400',
  letterSpacing: '-0.5px',
  lineHeight: '1.4'
});
```

### Create Icon with Library
```javascript
// Create Font Awesome icon
const config = api.createIconWithLibrary('fontawesome', 'fas fa-rocket', 80);

// Create Material icon
const config = api.createIconWithLibrary('material', 'material-icons home', 64);
```

## 📋 Feature Matrix

| Demo | Draggable | Jelly | Magnetic | Lights | Lens | Icons | Fonts |
|------|-----------|-------|----------|--------|------|-------|-------|
| static-nodrag | ❌ | ❌ | ❌ | ❌ | ✅ | Emoji | Default |
| drag-only | ✅ | ❌ | ❌ | ❌ | ❌ | Emoji | Default |
| jelly-only | ✅ | ✅ | ❌ | ❌ | ❌ | Emoji | Default |
| magnetic-only | ❌ | ❌ | ✅ | ❌ | ❌ | Emoji | Default |
| lights-only | ❌ | ❌ | ❌ | ✅ | ❌ | Emoji | Default |
| all-enabled | ✅ | ✅ | ✅ | ✅ | ✅ | Emoji | Default |
| fontawesome | ✅ | ✅ | ✅ | ✅ | ✅ | FA | Poppins |
| material-icons | ✅ | ✅ | ✅ | ✅ | ✅ | Material | Roboto |
| custom-font | ✅ | ✅ | ✅ | ✅ | ✅ | Emoji | Playfair |

## 🚀 How to Run

Just open any HTML file in your browser! They all use the real `smonthl@1.0.5` package from npm.

## 🎨 Supported Icon Libraries

- **Font Awesome** - `fas fa-icon-name`
- **Material Icons** - `material-icons icon_name`
- **Bootstrap Icons** - `bi bi-icon-name`
- **Feather Icons** - `feather icon-name`
- **Ionicons** - `ion-icon name="icon-name"`

## 🔤 Google Fonts Examples

Popular fonts you can use:
- Poppins - Modern, geometric
- Roboto - Material Design
- Playfair Display - Elegant serif
- Montserrat - Clean sans-serif
- Open Sans - Friendly, readable
- Lato - Professional
- Raleway - Stylish
- Inter - UI optimized

## 📦 Package Versions

- **v1.0.3** - Flexible shapes and sizes
- **v1.0.4** - Feature enable/disable
- **v1.0.5** - Icon libraries & custom fonts ⭐ Current

**Published:**
- `smonthl@1.0.5` ✅
- `smonthl-react@1.0.5` ✅

**Links:**
- npm (HTML): https://www.npmjs.com/package/smonthl
- npm (React): https://www.npmjs.com/package/smonthl-react
- GitHub: https://github.com/Moude-AI/smonthl_api
