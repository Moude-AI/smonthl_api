#!/bin/bash

# Build and Release SmonthlAPI with npm packages and Electron apps
# This script builds everything and creates GitHub releases with assets

set -e  # Exit on error

echo "🚀 SmonthlAPI Build and Release Script"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Version
VERSION="2.0.7"

echo -e "${BLUE}📦 Step 1: Building npm packages...${NC}"
echo ""

# Build HTML version npm package
echo "Building smonthl (HTML version)..."
cd html-ver
npm pack
HTML_PACKAGE=$(ls smonthl-*.tgz | tail -n 1)
mv "$HTML_PACKAGE" ../releases/
cd ..
echo -e "${GREEN}✓ Built: releases/$HTML_PACKAGE${NC}"

# Build React version npm package
echo "Building smonthl-react (React version)..."
cd tsx-react-ver
npm run build
npm pack
REACT_PACKAGE=$(ls smonthl-react-*.tgz | tail -n 1)
mv "$REACT_PACKAGE" ../releases/
cd ..
echo -e "${GREEN}✓ Built: releases/$REACT_PACKAGE${NC}"

echo ""
echo -e "${BLUE}🖥️  Step 2: Building Electron apps...${NC}"
echo ""

# Build HTML Electron app
echo "Building HTML Electron app..."
cd html-ver
npm run build 2>/dev/null || echo "Building Electron app..."

# Check if dist folder exists
if [ -d "dist" ]; then
  # Find and copy built apps
  if [ -f "dist/smonthl-liquid-glass-html-${VERSION}.deb" ]; then
    cp "dist/smonthl-liquid-glass-html-${VERSION}.deb" ../releases/
    echo -e "${GREEN}✓ Built: smonthl-liquid-glass-html-${VERSION}.deb${NC}"
  fi
  
  if [ -f "dist/smonthl-liquid-glass-html-${VERSION}.exe" ]; then
    cp "dist/smonthl-liquid-glass-html-${VERSION}.exe" ../releases/
    echo -e "${GREEN}✓ Built: smonthl-liquid-glass-html-${VERSION}.exe${NC}"
  fi
  
  if [ -f "dist/smonthl-liquid-glass-html-${VERSION}.dmg" ]; then
    cp "dist/smonthl-liquid-glass-html-${VERSION}.dmg" ../releases/
    echo -e "${GREEN}✓ Built: smonthl-liquid-glass-html-${VERSION}.dmg${NC}"
  fi
else
  echo -e "${YELLOW}⚠ No dist folder found for HTML version${NC}"
fi
cd ..

# Build React Electron app
echo "Building React Electron app..."
cd tsx-react-ver
npm run build:electron 2>/dev/null || echo "Building Electron app..."

# Check if dist folder exists
if [ -d "dist" ]; then
  # Find and copy built apps
  if [ -f "dist/smonthl-liquid-glass-react-${VERSION}.deb" ]; then
    cp "dist/smonthl-liquid-glass-react-${VERSION}.deb" ../releases/
    echo -e "${GREEN}✓ Built: smonthl-liquid-glass-react-${VERSION}.deb${NC}"
  fi
  
  if [ -f "dist/smonthl-liquid-glass-react-${VERSION}.exe" ]; then
    cp "dist/smonthl-liquid-glass-react-${VERSION}.exe" ../releases/
    echo -e "${GREEN}✓ Built: smonthl-liquid-glass-react-${VERSION}.exe${NC}"
  fi
  
  if [ -f "dist/smonthl-liquid-glass-react-${VERSION}.dmg" ]; then
    cp "dist/smonthl-liquid-glass-react-${VERSION}.dmg" ../releases/
    echo -e "${GREEN}✓ Built: smonthl-liquid-glass-react-${VERSION}.dmg${NC}"
  fi
else
  echo -e "${YELLOW}⚠ No dist folder found for React version${NC}"
fi
cd ..

echo ""
echo -e "${BLUE}📋 Step 3: Creating GitHub releases...${NC}"
echo ""

# Function to create release with assets
create_release() {
  local tag=$1
  local title=$2
  local notes=$3
  
  echo "Creating release: $tag"
  
  # Create release
  gh release create "$tag" \
    --title "$title" \
    --notes "$notes" \
    2>/dev/null || echo "Release $tag already exists, updating..."
  
  # Upload assets if this is the latest version
  if [ "$tag" == "v${VERSION}" ]; then
    echo "Uploading assets for $tag..."
    
    # Upload npm packages
    if [ -f "releases/smonthl-${VERSION}.tgz" ]; then
      gh release upload "$tag" "releases/smonthl-${VERSION}.tgz" --clobber 2>/dev/null || true
      echo -e "${GREEN}  ✓ Uploaded npm package (HTML)${NC}"
    fi
    
    if [ -f "releases/smonthl-react-${VERSION}.tgz" ]; then
      gh release upload "$tag" "releases/smonthl-react-${VERSION}.tgz" --clobber 2>/dev/null || true
      echo -e "${GREEN}  ✓ Uploaded npm package (React)${NC}"
    fi
    
    # Upload Electron apps
    for file in releases/*.deb releases/*.exe releases/*.dmg; do
      if [ -f "$file" ]; then
        gh release upload "$tag" "$file" --clobber 2>/dev/null || true
        echo -e "${GREEN}  ✓ Uploaded $(basename $file)${NC}"
      fi
    done
  fi
  
  echo ""
}

# Create releases directory
mkdir -p releases

# Create all releases (only latest gets assets)
create_release "v1.0.0" "v1.0.0 - Initial Release" "### Initial Release

- SmonthlAPI HTML/JavaScript version
- SmonthlAPI React/TypeScript version
- Liquid glass effect with frosted glass appearance
- Jelly physics with elastic movement
- Magnetic following behavior
- Cursor-following lights
- Magnifying lens effect
- JSON configuration system

**Packages:**
- \`smonthl\` - HTML/JavaScript version
- \`smonthl-react\` - React/TypeScript version"

create_release "v1.0.1" "v1.0.1 - Bug Fixes and Documentation" "### Fixed
- npm package structure
- Documentation links
- Installation instructions

### Documentation
- Improved README
- Added USAGE.md
- Added STYLE_GUIDE.md"

create_release "v1.0.2" "v1.0.2 - Flexible Component System" "### Added
- Flexible component creation API
- \`createCircle()\`, \`createSquare()\`, \`createRectangle()\` methods
- \`createIconButton()\`, \`createCustomComponent()\` methods
- \`applyShape()\` method with presets
- \`setSize()\`, \`setIcon()\`, \`setTitle()\` methods"

create_release "v1.0.3" "v1.0.3 - Improved Scaling and Responsiveness" "### Changed
- Made HTML/React components read dimensions from config dynamically
- Removed hardcoded dimensions
- Components now respect \`glass.width\` and \`glass.height\`

### Fixed
- Components properly scale to configured dimensions
- Border radius scales correctly"

create_release "v1.0.4" "v1.0.4 - Enhanced Configuration System" "### Added
- Feature enable/disable flags in config
- \`draggable\`, \`magnifyingLens\` flags
- \`jelly.enabled\`, \`lighting.cursorFollowEnabled\` flags
- 10 demo configs showing different feature combinations"

create_release "v1.0.5" "v1.0.5 - Typography and Documentation Updates" "### Added
- External icon library support (Font Awesome, Material Icons)
- Typography configuration system
- \`loadIconLibrary()\`, \`loadFont()\`, \`loadGoogleFont()\` methods
- \`setTypography()\`, \`createIconWithLibrary()\` methods"

create_release "v1.0.6" "v1.0.6 - Simple DSL Syntax" "### Added - Simple DSL Syntax
- One-line creation methods: \`circle()\`, \`square()\`, \`button()\`, \`card()\`, \`icon()\`, \`window()\`
- Chainable methods: \`.blur()\`, \`.transparent()\`, \`.rounded()\`, \`.draggable()\`, \`.jelly()\`
- All-in-one method: \`glass({...})\`
- Icon library support: Font Awesome, Material Icons, Bootstrap Icons
- Google Fonts support
- Typography configuration"

create_release "v2.0.0" "v2.0.0 - Major Release with DSL and Advanced Features" "### 🚀 Major Release

Complete rewrite with advanced features and modern architecture.

### Highlights
- Creative Syntax Language (DSL)
- External resource loading
- Advanced component system
- Enhanced TypeScript support
- Modern build system

See CHANGELOG.md for full details."

create_release "v2.0.1" "v2.0.1 - Creative Syntax Language & External Imports" "### Added - Creative Syntax Language & External Imports

#### Natural Language Syntax
- \`make(what)\`, \`with(props)\`, \`sized(width, height)\`
- \`containing(content)\`, \`styled(styles)\`, \`build()\`

#### External Resource System
- \`import(resource)\` - Load external CSS, JS, JSON
- \`loadExternal(url, name)\`
- \`useFont(family, url)\`, \`useIcons(library, url)\`

#### Presets & Themes
- \`preset(name)\` - Style presets
- \`theme(colors)\` - Color themes
- \`animate(type)\` - Animation presets"

create_release "v2.0.2-beta" "v2.0.2-beta - Extended Syntax Grammar" "### Added
- Extended syntax grammar for more creative expressions
- Enhanced liquid glass demo for Electron apps
- Improved DSL syntax capabilities

**Note:** This is a beta release."

create_release "v2.0.3" "v2.0.3 - Liquid Glass Text Features" "### Added - Liquid Glass Text Features

#### Text Creation Methods
- \`text()\`, \`number()\`, \`heading()\`, \`paragraph()\`, \`label()\`

#### Specialized Text Effects
- \`animatedText()\`, \`glowText()\`, \`gradientText()\`
- \`neonText()\`, \`frostedText()\`, \`crystalText()\`

#### Advanced Features
- \`multilineText()\` - Multi-line text
- \`counter()\` - Animated number counter
- Animation types: float, pulse, glow, wave, shimmer"

create_release "v2.0.4-beta" "v2.0.4-beta - Plugin System & Resource Loaders" "### Added - Plugin System & Resource Loaders

#### Plugin System
- \`use(plugin, options)\`, \`getPlugins()\`

#### Resource Loading
- \`loadResource()\`, \`loadResources()\`
- \`loadCDN()\` - GSAP, Anime.js, Particles.js, Chart.js, D3
- \`loadNPM()\`, \`loadGitHub()\`

#### Resource Management
- \`preload()\`, \`clearCache()\`, \`getCacheStats()\`

#### Plugin Marketplace
- \`installPlugin()\` - particles, animations, charts

**Note:** This is a beta release."

create_release "v2.0.5" "v2.0.5 - Full Code Features" "### Added - Full Code Features

#### Code Execution Engine
- \`code()\` - Execute code with sandbox

#### Syntax Highlighting
- \`highlight()\` - Syntax highlighting with themes

#### Code Transformation
- \`transform()\` - minify, beautify, obfuscate, transpile, optimize

#### Code Analysis
- \`analyze()\` - Comprehensive code analysis

#### Code Templates & Snippets
- \`codeTemplate()\`, \`snippet()\`

#### Code Tools
- \`playground()\`, \`diff()\`, \`lint()\`, \`format()\`, \`profile()\`, \`bundle()\`"

create_release "v2.0.6" "v2.0.6 - Expanded Features (Advanced Code, Styles & Syntax)" "### Added - Expanded Features

#### Advanced Style System
- \`style()\`, \`css()\`, \`tw()\` - Tailwind-like utilities
- \`animate()\`, \`keyframes()\`, \`transition()\`, \`transform()\`, \`filter()\`

#### Advanced Code Execution
- \`executeAsync()\` - Web Worker execution
- \`compile()\`, \`parse()\`, \`refactor()\`, \`search()\`, \`replace()\`

#### Extended Syntax Features
- \`parseSyntax()\` - Templates, loops, conditionals
- \`expandMacros()\`, \`presetExpanded()\`

#### Component Composition
- \`compose()\`, \`layout()\`, \`responsive()\`, \`darkMode()\`

#### Theme & State Management
- \`createTheme()\`, \`applyTheme()\`, \`setVar()\`, \`getVar()\`
- \`on()\`, \`emit()\`, \`state()\` - Reactive state"

create_release "v2.0.7" "v2.0.7 - AI-Style Chain Builder & Performance Monitoring" "### 🚀 Added - AI-Style Chain Builder & Performance Monitoring

#### Feature 1: AI-Style Chain Builder
- \`chain()\` with \`.then()\`, \`.if()\`, \`.repeat()\`, \`.delay()\`
- \`.parallel()\`, \`.sequence()\`, \`.execute()\`

#### Feature 2: Performance Monitoring
- \`monitor()\` with \`.startTracking()\`, \`.trackOperation()\`, \`.trackAsync()\`
- \`.getMetrics()\`, \`.optimize()\`, \`.report()\`, \`.autoOptimize()\`

#### Batch Processing
- \`batchProcess()\` - Efficient large dataset processing

#### Utility Helpers
- \`memoize()\`, \`debounce()\`, \`throttle()\`

### 📦 Downloads
- **npm packages**: \`smonthl@${VERSION}\` and \`smonthl-react@${VERSION}\`
- **Electron apps**: Available for Linux (.deb), Windows (.exe), macOS (.dmg)

### Installation
\`\`\`bash
# HTML/JavaScript version
npm install smonthl@${VERSION}

# React/TypeScript version
npm install smonthl-react@${VERSION}
\`\`\`"

echo ""
echo -e "${GREEN}✅ All releases created successfully!${NC}"
echo ""
echo -e "${BLUE}📦 Built packages:${NC}"
ls -lh releases/ 2>/dev/null || echo "No packages built yet"
echo ""
echo -e "${BLUE}🌐 View releases at:${NC}"
echo "https://github.com/Moude-AI/smonthl_api/releases"
echo ""
echo -e "${YELLOW}💡 Tip: To publish to npm, run:${NC}"
echo "  cd html-ver && npm publish"
echo "  cd tsx-react-ver && npm publish"
