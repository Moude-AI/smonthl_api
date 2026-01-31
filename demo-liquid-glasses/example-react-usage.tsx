// SmonthlAPI React/TypeScript Usage Example
import React, { useEffect, useState } from 'react';
import { SmonthlAPI, SmonthlConfig } from 'smonthl-react';

export function LiquidGlassExamples() {
  const [configs, setConfigs] = useState<{
    circle?: SmonthlConfig;
    button?: SmonthlConfig;
    card?: SmonthlConfig;
    customized?: SmonthlConfig;
  }>({});

  useEffect(() => {
    const api = new SmonthlAPI();

    // ===== SIMPLE ONE-LINE CREATIONS =====

    // Create a circle
    const circle = api.circle(100, '🚀');

    // Create a button
    const button = api.button('Click Me', 300, 70);

    // Create a card
    const card = api.card('Card Title', 'Card subtitle', 350, 200);

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

    const customized = api.config!;

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

    setConfigs({ circle, button, card, customized });
  }, []);

  return (
    <div>
      <h1>SmonthlAPI React Examples</h1>
      
      <h2>Circle</h2>
      <pre>{JSON.stringify(configs.circle, null, 2)}</pre>
      
      <h2>Button</h2>
      <pre>{JSON.stringify(configs.button, null, 2)}</pre>
      
      <h2>Card</h2>
      <pre>{JSON.stringify(configs.card, null, 2)}</pre>
      
      <h2>Customized (Chained)</h2>
      <pre>{JSON.stringify(configs.customized, null, 2)}</pre>
    </div>
  );
}

// Usage in your app:
// import { LiquidGlassExamples } from './example-react-usage';
// <LiquidGlassExamples />
