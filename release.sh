#!/bin/bash

# Interactive Release Script

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

VERSION=$(node -p "require('./html-ver/package.json').version")

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   Smonthl API Release Builder v$VERSION   ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

echo "What would you like to do?"
echo ""
echo "1) Build all versions (HTML + React)"
echo "2) Build HTML version only"
echo "3) Build React version only"
echo "4) Build and release to GitHub"
echo "5) Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo -e "${BLUE}Building all versions...${NC}"
        ./build-all-and-release.sh
        ;;
    2)
        echo -e "${BLUE}Building HTML version...${NC}"
        ./quick-build.sh html
        ;;
    3)
        echo -e "${BLUE}Building React version...${NC}"
        ./quick-build.sh react
        ;;
    4)
        echo -e "${BLUE}Building and releasing to GitHub...${NC}"
        echo ""
        echo -e "${YELLOW}This will:${NC}"
        echo "  1. Build both HTML and React versions"
        echo "  2. Create git tag v$VERSION"
        echo "  3. Create GitHub release"
        echo "  4. Upload all build artifacts"
        echo ""
        read -p "Continue? (y/n): " confirm
        
        if [ "$confirm" == "y" ] || [ "$confirm" == "Y" ]; then
            ./release-to-github.sh
        else
            echo "Cancelled."
        fi
        ;;
    5)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✓ Done!${NC}"
