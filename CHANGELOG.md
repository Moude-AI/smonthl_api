# Changelog

All notable changes to SmonthlAPI will be documented in this file.

## [2.0.7] - 2026-01-31

### Added - AI-Style Chain Builder & Performance Monitoring

#### Feature 1: AI-Style Chain Builder
Advanced chainable operations with natural language flow for complex workflows:

- `chain()` - Create a chain builder for sequential operations
  - `.then(operation)` - Add operation to chain
  - `.if(condition, trueOp, falseOp)` - Conditional operations
  - `.repeat(times, operation)` - Repeat operations
  - `.delay(ms)` - Add delays between operations
  - `.parallel(...operations)` - Execute operations in parallel
  - `.sequence(...operations)` - Execute operations in sequence
  - `.execute()` - Execute chain asynchronously
  - `.build()` - Build and execute chain synchronously

#### Feature 2: Performance Monitoring & Optimization
Real-time performance tracking and automatic optimization:

- `monitor()` - Create performance monitor
  - `.startTracking()` - Start tracking FPS, memory, operations
  - `.trackOperation(name, fn)` - Track synchronous operation performance
  - `.trackAsync(name, fn)` - Track asynchronous operation performance
  - `.getMetrics()` - Get detailed performance metrics
  - `.optimize()` - Analyze and suggest optimizations
  - `.report()` - Generate console performance report
  - `.autoOptimize()` - Automatically apply optimizations

#### Batch Processing
- `batchProcess(items, processor, options)` - Process large datasets efficiently
  - Options: `batchSize`, `delay`, `onProgress`, `onComplete`, `parallel`
  - Progress tracking with percentage
  - Parallel or sequential processing

#### Utility Helpers
- `memoize(fn, keyGenerator)` - Memoize expensive function calls
- `debounce(fn, delay)` - Debounce function execution
- `throttle(fn, limit)` - Throttle function execution

### Examples

```javascript
// AI-Style Chain Builder
api.chain()
   .then(api => api.circle(100, '🚀'))
   .then(api => api.blur(80))
   .if(
     () => window.innerWidth > 768,
     api => api.preset('frosted'),
     api => api.preset('minimal')
   )
   .repeat(3, (api, i) => {
     api.icon(['⭐', '🌙', '☀️'][i], 60);
   })
   .delay(1000)
   .parallel(
     api => api.animate('bounce'),
     api => api.theme('ocean')
   )
   .execute();

// Performance Monitoring
const monitor = api.monitor();
monitor.startTracking();

// Track operations
monitor.trackOperation('createCircle', () => {
  api.circle(100, '🎯').preset('crystal');
});

await monitor.trackAsync('loadResources', async () => {
  await api.loadCDN('gsap');
});

// Get performance report
const report = monitor.report();
// Output:
// 🔍 SmonthlAPI Performance Report
// 📊 Metrics: { fps: 60, memoryUsage: 45.2, ... }
// ⚡ Performance Score: 95/100
// ✅ No optimizations needed!

// Auto-optimize if needed
monitor.autoOptimize();

// Batch Processing with Progress
await api.batchProcess(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  async (item) => {
    return api.circle(item * 10, `${item}`);
  },
  {
    batchSize: 3,
    delay: 100,
    parallel: true,
    onProgress: (progress) => {
      console.log(`Progress: ${progress.percentage}%`);
    },
    onComplete: (results) => {
      console.log('All done!', results);
    }
  }
);

// Memoization for expensive operations
const expensiveOperation = api.memoize((n) => {
  // Heavy computation
  return fibonacci(n);
});

// Debounce user input
const handleInput = api.debounce((value) => {
  api.search(value);
}, 300);

// Throttle scroll events
const handleScroll = api.throttle(() => {
  api.updatePosition();
}, 100);
```

### Performance Metrics Tracked
- **FPS (Frames Per Second)** - Real-time frame rate monitoring
- **Memory Usage** - JavaScript heap size in MB
- **Operation Duration** - Time taken for each operation
- **Total Time** - Overall execution time
- **Average Operation Time** - Mean duration across all operations
- **Slowest Operation** - Identifies performance bottlenecks

### Auto-Optimization Features
- Automatically reduces blur when FPS drops below 30
- Clears resource cache when memory usage exceeds 100MB
- Provides actionable suggestions for performance improvements
- Calculates performance score (0-100) based on metrics

### Changed
- Enhanced chainable API with conditional and loop support
- Improved async operation handling
- Better performance tracking and optimization

## [2.0.6] - 2026-01-31

### Added - Expanded Features: Advanced Code, Styles & Syntax

#### Advanced Style System
- `style(styleObject)` - Apply multiple style properties at once from object
- `css(styles)` - CSS-in-JS style builder for custom styling
- `tw(classes)` - Tailwind-like utility classes: blur-sm/md/lg/xl, rounded-sm/md/lg/xl/full, shadow-sm/md/lg/xl, glow-sm/md/lg/xl
- `animate(name, options)` - Advanced animations: fadeIn, fadeOut, slideIn, slideOut, zoomIn, zoomOut, rotate, pulse, bounce, shake, flip, swing
- `keyframes(name, frames)` - Custom keyframe animation builder
- `transition(property, duration, easing)` - CSS transition builder
- `transform(transforms)` - CSS transform builder
- `filter(filters)` - CSS filter builder

#### Advanced Code Execution
- `executeAsync(code, options)` - Execute code in Web Worker with timeout protection
- `compile(source, target, options)` - Code compiler with target specification (es5, es6, etc.)
- `parse(source, language)` - AST parser for code analysis
- `refactor(source, rules)` - Code refactoring: removeComments, modernize, addTypes
- `search(source, pattern, options)` - Search code with regex patterns
- `replace(source, pattern, replacement, options)` - Replace code patterns

#### Extended Syntax Features
- `parseSyntax(syntax, extended)` - Extended syntax parser with template literals, loops, conditionals
  - Template literals: `${expression}` for dynamic values
  - Loops: `@for item in [array]` for iteration
  - Conditionals: `@if (condition) {content}` for conditional rendering
- `expandMacros(syntax)` - Macro expansion system for reusable patterns
- `presetExpanded(name, customizations)` - Extended presets: glass, frosted, crystal, neon, minimal, bold, soft, sharp, liquid, metallic

#### Component Composition
- `compose(...components)` - Compose multiple components together
- `layout(type, children, options)` - Layout system: flex, grid, stack, row, center
- `responsive(breakpoints)` - Responsive design with breakpoint configuration
- `darkMode(darkStyles)` - Dark mode support with style overrides

#### Theme & Variable System
- `createTheme(name, theme)` - Create custom themes
- `applyTheme(name)` - Apply created themes
- `setVar(name, value)` - Set custom variables
- `getVar(name, defaultValue)` - Get custom variables
- `computed(fn)` - Computed properties
- `watch(property, callback)` - Property watchers

#### Event & State Management
- `on(event, handler)` - Event system for custom events
- `emit(event, data)` - Emit custom events
- `state(initialState)` - State management with Proxy-based reactivity
- `getState()` - Get current state
- `setState(updates)` - Update state

### Examples

```javascript
// Advanced styling with Tailwind-like utilities
api.button(200, 60, 'Click Me')
   .tw('blur-lg rounded-xl shadow-lg glow-md')
   .animate('bounce', { duration: 1000 });

// Custom keyframe animations
api.keyframes('customFloat', {
  '0%': { transform: 'translateY(0px)', opacity: '1' },
  '50%': { transform: 'translateY(-20px)', opacity: '0.8' },
  '100%': { transform: 'translateY(0px)', opacity: '1' }
});

// Advanced code execution in Web Worker
const result = await api.executeAsync(`
  function fibonacci(n) {
    return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);
  }
  fibonacci(10);
`, { timeout: 3000 });

// Code refactoring
api.refactor(sourceCode, {
  removeComments: true,
  modernize: true,
  addTypes: true
});

// Extended syntax with conditionals and loops
api.parseSyntax(`
  @if (${isActive}) {
    blur:80 glow:30
  }
  @for item in [1,2,3] {
    circle:${item * 50}
  }
`);

// Component composition
api.compose(
  api.circle(100, '🚀').preset('crystal'),
  api.button(200, 60, 'Launch').preset('neon'),
  api.card('Mission', 'Ready', 300, 200).preset('frosted')
);

// Layout system
api.layout('flex', [
  api.icon('⭐', 80),
  api.icon('🌙', 80),
  api.icon('☀️', 80)
], { gap: '20px', justifyContent: 'space-around' });

// Theme system
api.createTheme('cyberpunk', {
  blur: 60,
  transparency: 8,
  rounded: 4,
  glow: 40
}).applyTheme('cyberpunk');

// State management with reactivity
api.state({ count: 0, active: false })
   .watch('count', (value) => console.log('Count changed:', value))
   .on('increment', () => {
     const state = api.getState();
     api.setState({ count: state.count + 1 });
   });

// Responsive design
api.button(200, 60, 'Responsive')
   .responsive({
     mobile: { width: 150, height: 50 },
     tablet: { width: 200, height: 60 },
     desktop: { width: 250, height: 70 }
   });

// Dark mode support
api.card('Title', 'Content', 300, 200)
   .darkMode({
     blur: 100,
     transparency: 5,
     glow: 50
   });
```

### Changed
- Enhanced code execution with Web Worker support
- Improved syntax parser with advanced features
- Extended preset system with more options
- Better TypeScript type definitions for new features

### Technical Details
- Web Worker-based code execution for safety
- Proxy-based reactive state management
- CSS-in-JS support for dynamic styling
- AST parsing for code analysis
- Macro system for reusable patterns
- Event-driven architecture
- Responsive breakpoint system
- Theme management system

## [2.0.5] - 2026-01-31

### Added - Full Code Features (Final v2 Release)

#### Code Execution Engine
- `code(source, language, options)` - Execute code with sandbox support
- `_executeCode(source, language, options)` - Safe code execution
- `_evaluateExpression(expr, context)` - Mathematical/logical expression evaluation

#### Syntax Highlighting
- `highlight(source, language, theme)` - Syntax highlighting for code
- `_highlightSyntax(source, language, theme)` - Highlighter with dark/light themes
- Support for JavaScript, JSON, and more languages

#### Code Transformation
- `transform(source, transformer, options)` - Code transformation system
  - `minify` - Minify code
  - `beautify` - Beautify/format code
  - `obfuscate` - Obfuscate variable names
  - `transpile` - ES6 to ES5 transpilation
  - `optimize` - Remove console.logs and comments

#### Code Analysis
- `analyze(source, language)` - Comprehensive code analysis
  - Line count, character count, word count
  - Function and variable detection
  - Cyclomatic complexity calculation
  - Dependency extraction

#### Code Templates
- `codeTemplate(name, variables)` - Generate code from templates
  - `component` - React/class component template
  - `function` - Function template
  - `class` - Class template
  - `api` - API fetch template
  - `module` - ES6 module template

#### Code Snippets Library
- `snippet(name, language)` - Common code snippets
  - `debounce` - Debounce function
  - `throttle` - Throttle function
  - `deepClone` - Deep clone object
  - `curry` - Curry function
  - `memoize` - Memoization function

#### Code Tools
- `playground(initialCode, options)` - Interactive code playground
- `diff(code1, code2, options)` - Code comparison/diff
- `lint(source, rules)` - Code linting
- `format(source, style)` - Code formatting (standard, compact, google, airbnb)
- `document(source, format)` - Documentation generator
- `test(source, tests, options)` - Code testing
- `profile(fn, iterations)` - Performance profiling
- `bundle(modules, options)` - Simple code bundler

### Examples

```javascript
// Execute code with sandbox
const result = api.code('2 + 2', 'javascript', { execute: true });

// Syntax highlighting
const highlighted = api.highlight(`
function hello() {
  console.log('Hello World');
}
`, 'javascript', 'dark');

// Code transformation
const minified = api.transform(sourceCode, 'minify');
const beautified = api.transform(sourceCode, 'beautify');
const transpiled = api.transform(es6Code, 'transpile');

// Code analysis
const analysis = api.analyze(sourceCode, 'javascript');
// Returns: { lines, characters, words, functions, variables, complexity, dependencies }

// Generate from template
const component = api.codeTemplate('component', {
  name: 'MyComponent',
  template: '<div>Hello</div>'
});

// Use code snippets
const debounce = api.snippet('debounce', 'javascript');
const throttle = api.snippet('throttle', 'javascript');

// Code playground
const playground = api.playground('console.log("Hello")', {
  language: 'javascript',
  theme: 'dark',
  autoRun: true
});

// Code diff
const differences = api.diff(oldCode, newCode);

// Code linting
const issues = api.lint(sourceCode, {
  noConsole: true,
  noVar: true,
  semicolons: true
});

// Performance profiling
const perf = api.profile(() => {
  // Your code here
}, 1000);
// Returns: { iterations, totalTime, averageTime, opsPerSecond }
```

### Changed
- Renamed `template()` to `codeTemplate()` to avoid conflict with DSL template method
- Enhanced TypeScript definitions with code feature types
- Extended ContentConfig interface for code-related content types

## [2.0.4-beta] - 2026-01-31

### Added - Plugin System & Resource Loaders

#### Plugin System
- `use(plugin, options)` - Use plugins to extend functionality
- `getPlugins()` - Get all installed plugins

#### Resource Loading
- `loadResource(url, type)` - Load external resources with caching
- `loadResources(resources)` - Load multiple resources at once
- `_loadCSS(url)` - Load CSS files
- `_loadScript(url)` - Load JavaScript files

#### CDN Loaders
- `loadCDN(library, version)` - Load popular libraries from CDN
  - GSAP - Animation library
  - Anime.js - Animation engine
  - Particles.js - Particle effects
  - Chart.js - Charting library
  - D3 - Data visualization

#### Package Loaders
- `loadNPM(packageName, file)` - Load packages from unpkg CDN
- `loadGitHub(user, repo, path, branch)` - Load files from GitHub

#### Resource Management
- `preload(resources)` - Preload resources for better performance
- `clearCache()` - Clear resource cache
- `getCacheStats()` - Get cache statistics

#### Plugin Marketplace
- `installPlugin(name, options)` - Install predefined plugins
  - `particles` - Particle effects
  - `animations` - GSAP animations
  - `charts` - Chart.js integration

### Examples

```javascript
// Use a plugin
api.use(myPlugin, { option1: true });

// Load from CDN
await api.loadCDN('gsap', '3.12.0');
await api.loadCDN('anime', 'latest');

// Load from npm
await api.loadNPM('lodash', 'lodash.min.js');

// Load from GitHub
await api.loadGitHub('user', 'repo', 'src/file.js', 'main');

// Preload resources
api.preload([
  'https://cdn.example.com/lib1.js',
  'https://cdn.example.com/lib2.css'
]);

// Install plugin from marketplace
await api.installPlugin('particles');
await api.installPlugin('animations');

// Cache management
const stats = api.getCacheStats();
api.clearCache();
```

## [2.0.3] - 2026-01-31

### Added - Liquid Glass Text Features

#### Text Creation Methods
- `text(content, options)` - Create liquid glass text with full customization
- `number(num, options)` - Create liquid glass numbers with gradient effects
- `heading(text, level, options)` - Create liquid glass headings (h1-h6)
- `paragraph(text, options)` - Create liquid glass paragraphs
- `label(text, options)` - Create liquid glass labels

#### Specialized Text Effects
- `animatedText(text, animationType, options)` - Animated liquid glass text
- `glowText(text, color, options)` - Glowing liquid glass text
- `gradientText(text, colors, options)` - Gradient liquid glass text
- `neonText(text, color, options)` - Neon-style liquid glass text
- `frostedText(text, options)` - Heavily frosted liquid glass text
- `crystalText(text, options)` - Crystal-clear liquid glass text

#### Advanced Text Features
- `multilineText(lines, options)` - Multi-line liquid glass text
- `counter(start, end, duration, options)` - Animated number counter
- `injectTextAnimations()` - Inject CSS animations for text
- `_getTextAnimation(type)` - Get animation CSS for text types

#### Text Customization Options
- Font size, weight, letter spacing
- Blur intensity and transparency
- Glow effects with custom colors and intensity
- Gradient backgrounds with multiple colors
- Text stroke/outline effects
- Shadow effects
- Animation types: float, pulse, glow, wave, shimmer

### Examples

```javascript
// Basic liquid glass text
api.text('Hello World', {
  fontSize: 48,
  blur: 60,
  glow: true,
  glowColor: '255, 255, 255'
});

// Liquid glass number with gradient
api.number(42, {
  fontSize: 72,
  gradient: true,
  gradientColors: ['#60a5fa', '#3b82f6', '#2563eb']
});

// Animated neon text
api.neonText('NEON', '#00ffff', {
  fontSize: 64,
  animate: true,
  animationType: 'pulse'
});

// Multi-line liquid glass text
api.multilineText([
  'Line 1',
  'Line 2',
  'Line 3'
], { fontSize: 36, blur: 50 });

// Animated counter
api.counter(0, 100, 2000, {
  fontSize: 72,
  gradient: true
});
```

## [2.0.2-beta] - 2026-01-31

### Added
- Extended syntax grammar for more creative expressions
- Enhanced liquid glass demo for Electron apps
- Improved DSL syntax capabilities

### Changed
- Updated Electron demo to showcase extended features
- Enhanced TypeScript definitions

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
