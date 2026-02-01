#!/bin/bash

# Automated GitHub Release Script (no prompts)

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

VERSION=$(node -p "require('./html-ver/package.json').version")

echo -e "${BLUE}=========================================="
echo -e "GitHub Release Builder v$VERSION"
echo -e "==========================================${NC}"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    exit 1
fi

# Check if logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: Not logged in to GitHub CLI${NC}"
    exit 1
fi

RELEASE_NOTES="# Smonthl API v$VERSION - Complete Release

## 🆕 What's New in v$VERSION
- ✅ **Fixed blank Electron app screens** - Beautiful CSS gradients instead of external images
- ✅ **Auto-starting Vite** - React version automatically starts Vite dev server
- ✅ **Improved file paths** - Proper resolution in packaged apps
- ✅ **Offline-ready** - No external dependencies
- ✅ **One-command release** - Automated build and release scripts

## ✨ Complete Feature Set

### 🎨 Liquid Glass UI
- Magnifying lens effect with real backdrop blur
- Adjustable transparency, blur, and brightness
- Beautiful frosted glass aesthetics
- Multiple style presets (minimal, frosted, heavy, sharp, soft, neon, crystal)

### 🎪 Jelly Physics
- Elastic draggable components
- Smooth spring animations
- Configurable elasticity and friction
- Bounce and wobble effects

### 🧲 Magnetic Interactions
- Cursor-following magnetic attraction
- Adjustable magnetic strength and range
- Smooth pull effects

### 💡 Lighting Effects
- Cursor-following light effects
- Adjustable light intensity and size
- Custom light colors
- Screen-space lighting

### 🎯 Advanced Features
- **AI-Style Chain Builder** - Natural language chainable operations
- **Performance Monitoring** - Real-time FPS, memory, and operation tracking
- **Batch Processing** - Efficient large dataset processing
- **Memoization** - Cache expensive function results
- **Debounce/Throttle** - Control function execution timing

### 🎨 Liquid Glass Text
- Beautiful text with glass effects
- Gradient text support
- Glow and shadow effects
- Stroke and outline options
- Animated text effects

### 📝 Creative Syntax
- Natural language API (\`make().with().sized().build()\`)
- Emoji shortcuts (🔵, 🟦, 🔘, 🎴, ⭐, 🪟)
- Operator shortcuts (@, #, ~, %, +, *, !)
- String parsing (\`from('circle:100 icon:🚀 blur:80')\`)
- JSON/YAML-like syntax
- CSS-like syntax parser

### 🔧 Configuration
- JSON configuration files
- Import/Export configs
- External resource loading (CSS, JS, fonts, icons)
- Template system
- Macro system
- Theme system

### 📦 Component Types
- Circles, Squares, Rectangles
- Buttons, Cards, Windows
- Icon buttons
- Custom shapes
- Liquid text components

### 🎨 Icon Libraries Support
- Font Awesome
- Material Icons
- Bootstrap Icons
- Feather Icons
- Ionicons
- Custom icon libraries

### 🔤 Font Support
- Google Fonts integration
- Custom font loading
- Typography configuration
- Font weight and size control

### 🎭 Presets & Themes
- Style presets (minimal, frosted, heavy, sharp, soft, neon, crystal)
- Animation presets (bounce, smooth, snappy, slow, fast)
- Color themes (ocean, sunset, forest, purple, gold)
- Magnetic presets (weak, normal, strong)
- Light presets (dim, normal, bright)

## 📥 Downloads

### HTML Version (Pure HTML/JS)
- **Linux AppImage** (x64, arm64, armv7l) - Universal, just download and run
- **Debian/Ubuntu .deb** (x64, arm64, armv7l) - Install with \`dpkg -i\`
- **NPM Package** - \`npm install smonthl\`

### React Version (TypeScript/React)
- **Linux AppImage** (x64, arm64, armv7l) - Universal, just download and run
- **Debian/Ubuntu .deb** (x64, arm64, armv7l) - Install with \`dpkg -i\`
- **NPM Package** - \`npm install smonthl-react\`

## 🚀 Quick Start

### HTML Version
\`\`\`html
<script src=\"smonthl-api.js\"></script>
<script>
  const api = new SmonthlAPI();
  api.circle(100, '🚀').blur(80).jelly(true);
</script>
\`\`\`

### React Version
\`\`\`jsx
import { LiquidGlassDemo } from 'smonthl-react';

function App() {
  return <LiquidGlassDemo />;
}
\`\`\`

## 📚 Documentation
- [README.md](https://github.com/Moude-AI/smonthl_api/blob/main/README.md)
- [DSL Syntax Guide](https://github.com/Moude-AI/smonthl_api/blob/main/DSL_SYNTAX_GUIDE.md)
- [Liquid Glass Guide](https://github.com/Moude-AI/smonthl_api/blob/main/LIQUID_GLASS_GUIDE.md)
- [Features](https://github.com/Moude-AI/smonthl_api/blob/main/FEATURES.md)
- [Changelog](https://github.com/Moude-AI/smonthl_api/blob/main/CHANGELOG.md)

## 🔄 Version History
All previous versions remain available:
- v1.0.0 - v1.0.6 (Initial releases)
- v2.0.0 - v2.0.6 (Major updates)
- v$VERSION (Current - Latest)

## 📄 License
Apache-2.0

## 👨‍💻 Author
Arthurc1Moude <arch_cheng@163.com>

## 🐛 Issues
Report issues at: https://github.com/Moude-AI/smonthl_api/issues"

echo -e "${BLUE}Building all versions...${NC}"
echo ""

# Clean old releases
rm -rf releases/*
mkdir -p releases

# Build HTML version
echo -e "${BLUE}=========================================="
echo -e "Building HTML version..."
echo -e "==========================================${NC}"
cd html-ver
npm install
npm run package
cd ..

# Copy HTML builds
echo "Copying HTML builds..."
cp html-ver/dist/*.AppImage releases/ 2>/dev/null || true
cp html-ver/dist/*.deb releases/ 2>/dev/null || true
cp html-ver/dist/*.dmg releases/ 2>/dev/null || true
cp html-ver/dist/*.exe releases/ 2>/dev/null || true
cp html-ver/dist/*.zip releases/ 2>/dev/null || true

echo -e "${GREEN}✓ HTML version built${NC}"
echo ""

# Build React version
echo -e "${BLUE}=========================================="
echo -e "Building React version..."
echo -e "==========================================${NC}"
cd tsx-react-ver
npm install
npm run build
npm run package
cd ..

# Copy React builds
echo "Copying React builds..."
cp tsx-react-ver/dist-electron/*.AppImage releases/ 2>/dev/null || true
cp tsx-react-ver/dist-electron/*.deb releases/ 2>/dev/null || true
cp tsx-react-ver/dist-electron/*.dmg releases/ 2>/dev/null || true
cp tsx-react-ver/dist-electron/*.exe releases/ 2>/dev/null || true
cp tsx-react-ver/dist-electron/*.zip releases/ 2>/dev/null || true

echo -e "${GREEN}✓ React version built${NC}"
echo ""

# Create NPM packages
echo -e "${BLUE}Creating NPM packages...${NC}"
cd html-ver
npm pack
mv *.tgz ../releases/
cd ../tsx-react-ver
npm pack
mv *.tgz ../releases/
cd ..

echo ""
echo -e "${GREEN}All builds complete!${NC}"
echo ""
echo "Release files:"
ls -lh releases/

echo ""
echo -e "${BLUE}Creating GitHub release v$VERSION...${NC}"

# Check if tag exists (only delete if it's the SAME version being re-released)
if git rev-parse "v$VERSION" >/dev/null 2>&1; then
    echo -e "${YELLOW}Tag v$VERSION already exists. This will update the existing v$VERSION release.${NC}"
    echo -e "${YELLOW}All other releases (v1.x, v2.0.0-v2.0.6, etc.) will remain untouched.${NC}"
    read -p "Continue? (y/n): " confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        echo "Cancelled."
        exit 0
    fi
    git tag -d "v$VERSION" || true
    git push origin ":refs/tags/v$VERSION" 2>/dev/null || true
fi

# Create and push tag
echo "Creating git tag..."
git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin "v$VERSION"

# Create GitHub release
echo "Creating GitHub release..."
gh release create "v$VERSION" \
    --title "Smonthl API v$VERSION" \
    --notes "$RELEASE_NOTES" \
    releases/*

echo ""
echo -e "${GREEN}=========================================="
echo -e "✓ Release v$VERSION published to GitHub!"
echo -e "==========================================${NC}"
echo ""
echo -e "${GREEN}All previous releases are preserved:${NC}"
echo "  v1.0.0 - v1.0.6"
echo "  v2.0.0 - v2.0.6"
echo "  v2.0.7 (NEW - Latest)"
echo ""
echo "View your release at:"
echo "https://github.com/Moude-AI/smonthl_api/releases/tag/v$VERSION"

echo ""
echo -e "${GREEN}Done! 🎉${NC}"
