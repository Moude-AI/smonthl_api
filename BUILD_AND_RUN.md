# SmonthlAPI - Build and Run Guide

## Overview

This guide covers building and running SmonthlAPI in different configurations. SmonthlAPI is a configuration management system for liquid glass UI components, providing beautiful frosted glass effects with jelly physics, magnetic cursor following, and dynamic cursor lights. The API supports React components, HTML/JavaScript standalone version, and Electron demo applications.

## Prerequisites

### Required Software

- Node.js (version 18.x or higher)
- npm (version 9.x or higher)
- Git (for version control)

### Optional Tools

- Electron (installed via npm)
- TypeScript compiler (installed via npm)
- Vite (installed via npm)

### System Requirements

- Operating System: Windows 10+, macOS 10.13+, or Linux (Ubuntu 18.04+)
- RAM: 4GB minimum, 8GB recommended
- Disk Space: 500MB for dependencies and build artifacts

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd Smonthl_API
```

### Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React and React DOM (for React version)
- Electron (for demo application)
- TypeScript (for type definitions)
- Vite (for development and bundling)
- Rollup (for library builds)
- Development tools and build utilities

## Development Mode

### Running React Development Server

Start the Vite development server with hot module replacement to test SmonthlAPI and liquid glass components:

```bash
npm run dev:react
```

This will:
- Start Vite dev server on http://localhost:5173
- Enable hot module replacement for instant updates
- Provide fast refresh for React components
- Show liquid glass effects in real-time with SmonthlAPI
- Display build errors in the browser

### Running Electron Demo Application

Start Electron with the SmonthlAPI demo:

```bash
npm run dev:electron
```

This will:
- Launch Electron window with glass effects
- Load SmonthlAPI and glass-config.json
- Connect to Vite dev server
- Enable DevTools for debugging
- Set NODE_ENV to development
- Demonstrate jelly physics, magnetic following, and cursor lights
- Show interactive control panel for live configuration

### Running Full Development Stack

Run both React dev server and Electron demo concurrently:

```bash
npm run dev
```

This command uses `concurrently` to run both:
- Vite development server
- Electron demo application with SmonthlAPI

The application will automatically reload when you make changes to liquid glass components, SmonthlAPI code, physics calculations, or styling.

## Building for Production

### Build React Application

Compile TypeScript and bundle React application:

```bash
npm run build:react
```

This will:
1. Run TypeScript compiler (tsc)
2. Bundle application with Vite
3. Output production files to `dist/` directory
4. Optimize and minify code
5. Generate source maps

### Build Output

After building, the `dist/` directory will contain:
- `index.html` - Entry HTML file
- `assets/` - Bundled JavaScript and CSS
- Source maps for debugging

## Running Production Build

### Start Electron with Production Build

```bash
npm start
```

This runs the main Electron process using `electron-main.js`.

## Package Configurations

### Main Application (package.json)

The default configuration for the SmonthlAPI demo application with liquid glass effects.

**Key Scripts:**
- `start` - Run Electron demo application with SmonthlAPI
- `dev` - Development mode with hot reload
- `dev:react` - React dev server only
- `dev:electron` - Electron demo mode only
- `build:react` - Build React components for production

### HTML Package (package-html.json)

Configuration for standalone HTML/JavaScript version with SmonthlAPI.

**Usage:**
```bash
cp package-html.json package.json
npm install
npm start
```

**Key Scripts:**
- `start` - Run Electron with HTML/JS SmonthlAPI demo
- `build` - Package application
- `package` - Create distributable with electron-builder
- `publish` - Publish @liquid-glass/html to npm registry

**Build Targets:**
- macOS: DMG and ZIP
- Windows: NSIS installer and portable
- Linux: AppImage and DEB package

**Package Contents:**
- `index.html` - Demo page with liquid glass effects and controls
- `smonthl-api.js` - Core SmonthlAPI JavaScript implementation
- `glass-config.json` - Configuration for glass effects and templates
- README and documentation

### React Package (package-react.json)

Configuration for SmonthlAPI React component library.

**Usage:**
```bash
cp package-react.json package.json
npm install
npm run build
```

**Key Scripts:**
- `build` - Build library with Rollup
- `dev` - Watch mode for development
- `test` - Run Jest tests
- `prepublishOnly` - Build before publishing
- `publish` - Publish @liquid-glass/react to npm registry

**Output:**
- `dist/index.js` - CommonJS bundle with SmonthlAPI and components
- `dist/index.esm.js` - ES Module bundle for tree-shaking
- `dist/index.d.ts` - TypeScript definitions
- `dist/*.css` - Compiled styles for glass effects

**Exported Components:**
- `LiquidGlass` - Main wrapper component with SmonthlAPI integration
- `GlassButton` - Button with glass effect
- `GlassCard` - Card with glass effect
- `GlassWindow` - Window with glass effect (draggable/resizable)
- `GlassMenu` - Menu with glass effect
- `GlassIcon` - Icon with glass effect

## Switching Between Configurations

### Switch to HTML Version

```bash
cp package.json package.json.backup
cp package-html.json package.json
npm install
npm start
```

### Switch to React Library

```bash
cp package.json package.json.backup
cp package-react.json package.json
npm install
npm run build
```

### Restore Main Configuration

```bash
cp package.json.backup package.json
npm install
```

## Building Distributable Packages

### Using electron-builder

First, ensure you're using the HTML package configuration:

```bash
cp package-html.json package.json
npm install
```

### Build for Current Platform

```bash
npm run package
```

### Build for Specific Platform

```bash
# macOS
npx electron-builder --mac

# Windows
npx electron-builder --win

# Linux
npx electron-builder --linux
```

### Build for All Platforms

```bash
npx electron-builder -mwl
```

Output will be in the `dist/` directory.

## Configuration Files

### glass-config.json

SmonthlAPI configuration file for liquid glass effects, physics, and templates:

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
    "subtitle": "Real lens magnification • Beautiful backgrounds"
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
  "backgroundChangeInterval": 10000,
  "templates": {
    "button": { "componentType": "button", "glass": {...} },
    "card": { "componentType": "card", "glass": {...} },
    "window": { "componentType": "window", "glass": {...} },
    "icon": { "componentType": "icon", "glass": {...} },
    "menu": { "componentType": "menu", "glass": {...} }
  }
}
```

**Configuration Options:**
- `componentType` - Type of component (liquid-glass, button, card, window, icon, menu)
- `glass` - Visual properties (transparency, blur, magnifying effects, dimensions)
- `content` - Content configuration (text, icons, menu items)
- `jelly` - Physics properties (elasticity, friction, magnetic effects)
- `lighting` - Cursor light effects configuration
- `backgrounds` - Array of background image URLs
- `backgroundChangeInterval` - Time between background changes (ms)
- `templates` - Reusable component configurations

### smonthl-api.js

Core SmonthlAPI implementation providing:
- Configuration loading from JSON files
- Template system for component creation
- Path-based configuration updates
- Import/export functionality
- Event system for configuration changes
- LocalStorage persistence

### tsconfig.json

TypeScript compiler configuration. Modify for different build targets or strictness levels.

### vite.config.ts

Vite bundler configuration (if present). Customize build options, plugins, and optimization settings for SmonthlAPI and liquid glass components.

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or specify different port
vite --port 3000
```

### Electron Won't Start

Check that all dependencies are installed:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

Clear cache and rebuild:

```bash
rm -rf dist node_modules
npm install
npm run build:react
```

### TypeScript Errors

Ensure TypeScript version matches project requirements:

```bash
npm install typescript@latest --save-dev
```

### Module Not Found

Verify all imports and file paths are correct. Check that files exist in expected locations.

## Development Workflow

### Recommended Workflow

1. Start development servers:
   ```bash
   npm run dev
   ```

2. Make changes to SmonthlAPI or liquid glass components in `src/components/`

3. View glass effects automatically in Electron window with live configuration updates

4. Test jelly physics, magnetic following, and cursor lights using the control panel

5. Adjust configuration in `glass-config.json` or via SmonthlAPI methods

6. Check console for errors and performance warnings

7. Build for production when ready:
   ```bash
   npm run build:react
   ```

8. Test production build:
   ```bash
   npm start
   ```

9. Package for distribution:
   ```bash
   npm run package
   ```

### Hot Reload

Changes to the following will trigger hot reload:
- Liquid glass components (.tsx, .jsx)
- TypeScript files (.ts)
- CSS files for glass effects (.css)
- Physics calculations and animations
- Configuration files (requires manual restart for glass-config.json)

### Testing Glass Effects

When developing liquid glass effects:
1. Test on different background colors and images
2. Verify blur and opacity work correctly
3. Test jelly physics with various stiffness/damping values
4. Verify magnetic following responds smoothly
5. Check cursor lights render with proper blending
6. Test performance with multiple glass elements
7. Verify browser compatibility (backdrop-filter support)

### DevTools

Access Electron DevTools:
- macOS: Cmd + Option + I
- Windows/Linux: Ctrl + Shift + I
- Or set `webPreferences.devTools: true` in electron-main.js

## Performance Optimization

### Development

- Use React DevTools for component profiling
- Monitor animation frame rates (target 60fps)
- Profile physics calculations for bottlenecks
- Enable source maps for debugging
- Use Vite's fast refresh for instant updates

### Production

- Minification enabled by default
- Tree shaking removes unused code
- Code splitting for lazy loading
- Asset optimization (images, fonts)

### Liquid Glass Performance Tips

- Use `will-change: transform, opacity` for animated elements
- Limit number of simultaneous glass elements
- Use `requestAnimationFrame` for physics updates
- Debounce cursor tracking for magnetic following
- Use GPU-accelerated CSS properties (transform, opacity)
- Optimize backdrop-filter usage (expensive operation)
- Consider disabling effects on low-end devices
- Use CSS containment for isolated glass elements

```css
.liquid-glass {
  will-change: transform, opacity;
  contain: layout style paint;
  transform: translateZ(0); /* Force GPU acceleration */
}
```

## Testing

### Run Tests

```bash
npm test
```

Note: Test configuration needs to be set up. Currently returns an error.

### Manual Testing

1. Test all UI interactions
2. Verify glass effects render correctly
3. Check performance on target platforms
4. Test window management features
5. Verify configuration loading

## Deployment

### Publishing to npm

For React library version (@liquid-glass/react):

```bash
cp package-react.json package.json
npm install
npm run build
npm publish --access public
```

For HTML version (@liquid-glass/html):

```bash
cp package-html.json package.json
npm install
npm publish --access public
```

### Using Published Packages

**React:**
```bash
npm install @liquid-glass/react
```

```typescript
import { LiquidGlass, GlassButton, GlassCard } from '@liquid-glass/react';
import { SmonthlAPI } from '@liquid-glass/react';
import '@liquid-glass/react/dist/styles.css';

const smonthlAPI = new SmonthlAPI();
await smonthlAPI.loadConfig();

<LiquidGlass 
  blur={smonthlAPI.getConfig('glass.blur')} 
  transparency={smonthlAPI.getConfig('glass.transparency')}
  jellyPhysics 
  magneticFollow 
  cursorLights
>
  <GlassButton>Click Me</GlassButton>
  <GlassCard>Content</GlassCard>
</LiquidGlass>
```

**HTML/JavaScript:**
```bash
npm install @liquid-glass/html
```

```html
<script src="node_modules/@liquid-glass/html/smonthl-api.js"></script>
<script>
  const smonthlAPI = new SmonthlAPI();
  smonthlAPI.loadConfig().then(config => {
    // Apply configuration to glass elements
    const glass = document.getElementById('glass');
    glass.style.backdropFilter = `blur(${config.glass.blur}px)`;
    glass.style.background = `rgba(255, 255, 255, ${config.glass.transparency / 100})`;
  });
</script>
```

### Distributing Electron Demo App

1. Build for target platforms
2. Test installers on clean systems
3. Sign applications (macOS/Windows)
4. Upload to distribution platform
5. Provide installation instructions and demo videos

## Environment Variables

### Development

```bash
NODE_ENV=development npm run dev:electron
```

### Production

```bash
NODE_ENV=production npm start
```

### Custom Variables

Create `.env` file in project root:

```
VITE_API_URL=https://api.example.com
VITE_DEBUG=true
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:react
      - run: npm test
```

## Additional Resources

### Documentation

- Electron: https://www.electronjs.org/docs
- React: https://react.dev
- Vite: https://vitejs.dev
- TypeScript: https://www.typescriptlang.org/docs

### Community

- GitHub Issues: Report bugs and request features
- Discussions: Ask questions and share ideas
- Contributing: See CONTRIBUTING.md for guidelines

## Quick Reference

### Common Commands

```bash
# Install dependencies
npm install

# Development mode (React + Electron demo)
npm run dev

# React dev server only
npm run dev:react

# Electron demo only
npm run dev:electron

# Build React library
npm run build:react

# Run production build
npm start

# Package Electron demo
npm run package

# Clean build
rm -rf dist node_modules && npm install

# Switch to React library config
cp package-react.json package.json && npm install

# Switch to HTML/JS config
cp package-html.json package.json && npm install

# Publish to npm
npm publish --access public
```

### File Locations

- Source code: `src/`
- Liquid glass components: `src/components/`
- Build output: `dist/`
- Configuration: `glass-config.json`
- Types: `src/types/`
- Demo files: `index.html`, `electron-react.js`
- SmonthlAPI implementation: `smonthl-api.js`

### Component Files

- `LiquidGlass.tsx` - Main wrapper component
- `GlassButton.tsx` - Button with glass effect
- `GlassCard.tsx` - Card with glass effect
- `GlassWindow.tsx` - Window with glass effect
- `GlassMenu.tsx` - Menu with glass effect
- `GlassIcon.tsx` - Icon with glass effect

### API Files

- `smonthl-api.js` - Core SmonthlAPI JavaScript implementation
- `glass-config.json` - Default configuration with templates
- `index.ts` - React component exports with SmonthlAPI integration

## SmonthlAPI Usage

### Basic Usage

```html
<script src="smonthl-api.js"></script>
<script>
  // Initialize SmonthlAPI
  const smonthlAPI = new SmonthlAPI();
  
  // Load configuration
  smonthlAPI.loadConfig('./glass-config.json').then(config => {
    console.log('Loaded:', config);
  });
  
  // Update configuration
  smonthlAPI.updateConfig('glass.blur', 60);
  smonthlAPI.updateConfig('jelly.elasticity', 0.6);
  
  // Get configuration value
  const blur = smonthlAPI.getConfig('glass.blur');
  
  // Create from template
  const buttonConfig = smonthlAPI.createFromTemplate('button');
  
  // Export/Import
  const json = smonthlAPI.exportConfig();
  smonthlAPI.importConfig(json);
  
  // LocalStorage
  smonthlAPI.saveToLocalStorage();
  smonthlAPI.loadFromLocalStorage();
  
  // Event listeners
  smonthlAPI.on('configUpdated', ({ path, value }) => {
    console.log(`Updated ${path} to ${value}`);
  });
</script>
```

### React Integration

```typescript
import { LiquidGlass } from '@liquid-glass/react';
import { SmonthlAPI } from './smonthl-api';

const smonthlAPI = new SmonthlAPI();
await smonthlAPI.loadConfig();

const config = smonthlAPI.getConfig('glass');

<LiquidGlass 
  blur={config.blur} 
  transparency={config.transparency}
  jellyPhysics={smonthlAPI.getConfig('jelly.enabled')}
  magneticFollow={smonthlAPI.getConfig('jelly.magneticStrength') > 0}
  cursorLights={smonthlAPI.getConfig('lighting.cursorFollowEnabled')}
>
  <h1>{smonthlAPI.getConfig('content.title')}</h1>
</LiquidGlass>
```

## Browser Compatibility

### Backdrop Filter Support

Liquid glass effects require `backdrop-filter` CSS property:

- Chrome/Edge: 76+
- Safari: 9+ (with -webkit- prefix)
- Firefox: 103+
- Opera: 63+

### Fallback for Unsupported Browsers

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

@supports not (backdrop-filter: blur(10px)) {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

## Conclusion

This guide covers the essential steps for building and running SmonthlAPI in various configurations. SmonthlAPI provides a powerful configuration management system for liquid glass UI components with support for templates, dynamic updates, and persistent storage. For specific features like jelly physics implementation, magnetic following algorithms, cursor light effects, or template customization, refer to the LIQUID_GLASS_GUIDE.md and other documentation files in the project.
