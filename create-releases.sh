#!/bin/bash

# Create GitHub Releases for SmonthlAPI
# Run this script to create all releases at once using GitHub CLI (gh)
# Make sure you have GitHub CLI installed: https://cli.github.com/

echo "Creating GitHub Releases for SmonthlAPI..."
echo ""

# v1.0.0
gh release create v1.0.0 \
  --title "v1.0.0 - Initial Release" \
  --notes "### Initial Release

- SmonthlAPI HTML/JavaScript version
- SmonthlAPI React/TypeScript version
- Liquid glass effect with frosted glass appearance
- Jelly physics with elastic movement
- Magnetic following behavior
- Cursor-following lights
- Magnifying lens effect
- JSON configuration system
- Draggable components

**Packages:**
- \`smonthl\` - HTML/JavaScript version
- \`smonthl-react\` - React/TypeScript version"

# v1.0.1
gh release create v1.0.1 \
  --title "v1.0.1 - Bug Fixes and Documentation" \
  --notes "### Fixed
- npm package structure
- Documentation links
- Installation instructions

### Documentation
- Improved README
- Added USAGE.md
- Added STYLE_GUIDE.md"

# v1.0.2
gh release create v1.0.2 \
  --title "v1.0.2 - Flexible Component System" \
  --notes "### Added
- Flexible component creation API
- \`createCircle()\` method
- \`createSquare()\` method
- \`createRectangle()\` method
- \`createIconButton()\` method
- \`createCustomComponent()\` method
- \`applyShape()\` method with presets: circle, rounded, square, sharp, pill
- \`setSize()\`, \`setIcon()\`, \`setTitle()\` methods

### Documentation
- Added API method examples
- Updated usage guide with flexible component creation"

# v1.0.3
gh release create v1.0.3 \
  --title "v1.0.3 - Improved Scaling and Responsiveness" \
  --notes "### Changed
- Made HTML/React components read dimensions from config dynamically
- Removed hardcoded 700x140 dimensions
- Components now respect \`glass.width\` and \`glass.height\` from config

### Fixed
- Components now properly scale to configured dimensions
- Border radius scales correctly with component size"

# v1.0.4
gh release create v1.0.4 \
  --title "v1.0.4 - Enhanced Configuration System" \
  --notes "### Added
- Feature enable/disable flags in config
- \`draggable\` flag to control drag behavior
- \`magnifyingLens\` flag to control lens effect
- \`jelly.enabled\` flag to control jelly physics
- \`lighting.cursorFollowEnabled\` flag to control cursor lights
- 10 demo configs showing different feature combinations

### Documentation
- Added feature control examples
- Updated JSON config guide"

# v1.0.5
gh release create v1.0.5 \
  --title "v1.0.5 - Typography and Documentation Updates" \
  --notes "### Added
- External icon library support (Font Awesome, Material Icons, etc.)
- Typography configuration system
- \`loadIconLibrary()\` method
- \`loadFont()\` and \`loadGoogleFont()\` methods
- \`setTypography()\` method
- \`createIconWithLibrary()\` method
- Demo configs with Font Awesome and Material Icons

### Documentation
- Updated README with icon library examples
- Added typography configuration guide"

# v1.0.6
gh release create v1.0.6 \
  --title "v1.0.6 - Simple DSL Syntax" \
  --notes "### Added - Simple DSL Syntax
- **One-line creation methods**: \`circle()\`, \`square()\`, \`button()\`, \`card()\`, \`icon()\`, \`window()\`
- **Chainable methods**: \`.blur()\`, \`.transparent()\`, \`.rounded()\`, \`.draggable()\`, \`.jelly()\`, \`.magnetic()\`, \`.lights()\`, \`.font()\`, \`.icons()\`
- **All-in-one method**: \`glass({...})\` for complete configuration in one call
- **Icon library support**: Load Font Awesome, Material Icons, Bootstrap Icons, Feather, Ionicons
- **Google Fonts support**: Load custom fonts with \`font()\` and \`loadGoogleFont()\`
- **Typography configuration**: Set font family, sizes, weights, spacing

### Documentation
- Added \`DSL_SYNTAX_GUIDE.md\` - Comprehensive guide to the new DSL syntax
- Added interactive showcase and examples

### Changed
- Simplified API - No complex JavaScript grammar needed
- Improved TypeScript definitions with full DSL support"

# v2.0.0
gh release create v2.0.0 \
  --title "v2.0.0 - Major Release with DSL and Advanced Features" \
  --notes "### 🚀 Major Release

Complete rewrite with advanced features and modern architecture.

### Highlights
- Creative Syntax Language (DSL)
- External resource loading
- Advanced component system
- Enhanced TypeScript support
- Modern build system

See CHANGELOG.md for full details."

# v2.0.1
gh release create v2.0.1 \
  --title "v2.0.1 - Creative Syntax Language & External Imports" \
  --notes "### Added - Creative Syntax Language & External Imports

#### Natural Language Syntax
- \`make(what)\` - Start building with natural language
- \`with(props)\` - Add properties
- \`sized(width, height)\` - Set dimensions
- \`containing(content)\` - Set content
- \`styled(styles)\` - Apply styles
- \`build()\` - Finalize and create config

#### External Resource System
- \`import(resource)\` - Load external CSS, JS, or JSON files
- \`loadExternal(url, name)\` - Load any external resource
- \`useFont(family, url)\` - Load any custom font from URL
- \`useIcons(library, url)\` - Load any icon library from URL

#### Presets & Themes
- \`preset(name)\` - Apply style presets
- \`theme(colors)\` - Apply color themes
- \`animate(type)\` - Apply animation presets

See CHANGELOG.md for examples and full documentation."

# v2.0.2-beta
gh release create v2.0.2-beta \
  --title "v2.0.2-beta - Extended Syntax Grammar" \
  --notes "### Added
- Extended syntax grammar for more creative expressions
- Enhanced liquid glass demo for Electron apps
- Improved DSL syntax capabilities

### Changed
- Updated Electron demo to showcase extended features
- Enhanced TypeScript definitions

**Note:** This is a beta release."

# v2.0.3
gh release create v2.0.3 \
  --title "v2.0.3 - Liquid Glass Text Features" \
  --notes "### Added - Liquid Glass Text Features

#### Text Creation Methods
- \`text(content, options)\` - Create liquid glass text
- \`number(num, options)\` - Create liquid glass numbers
- \`heading(text, level, options)\` - Create headings (h1-h6)
- \`paragraph(text, options)\` - Create paragraphs
- \`label(text, options)\` - Create labels

#### Specialized Text Effects
- \`animatedText()\` - Animated liquid glass text
- \`glowText()\` - Glowing liquid glass text
- \`gradientText()\` - Gradient liquid glass text
- \`neonText()\` - Neon-style liquid glass text
- \`frostedText()\` - Heavily frosted text
- \`crystalText()\` - Crystal-clear text

#### Advanced Features
- \`multilineText()\` - Multi-line text
- \`counter()\` - Animated number counter
- Animation types: float, pulse, glow, wave, shimmer

See CHANGELOG.md for examples."

# v2.0.4-beta
gh release create v2.0.4-beta \
  --title "v2.0.4-beta - Plugin System & Resource Loaders" \
  --notes "### Added - Plugin System & Resource Loaders

#### Plugin System
- \`use(plugin, options)\` - Use plugins to extend functionality
- \`getPlugins()\` - Get all installed plugins

#### Resource Loading
- \`loadResource(url, type)\` - Load external resources
- \`loadResources(resources)\` - Load multiple resources
- \`loadCDN(library, version)\` - Load from CDN (GSAP, Anime.js, etc.)
- \`loadNPM(packageName, file)\` - Load from unpkg CDN
- \`loadGitHub(user, repo, path)\` - Load from GitHub

#### Resource Management
- \`preload(resources)\` - Preload resources
- \`clearCache()\` - Clear resource cache
- \`getCacheStats()\` - Get cache statistics

#### Plugin Marketplace
- \`installPlugin(name)\` - Install predefined plugins (particles, animations, charts)

**Note:** This is a beta release."

# v2.0.5
gh release create v2.0.5 \
  --title "v2.0.5 - Full Code Features" \
  --notes "### Added - Full Code Features

#### Code Execution Engine
- \`code(source, language, options)\` - Execute code with sandbox
- Safe code execution with expression evaluation

#### Syntax Highlighting
- \`highlight(source, language, theme)\` - Syntax highlighting
- Support for JavaScript, JSON, and more
- Dark/light themes

#### Code Transformation
- \`transform(source, transformer)\` - Code transformation
  - minify, beautify, obfuscate, transpile, optimize

#### Code Analysis
- \`analyze(source, language)\` - Comprehensive analysis
  - Line/character/word count
  - Function and variable detection
  - Cyclomatic complexity
  - Dependency extraction

#### Code Templates & Snippets
- \`codeTemplate(name, variables)\` - Generate from templates
- \`snippet(name, language)\` - Common code snippets

#### Code Tools
- \`playground()\` - Interactive code playground
- \`diff()\` - Code comparison
- \`lint()\` - Code linting
- \`format()\` - Code formatting
- \`profile()\` - Performance profiling
- \`bundle()\` - Simple code bundler

See CHANGELOG.md for examples."

# v2.0.6
gh release create v2.0.6 \
  --title "v2.0.6 - Expanded Features (Advanced Code, Styles & Syntax)" \
  --notes "### Added - Expanded Features

#### Advanced Style System
- \`style()\`, \`css()\` - CSS-in-JS styling
- \`tw()\` - Tailwind-like utilities
- \`animate()\` - Advanced animations
- \`keyframes()\` - Custom animations
- \`transition()\`, \`transform()\`, \`filter()\` - CSS builders

#### Advanced Code Execution
- \`executeAsync()\` - Web Worker execution
- \`compile()\` - Code compiler
- \`parse()\` - AST parser
- \`refactor()\` - Code refactoring
- \`search()\`, \`replace()\` - Code search/replace

#### Extended Syntax Features
- \`parseSyntax()\` - Extended parser with templates, loops, conditionals
- \`expandMacros()\` - Macro expansion
- \`presetExpanded()\` - Extended presets

#### Component Composition
- \`compose()\` - Compose components
- \`layout()\` - Layout system (flex, grid, stack)
- \`responsive()\` - Responsive design
- \`darkMode()\` - Dark mode support

#### Theme & State Management
- \`createTheme()\`, \`applyTheme()\` - Theme system
- \`setVar()\`, \`getVar()\`, \`computed()\`, \`watch()\` - Variables
- \`on()\`, \`emit()\` - Event system
- \`state()\` - Reactive state management

See CHANGELOG.md for examples."

# v2.0.7
gh release create v2.0.7 \
  --title "v2.0.7 - AI-Style Chain Builder & Performance Monitoring" \
  --notes "### 🚀 Added - AI-Style Chain Builder & Performance Monitoring

#### Feature 1: AI-Style Chain Builder
Advanced chainable operations with natural language flow:

- \`chain()\` - Create chain builder
  - \`.then()\` - Add operation
  - \`.if()\` - Conditional operations
  - \`.repeat()\` - Repeat operations
  - \`.delay()\` - Add delays
  - \`.parallel()\` - Parallel execution
  - \`.sequence()\` - Sequential execution
  - \`.execute()\` - Execute chain

#### Feature 2: Performance Monitoring
Real-time performance tracking and optimization:

- \`monitor()\` - Create performance monitor
  - \`.startTracking()\` - Track FPS, memory, operations
  - \`.trackOperation()\` - Track sync operations
  - \`.trackAsync()\` - Track async operations
  - \`.getMetrics()\` - Get detailed metrics
  - \`.optimize()\` - Get optimization suggestions
  - \`.report()\` - Generate performance report
  - \`.autoOptimize()\` - Auto-apply optimizations

#### Batch Processing
- \`batchProcess()\` - Process large datasets efficiently
- Progress tracking with callbacks
- Parallel or sequential processing

#### Utility Helpers
- \`memoize()\` - Memoize expensive functions
- \`debounce()\` - Debounce function execution
- \`throttle()\` - Throttle function execution

### Performance Metrics
- FPS (Frames Per Second)
- Memory Usage (MB)
- Operation Duration
- Performance Score (0-100)

See CHANGELOG.md for examples and full documentation."

echo ""
echo "✅ All releases created successfully!"
echo "View releases at: https://github.com/Moude-AI/smonthl_api/releases"
