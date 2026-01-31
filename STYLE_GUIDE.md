# SmonthlAPI Style Guide

## Overview

This document outlines the coding standards, naming conventions, and best practices for the SmonthlAPI project. SmonthlAPI is a configuration management system for liquid glass UI components with jelly physics, magnetic cursor following, and dynamic lighting effects. Following these guidelines ensures consistency and maintainability across the codebase.

## File Organization

### Directory Structure

- `/src` - Source code root
- `/src/components` - Reusable React components
- `/src/types` - TypeScript type definitions
- Root level - Configuration files and documentation

### File Naming

- React components: PascalCase (e.g., `GlassButton.tsx`)
- Stylesheets: Match component name (e.g., `GlassButton.css`)
- Utilities and helpers: camelCase (e.g., `tipStyleHelper.ts`)
- Type definitions: PascalCase (e.g., `GlassTypes.ts`)
- Configuration files: kebab-case (e.g., `glass-config.json`)

## TypeScript Guidelines

### Type Definitions

Always define explicit types for:
- Component props
- Function parameters and return values
- State variables
- API responses

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}
```

### Type vs Interface

- Use `interface` for component props and public APIs
- Use `type` for unions, intersections, and utility types

### Avoid Any

Never use `any` type. Use `unknown` if the type is truly unknown, then narrow it with type guards.

## React Component Guidelines

### Component Structure

```typescript
import React from 'react';
import './ComponentName.css';

interface ComponentNameProps {
  blur?: number;
  opacity?: number;
  jellyPhysics?: boolean;
  magneticFollow?: boolean;
  cursorLights?: boolean;
}

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  blur = 10, 
  opacity = 0.8,
  jellyPhysics = true,
  magneticFollow = false,
  cursorLights = false
}) => {
  // hooks for glass effects
  // event handlers for interactions
  // physics calculations
  
  return (
    <div className="liquid-glass-component">
      {/* JSX */}
    </div>
  );
};
```

### Functional Components

- Always use functional components with hooks
- Avoid class components
- Use arrow function syntax for component definition

### Hooks

- Place all hooks at the top of the component
- Custom hooks should start with `use` prefix
- Follow the Rules of Hooks (no conditional hooks)

### Props

- Destructure props in function parameters
- Provide default values using destructuring
- Mark optional props with `?`

## CSS Guidelines

### Class Naming

Use BEM (Block Element Modifier) methodology for liquid glass components:

```css
.liquid-glass { }
.liquid-glass__surface { }
.liquid-glass__light { }
.liquid-glass--jelly { }
.liquid-glass--magnetic { }
.liquid-glass--with-cursor-lights { }
```

### CSS Organization

Within each CSS file, organize rules in this order:
1. Block styles
2. Element styles
3. Modifier styles
4. State styles (hover, active, focus)
5. Media queries

### CSS Variables

Use CSS custom properties for liquid glass theming:

```css
:root {
  --liquid-glass-blur: 10px;
  --liquid-glass-opacity: 0.8;
  --liquid-glass-border: rgba(255, 255, 255, 0.2);
  --liquid-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  --jelly-stiffness: 150;
  --jelly-damping: 20;
  --magnetic-radius: 100px;
  --magnetic-strength: 0.5;
  --cursor-light-size: 200px;
  --cursor-light-intensity: 0.8;
}
```

### Avoid Inline Styles

Prefer CSS classes over inline styles. Use inline styles only for dynamic values that cannot be predetermined.

## JavaScript/TypeScript Code Style

### Variables

- Use `const` by default
- Use `let` only when reassignment is necessary
- Never use `var`

### Functions

- Prefer arrow functions for callbacks and short functions
- Use named functions for complex logic
- Keep functions small and focused (single responsibility)

### Imports

Order imports as follows:
1. External libraries (React, etc.)
2. Internal components
3. Types and interfaces
4. Styles
5. Assets

```typescript
import React, { useState, useEffect } from 'react';
import { GlassButton } from './components/GlassButton';
import { ButtonProps } from './types';
import './App.css';
```

### Async/Await

- Prefer `async/await` over promise chains
- Always handle errors with try/catch
- Avoid nested async functions when possible

## SmonthlAPI Configuration Guidelines

### Glass Effect Components

All liquid glass components must:
- Support customizable blur (default: 10px)
- Support customizable opacity (default: 0.8)
- Include proper backdrop-filter fallbacks for unsupported browsers
- Handle transparency gracefully across different backgrounds
- Support light and dark themes
- Implement smooth transitions for all property changes

### Jelly Physics

When implementing jelly physics:
- Use spring-based animations for natural movement
- Configure stiffness and damping parameters
- Implement proper easing functions
- Handle edge cases (rapid movements, boundary collisions)
- Optimize performance for 60fps animations

```typescript
interface JellyPhysicsConfig {
  stiffness: number;      // Default: 150
  damping: number;        // Default: 20
  mass: number;           // Default: 1
  elasticity: number;     // Default: 0.8
}
```

### Magnetic Following

Magnetic cursor following implementation:
- Calculate distance from cursor to element
- Apply magnetic force within threshold radius
- Smooth interpolation for natural movement
- Configurable magnetic strength and radius
- Performance optimization using requestAnimationFrame

```typescript
interface MagneticConfig {
  radius: number;         // Default: 100
  strength: number;       // Default: 0.5
  smoothing: number;      // Default: 0.15
}
```

### Cursor Lights

Cursor light effects should:
- Create radial gradient following cursor
- Support multiple light sources
- Configurable color, size, and intensity
- Blend modes for realistic lighting
- GPU-accelerated rendering

```typescript
interface CursorLightConfig {
  color: string;          // Default: 'rgba(255, 255, 255, 0.5)'
  size: number;           // Default: 200
  intensity: number;      // Default: 0.8
  blendMode: string;      // Default: 'screen'
}
```

### Event Handlers

- Prefix event handler functions with `handle` (e.g., `handleClick`)
- Keep handlers concise, extract complex logic to separate functions
- Use proper TypeScript event types

```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // handler logic
};
```

## Comments and Documentation

### When to Comment

- Complex algorithms or business logic
- Non-obvious workarounds or hacks
- Public API functions and components
- Configuration options

### JSDoc

Use JSDoc for exported functions and components:

```typescript
/**
 * Renders a glass-effect button with customizable styling
 * @param label - Button text content
 * @param onClick - Click event handler
 * @param variant - Visual style variant
 */
```

### Avoid Obvious Comments

Don't comment what the code clearly shows:

```typescript
// Bad
const count = 0; // Initialize count to 0

// Good
// Reset counter after successful submission
const count = 0;
```

## Testing Guidelines

### Test File Naming

- Place tests adjacent to source files
- Use `.test.tsx` or `.test.ts` extension
- Match the source file name (e.g., `GlassButton.test.tsx`)

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // test implementation
  });
  
  it('should handle user interaction', () => {
    // test implementation
  });
});
```

## Git Commit Messages

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples

```
feat(glass-button): add ripple effect animation
fix(glass-card): resolve transparency issue on Safari
docs(readme): update installation instructions
```

## Performance Best Practices

### React Performance

- Use `React.memo` for expensive components
- Implement proper dependency arrays in hooks
- Avoid creating functions inside render
- Use `useCallback` and `useMemo` appropriately

### CSS Performance

- Minimize use of expensive properties (box-shadow, backdrop-filter)
- Use transform and opacity for animations
- Avoid layout thrashing
- Optimize selector specificity

## Accessibility

### ARIA Labels

Provide proper ARIA labels for interactive elements:

```typescript
<button aria-label="Close dialog" onClick={handleClose}>
  X
</button>
```

### Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Implement proper focus management
- Support standard keyboard shortcuts

### Color Contrast

- Maintain WCAG AA compliance (4.5:1 for normal text)
- Test glass effects for readability
- Provide high contrast mode support

## Error Handling

### User-Facing Errors

- Display clear, actionable error messages
- Avoid exposing technical details to users
- Provide recovery options when possible

### Developer Errors

- Log errors with sufficient context
- Use proper error boundaries in React
- Validate inputs at boundaries

## Code Review Checklist

Before submitting code for review:

- [ ] Code follows style guidelines
- [ ] All functions have proper type definitions
- [ ] No console.log statements remain
- [ ] CSS follows BEM naming
- [ ] Components are properly documented
- [ ] No accessibility issues
- [ ] Performance considerations addressed
- [ ] Error handling implemented
- [ ] Code is DRY (Don't Repeat Yourself)

## Resources

### TypeScript

- Official TypeScript documentation
- React TypeScript cheatsheet

### React

- React documentation
- React hooks best practices

### CSS

- MDN CSS reference
- CSS-Tricks for glass morphism effects

### Accessibility

- WCAG guidelines
- ARIA authoring practices

## API Configuration

### glass-config.json

SmonthlAPI uses a JSON configuration file to define all glass component properties:

```json
{
  "blur": 10,
  "opacity": 0.8,
  "borderRadius": 12,
  "jellyPhysics": {
    "enabled": true,
    "stiffness": 150,
    "damping": 20,
    "mass": 1,
    "elasticity": 0.8
  },
  "magneticFollow": {
    "enabled": true,
    "radius": 100,
    "strength": 0.5,
    "smoothing": 0.15
  },
  "cursorLights": {
    "enabled": true,
    "color": "rgba(255, 255, 255, 0.5)",
    "size": 200,
    "intensity": 0.8,
    "blendMode": "screen"
  }
}
```

### SmonthlAPI Initialization

```javascript
// Initialize SmonthlAPI
const smonthlAPI = new SmonthlAPI();

// Load configuration from JSON file
smonthlAPI.loadConfig('./glass-config.json').then(config => {
  console.log('Config loaded:', config);
});

// Or load from localStorage
smonthlAPI.loadFromLocalStorage();
```

### Configuration Management

```javascript
// Update specific configuration value
smonthlAPI.updateConfig('glass.blur', 60);
smonthlAPI.updateConfig('jelly.elasticity', 0.6);
smonthlAPI.updateConfig('lighting.cursorFollowEnabled', true);

// Get configuration value
const blur = smonthlAPI.getConfig('glass.blur');
const elasticity = smonthlAPI.getConfig('jelly.elasticity');

// Export configuration as JSON string
const jsonString = smonthlAPI.exportConfig();

// Import configuration from JSON string
smonthlAPI.importConfig(jsonString);

// Save to localStorage
smonthlAPI.saveToLocalStorage();
```

### Template System

```javascript
// Get all available templates
const templates = smonthlAPI.getTemplates();
// Returns: { button: {...}, card: {...}, window: {...}, icon: {...}, menu: {...} }

// Create component from template
const buttonConfig = smonthlAPI.createFromTemplate('button');
const cardConfig = smonthlAPI.createFromTemplate('card');
const windowConfig = smonthlAPI.createFromTemplate('window');
```

### Event Listeners

```javascript
// Listen for configuration changes
smonthlAPI.on('configLoaded', (config) => {
  console.log('Configuration loaded:', config);
});

smonthlAPI.on('configUpdated', ({ path, value }) => {
  console.log(`Updated ${path} to ${value}`);
});

smonthlAPI.on('configImported', (config) => {
  console.log('Configuration imported:', config);
});
```

## SmonthlAPI Best Practices

### Configuration Structure

Always maintain the proper configuration structure:
- `componentType` - Type of component (liquid-glass, button, card, etc.)
- `glass` - Visual glass properties (transparency, blur, dimensions)
- `content` - Content configuration (text, icons, menu items)
- `jelly` - Physics properties (elasticity, friction, magnetic effects)
- `lighting` - Cursor light effects configuration
- `backgrounds` - Background images array
- `templates` - Reusable component templates

### Path-Based Updates

Use dot notation for nested configuration updates:
```javascript
smonthlAPI.updateConfig('glass.transparency', 6);
smonthlAPI.updateConfig('jelly.magneticStrength', 0.3);
smonthlAPI.updateConfig('lighting.lightIntensity', 0.8);
```

### Template Naming

Template names should be descriptive and lowercase:
- `button` - Glass button component
- `card` - Glass card component
- `window` - Glass window with drag/resize
- `icon` - Glass icon component
- `menu` - Glass menu component

## Conclusion

Consistent code style improves readability, maintainability, and collaboration when working with SmonthlAPI. When in doubt, prioritize clarity over cleverness, and always consider the next developer who will read your code. Focus on performance optimization for smooth animations and responsive interactions with liquid glass components.
