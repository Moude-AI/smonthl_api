#!/bin/bash

echo "🚀 Publishing SmonthlAPI packages to npm..."
echo ""

# Publish HTML version
echo "📦 Publishing HTML version..."
cd html-ver
npm publish --access public
if [ $? -eq 0 ]; then
    echo "✅ HTML version published successfully!"
else
    echo "❌ HTML version publish failed"
    exit 1
fi
cd ..

echo ""

# Publish React version
echo "📦 Publishing React version..."
cd tsx-react-ver
npm publish --access public
if [ $? -eq 0 ]; then
    echo "✅ React version published successfully!"
else
    echo "❌ React version publish failed"
    exit 1
fi
cd ..

echo ""
echo "🎉 All packages published successfully!"
echo ""
echo "Users can now install:"
echo "  npm install @smonthl/liquid-glass-html"
echo "  npm install @smonthl/liquid-glass-react"
