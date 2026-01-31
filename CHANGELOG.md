# Changelog

All notable changes to SmonthlAPI will be documented in this file.

## [2.0.1] - 2026-01-31

### Added - Creative Syntax Language & External Imports

#### Natural Language Syntax
- `make(what)` - Start building with natural language
- `with(props)` - Add properties
- `sized(width, height)` - Set dimensions
- `containing(content)` - Set content
- `styled(styles)` - Apply styles
- `build()` - Finalize and create config

#### External Resource System
- `import(resource)` - Load external CSS, JS, or JSON files
- `loadExternal(url, name)` - Load any external resource
- `useFont(family, url)` - Load any custom font from URL
- `useIcons(library, url)` - Load any icon library from URL
- `css(styles)` - Inject inline CSS styles

#### Presets & Themes
- `preset(name)` - Apply style presets: minimal, frosted, heavy, sharp, soft, neon, crystal
- `theme(colors)` - Apply color themes: ocean, sunset, forest, purple, gold
- `animate(type)` - Apply animation presets: bounce, smooth, snappy, slow, fast

#### Advanced Methods
- `from(syntax)` - Parse custom string syntax: "circle:100 icon:🚀 blur:80 jelly:on"
- `batch(operations)` - Execute multiple operations at once
- `clone()` - Clone current configuration
- `merge(config)` - Merge with another config
- `reset()` - Reset to defaults
- `getResources()` - Get all loaded external resources
- `cleanup()` - Remove all custom styles

### Examples

```javascript
// Natural language syntax
api.make('button')
   .sized(300, 70)
   .containing('Click Me')
   .styled({ blur: 80, transparency: 10 })
   .build();

// External imports
api.import('https://example.com/custom-styles.css')
   .import(['font.css', 'icons.css'])
   .import({ theme: 'theme.css', icons: 'icons.css' });

// Presets and themes
api.circle(100, '🚀')
   .preset('frosted')
   .theme('ocean')
   .animate('bounce');

// Custom syntax parsing
api.from('circle:100 icon:🚀 blur:80 jelly:on preset:neon theme:purple');

// Batch operations
api.batch([
  'circle:100 icon:⭐',
  'blur:80 jelly:on',
  api => api.preset('crystal').theme('sunset')
]);

// Custom font and icons from any URL
api.useFont('MyFont', 'https://example.com/font.woff2')
   .useIcons('custom', 'https://example.com/icons.css');
```

### Changed
- Enhanced external resource loading system
- Improved chainable API
- Better TypeScript type definitions

### Removed
- Demo files (temporary/sample files removed)

## [1.0.6] - 2026-01-31

### Added - Simple DSL Syntax
- **One-line creation methods**: `circle()`, `square()`, `button()`, `card()`, `icon()`, `window()`
- **Chainable methods**: `.blur()`, `.transparent()`, `.rounded()`, `.draggable()`, `.jelly()`, `.magnetic()`, `.lights()`, `.font()`, `.icons()`
- **All-in-one method**: `glass({...})` for complete configuration in one call
- **Icon library support**: Load Font Awesome, Material Icons, Bootstrap Icons, Feather, Ionicons
- **Google Fonts support**: Load custom fonts with `font()` and `loadGoogleFont()`
- **Typography configuration**: Set font family, sizes, weights, spacing

### Documentation
- Added `DSL_SYNTAX_GUIDE.md` - Comprehensive guide to the new DSL syntax
- Added `demo-dsl-showcase.html` - Interactive showcase of all DSL features
- Added example files:
  - `example-simple-syntax.html` - All DSL methods demonstrated
  - `example-create-circle.html` - Circle creation example
  - `example-create-button.html` - Button creation example
  - `example-all-shapes.js` - Node.js script generating configs
  - `example-react-usage.tsx` - React/TypeScript usage

### Changed
- Simplified API - No complex JavaScript grammar needed
- Improved TypeScript definitions with full DSL support
- Enhanced ContentConfig interface to support icon libraries

### Migration
Old syntax still works, but new DSL is recommended:
```javascript
// Old way
const config = api.createCircle(100, '🚀');

// New way (simpler!)
const config = api.circle(100, '🚀');
```

## [1.0.5] - 2026-01-31

### Added
- External icon library support (Font Awesome, Material Icons, etc.)
- Typography configuration system
- `loadIconLibrary()` method
- `loadFont()` and `loadGoogleFont()` methods
- `setTypography()` method
- `createIconWithLibrary()` method
- Demo configs with Font Awesome and Material Icons

### Documentation
- Updated README with icon library examples
- Added typography configuration guide

## [1.0.4] - 2026-01-31

### Added
- Feature enable/disable flags in config
- `draggable` flag to control drag behavior
- `magnifyingLens` flag to control lens effect
- `jelly.enabled` flag to control jelly physics
- `lighting.cursorFollowEnabled` flag to control cursor lights
- 10 demo configs showing different feature combinations

### Documentation
- Added feature control examples
- Updated JSON config guide

## [1.0.3] - 2026-01-31

### Changed
- Made HTML/React components read dimensions from config dynamically
- Removed hardcoded 700x140 dimensions
- Components now respect `glass.width` and `glass.height` from config

### Fixed
- Components now properly scale to configured dimensions
- Border radius scales correctly with component size

## [1.0.2] - 2026-01-31

### Added
- Flexible component creation API
- `createCircle()` method
- `createSquare()` method
- `createRectangle()` method
- `createIconButton()` method
- `createCustomComponent()` method
- `applyShape()` method with presets: circle, rounded, square, sharp, pill
- `setSize()`, `setIcon()`, `setTitle()` methods

### Documentation
- Added API method examples
- Updated usage guide with flexible component creation

## [1.0.1] - 2026-01-30

### Fixed
- npm package structure
- Documentation links
- Installation instructions

### Documentation
- Improved README
- Added USAGE.md
- Added STYLE_GUIDE.md

## [1.0.0] - 2026-01-30

### Initial Release
- SmonthlAPI HTML/JavaScript version
- SmonthlAPI React/TypeScript version
- Liquid glass effect with frosted glass appearance
- Jelly physics with elastic movement
- Magnetic following behavior
- Cursor-following lights
- Magnifying lens effect
- JSON configuration system
- Draggable components
- Background image rotation
- Control panel for live adjustments

### Features
- Glassmorphism effect with backdrop-filter
- Real-time blur and transparency controls
- Jelly physics with elasticity and friction
- Magnetic attraction to cursor
- Cursor-following light effects
- Configurable via JSON
- Template system
- Event system
- LocalStorage support
- Export/import configurations

### Packages
- `smonthl` - HTML/JavaScript version
- `smonthl-react` - React/TypeScript version

### Documentation
- README.md
- USAGE.md
- STYLE_GUIDE.md
- JSON_CONFIG_GUIDE.md
- LIQUID_GLASS_GUIDE.md
- FEATURES.md
- BUILD_AND_RUN.md
- VERSIONS.md

### License
Apache 2.0

---

## Version Format

This project follows [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backwards compatible manner
- PATCH version for backwards compatible bug fixes

## Links

- GitHub: https://github.com/Moude-AI/smonthl_api
- npm (HTML): https://www.npmjs.com/package/smonthl
- npm (React): https://www.npmjs.com/package/smonthl-react
- Issues: https://github.com/Moude-AI/smonthl_api/issues
