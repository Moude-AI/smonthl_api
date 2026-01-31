# SmonthlAPI DSL Syntax Guide

Version 1.0.6 introduces simple, intuitive DSL (Domain-Specific Language) shortcuts for creating liquid glass components without complex JavaScript grammar.

## Installation

```bash
# HTML/JavaScript version
npm install smonthl

# React/TypeScript version
npm install smonthl-react
```

## Simple One-Line Creations

### Circle
```javascript
const api = new SmonthlAPI();
const circle = api.circle(100, '🚀');
// Creates a 100px circle with rocket icon
```

### Square
```javascript
const square = api.square(200, 'Square Text');
// Creates a 200x200px square with text
```

### Button
```javascript
const button = api.button('Click Me', 300, 70);
// Creates a 300x70px pill-shaped button
```

### Card
```javascript
const card = api.card('Title', 'Subtitle', 350, 200);
// Creates a 350x200px card with title and subtitle
```

### Icon
```javascript
const icon = api.icon('⭐', 80);
// Creates an 80px icon (shortcut for circle)
```

### Window
```javascript
const window = api.window('Window Title', 600, 400);
// Creates a 600x400px window
```

## Chainable Methods

Create and customize in one fluent chain:

```javascript
api.circle(120, '🎨')
   .blur(80)              // Set blur amount
   .transparent(10)       // Set transparency
   .rounded(60)           // Set border radius
   .jelly(true)           // Enable jelly physics
   .magnetic(0.5)         // Set magnetic strength
   .lights(true)          // Enable cursor lights
   .font('Poppins');      // Load Google Font

const config = api.config; // Get the final config
```

### Available Chain Methods

- `.blur(amount)` - Set blur intensity (10-150)
- `.transparent(amount)` - Set transparency (0-30)
- `.rounded(amount)` - Set border radius
- `.draggable(enabled)` - Enable/disable dragging
- `.jelly(enabled)` - Enable/disable jelly physics
- `.magnetic(strength)` - Set magnetic attraction (0-1)
- `.lights(enabled)` - Enable/disable cursor lights
- `.font(name, weights)` - Load Google Font
- `.icons(library)` - Load icon library

## All-in-One Glass Method

Configure everything in a single object:

```javascript
const config = api.glass({
  size: 150,              // Size for square shapes
  width: 300,             // Or specify width/height
  height: 200,
  shape: 'circle',        // 'circle' or 'square'
  icon: '💎',             // Icon content
  text: 'Text',           // Text content
  blur: 60,               // Blur amount
  transparency: 8,        // Transparency level
  radius: 32,             // Border radius
  font: 'Roboto',         // Google Font name
  icons: 'fontawesome'    // Icon library
});
```

## Icon Libraries

Load external icon libraries:

```javascript
api.icons('fontawesome');  // Font Awesome
api.icons('material');     // Material Icons
api.icons('bootstrap');    // Bootstrap Icons
api.icons('feather');      // Feather Icons
api.icons('ionicons');     // Ionicons
```

## Google Fonts

Load custom fonts:

```javascript
api.font('Poppins');                    // Default weights
api.font('Roboto', '300,400,600,700');  // Custom weights
```

## Usage with JSON Configs

All DSL methods return a configuration object that can be:

1. Saved as JSON
2. Loaded in the npm package HTML
3. Used with React components

### Example: Save Config

```javascript
const config = api.button('Click Me', 300, 70);
const json = JSON.stringify(config, null, 2);

// Save to file or use in your app
localStorage.setItem('myConfig', json);
```

### Example: Load in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Liquid Glass</title>
</head>
<body>
  <script src="node_modules/smonthl/smonthl-api.js"></script>
  <script>
    const api = new SmonthlAPI();
    
    // Create config with DSL
    const config = api.button('Click Me', 300, 70);
    
    // Apply to component
    api.config = config;
    api.applyConfig(config);
  </script>
</body>
</html>
```

### Example: React/TypeScript

```typescript
import { SmonthlAPI } from 'smonthl-react';

function MyComponent() {
  const api = new SmonthlAPI();
  
  // Create config with DSL
  const config = api.circle(100, '🚀')
                    .blur(80)
                    .jelly(true)
                    .magnetic(0.5);
  
  // Use config in your component
  return <LiquidGlass config={api.config} />;
}
```

## Old vs New Syntax

### Old Way (Complex)
```javascript
const config = api.createCustomComponent({
  type: 'circle',
  width: 100,
  height: 100,
  borderRadius: 50,
  icon: '🚀',
  contentType: 'icon'
});
```

### New Way (Simple)
```javascript
const config = api.circle(100, '🚀');
```

## Complete Example

```javascript
const api = new SmonthlAPI();

// Create multiple components
const myButton = api.button('Submit', 250, 60);
const myIcon = api.icon('⭐', 80);
const myCard = api.card('Welcome', 'Get started', 400, 250);

// Create with chaining
api.circle(150, '🎨')
   .blur(100)
   .transparent(12)
   .jelly(true)
   .magnetic(0.7)
   .lights(true)
   .font('Poppins')
   .icons('fontawesome');

const customized = api.config;

// Create with all-in-one method
const simple = api.glass({
  size: 200,
  shape: 'circle',
  icon: '💎',
  blur: 80,
  transparency: 10,
  font: 'Roboto'
});

// Save configs
console.log('Button:', myButton);
console.log('Icon:', myIcon);
console.log('Card:', myCard);
console.log('Customized:', customized);
console.log('Simple:', simple);
```

## Benefits

1. **No Complex Grammar** - Simple, intuitive method names
2. **One-Line Creation** - Create components with a single call
3. **Chainable** - Fluent API for customization
4. **Type-Safe** - Full TypeScript support
5. **JSON Compatible** - Works with existing config system
6. **Flexible** - Use DSL or traditional methods

## Migration Guide

If you're using the old API methods, you can easily migrate:

| Old Method | New DSL Shortcut |
|------------|------------------|
| `createCircle(size, icon)` | `circle(size, icon)` |
| `createSquare(size, text)` | `square(size, text)` |
| `createRectangle(w, h, text)` | `button(text, w, h)` or `card(title, subtitle, w, h)` |
| `createIconButton(icon, size)` | `icon(icon, size)` |
| `createCustomComponent({...})` | `glass({...})` |

## Examples Directory

Check out the `demo-liquid-glasses/` folder for working examples:

- `example-simple-syntax.html` - All DSL methods demonstrated
- `example-create-circle.html` - Circle creation example
- `example-create-button.html` - Button creation example
- `example-all-shapes.js` - Node.js script generating all configs
- `example-react-usage.tsx` - React/TypeScript usage

## Support

- GitHub: https://github.com/Moude-AI/smonthl_api
- npm (HTML): https://www.npmjs.com/package/smonthl
- npm (React): https://www.npmjs.com/package/smonthl-react
- Issues: https://github.com/Moude-AI/smonthl_api/issues

## License

Apache 2.0 - See LICENSE file for details
