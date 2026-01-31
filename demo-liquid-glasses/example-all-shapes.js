// SmonthlAPI - All Shape Examples
// This file demonstrates all the simple DSL shortcuts

const SmonthlAPI = require('smonthl/smonthl-api.js');
const api = new SmonthlAPI();
const fs = require('fs');

// ===== SIMPLE ONE-LINE CREATIONS =====

// 1. Circle
const circle = api.circle(100, '🚀');
fs.writeFileSync('config-circle-100.json', JSON.stringify(circle, null, 2));
console.log('✓ Created circle config');

// 2. Square
const square = api.square(200, 'Square');
fs.writeFileSync('config-square-200.json', JSON.stringify(square, null, 2));
console.log('✓ Created square config');

// 3. Button
const button = api.button('Click Me', 300, 70);
fs.writeFileSync('config-button.json', JSON.stringify(button, null, 2));
console.log('✓ Created button config');

// 4. Card
const card = api.card('Card Title', 'Card subtitle', 350, 200);
fs.writeFileSync('config-card.json', JSON.stringify(card, null, 2));
console.log('✓ Created card config');

// 5. Icon
const icon = api.icon('⭐', 80);
fs.writeFileSync('config-icon.json', JSON.stringify(icon, null, 2));
console.log('✓ Created icon config');

// 6. Window
const window = api.window('Window Title', 600, 400);
fs.writeFileSync('config-window.json', JSON.stringify(window, null, 2));
console.log('✓ Created window config');

// ===== CHAINED METHODS =====

// Create and customize in one go!
api.circle(120, '🎨')
   .blur(80)
   .transparent(10)
   .rounded(60)
   .jelly(true)
   .magnetic(0.5)
   .lights(true)
   .font('Poppins');

const customized = api.config;
fs.writeFileSync('config-customized.json', JSON.stringify(customized, null, 2));
console.log('✓ Created customized config with chaining');

// ===== ALL-IN-ONE GLASS METHOD =====

const simple = api.glass({
  size: 150,
  shape: 'circle',
  icon: '💎',
  blur: 60,
  transparency: 8,
  font: 'Roboto',
  icons: 'fontawesome'
});

fs.writeFileSync('config-simple.json', JSON.stringify(simple, null, 2));
console.log('✓ Created simple config with glass() method');

console.log('\n✅ All configs generated! Use them with the npm package HTML.');
console.log('Example: Load config-button.json in demo-liquid-glasses/demo-*.html');
