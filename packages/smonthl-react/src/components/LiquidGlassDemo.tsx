import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SmonthlAPI, SmonthlConfig } from '../types/SmonthlAPI';
import './LiquidGlassDemo.css';

const LiquidGlassDemo: React.FC = () => {
  const [config, setConfig] = useState<SmonthlConfig | null>(null);
  const [transparency, setTransparency] = useState(6);
  const [blur, setBlur] = useState(60);
  const [magBlur, setMagBlur] = useState(30);
  const [magBrightness, setMagBrightness] = useState(115);
  const [lensSize, setLensSize] = useState(40);
  const [borderRadius, setBorderRadius] = useState(32);
  const [jellyElasticity, setJellyElasticity] = useState(60);
  const [magneticStrength, setMagneticStrength] = useState(30);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const smonthlAPIRef = useRef<SmonthlAPI>(new SmonthlAPI());
  
  const isDraggingRef = useRef(false);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const velocityXRef = useRef(0);
  const velocityYRef = useRef(0);
  const initialXRef = useRef(0);
  const initialYRef = useRef(0);
  const jellyElasticityRef = useRef(0.6);
  const jellyFrictionRef = useRef(0.85);
  const magneticStrengthRef = useRef(0.3);
  const magneticRangeRef = useRef(150);

  const backgrounds = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1920&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
  ];

  useEffect(() => {
    smonthlAPIRef.current.loadConfig().then(cfg => {
      setConfig(cfg);
      applyConfig(cfg);
    });

    const bgInterval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(bgInterval);
  }, []);

  const applyConfig = (cfg: SmonthlConfig) => {
    setTransparency(cfg.glass.transparency);
    setBlur(cfg.glass.blur);
    setMagBlur(cfg.glass.magnifyingBlur);
    setMagBrightness(cfg.glass.magnifyingBrightness);
    setLensSize(cfg.glass.lensSize);
    setBorderRadius(cfg.glass.borderRadius);
    setJellyElasticity(cfg.jelly.elasticity * 100);
    setMagneticStrength(cfg.jelly.magneticStrength * 100);
    
    jellyElasticityRef.current = cfg.jelly.elasticity;
    jellyFrictionRef.current = cfg.jelly.friction;
    magneticStrengthRef.current = cfg.jelly.magneticStrength;
    magneticRangeRef.current = cfg.jelly.magneticRange;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    const cursorLight = cursorLightRef.current;
    if (!container || !cursorLight) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    if (distance < 200) {
      cursorLight.style.opacity = String((1 - distance / 200) * 0.8);
      cursorLight.style.left = `${e.clientX - 60}px`;
      cursorLight.style.top = `${e.clientY - 60}px`;
    } else {
      cursorLight.style.opacity = '0';
    }

    if (!isDraggingRef.current && distance < magneticRangeRef.current) {
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const pullX = Math.cos(angle) * magneticStrengthRef.current * (1 - distance / magneticRangeRef.current) * 5;
      const pullY = Math.sin(angle) * magneticStrengthRef.current * (1 - distance / magneticRangeRef.current) * 5;
      targetXRef.current += pullX;
      targetYRef.current += pullY;
    }

    if (isDraggingRef.current) {
      e.preventDefault();
      targetXRef.current = e.clientX - initialXRef.current;
      targetYRef.current = e.clientY - initialYRef.current;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('close-btn')) return;
    isDraggingRef.current = true;
    initialXRef.current = e.clientX - currentXRef.current;
    initialYRef.current = e.clientY - currentYRef.current;
    containerRef.current?.classList.add('jelly-active');
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setTimeout(() => containerRef.current?.classList.remove('jelly-active'), 600);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    const jellyPhysics = () => {
      velocityXRef.current += (targetXRef.current - currentXRef.current) * jellyElasticityRef.current;
      velocityYRef.current += (targetYRef.current - currentYRef.current) * jellyElasticityRef.current;
      
      velocityXRef.current *= jellyFrictionRef.current;
      velocityYRef.current *= jellyFrictionRef.current;
      
      currentXRef.current += velocityXRef.current;
      currentYRef.current += velocityYRef.current;
      
      const rotation = velocityXRef.current * 0.02;
      const scaleX = 1 + Math.abs(velocityXRef.current) * 0.001;
      const scaleY = 1 + Math.abs(velocityYRef.current) * 0.001;
      
      if (containerRef.current) {
        containerRef.current.style.transform = 
          `translate(${currentXRef.current}px, ${currentYRef.current}px) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
      }
      
      requestAnimationFrame(jellyPhysics);
    };
    jellyPhysics();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove]);

  const updateMagnifyingLens = (blurVal: number, brightness: number) => {
    const existingStyle = document.getElementById('dynamic-lens-style');
    if (existingStyle) existingStyle.remove();
    
    const style = document.createElement('style');
    style.id = 'dynamic-lens-style';
    style.textContent = `
      .glass-container::before {
        backdrop-filter: blur(${blurVal}px) saturate(150%) brightness(${brightness / 100}) !important;
        -webkit-backdrop-filter: blur(${blurVal}px) saturate(150%) brightness(${brightness / 100}) !important;
      }
    `;
    document.head.appendChild(style);
  };

  const updateLensSize = (size: number, radius: number) => {
    const existingStyle = document.getElementById('dynamic-lens-size');
    if (existingStyle) existingStyle.remove();
    
    const style = document.createElement('style');
    style.id = 'dynamic-lens-size';
    const newRadius = radius + size;
    style.textContent = `
      .glass-container::before {
        top: -${size}px !important;
        left: -${size}px !important;
        right: -${size}px !important;
        bottom: -${size}px !important;
        border-radius: ${newRadius}px !important;
      }
    `;
    document.head.appendChild(style);
  };

  const handleExportConfig = () => {
    const json = smonthlAPIRef.current.exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'glass-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (smonthlAPIRef.current.importConfig(result)) {
          const newConfig = smonthlAPIRef.current.config;
          if (newConfig) {
            setConfig(newConfig);
            applyConfig(newConfig);
            alert('Configuration imported successfully!');
          }
        } else {
          alert('Failed to import configuration');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    const defaultConfig = smonthlAPIRef.current.getDefaultConfig();
    setConfig(defaultConfig);
    applyConfig(defaultConfig);
  };

  useEffect(() => {
    updateMagnifyingLens(magBlur, magBrightness);
  }, [magBlur, magBrightness]);

  useEffect(() => {
    updateLensSize(lensSize, borderRadius);
  }, [lensSize, borderRadius]);

  useEffect(() => {
    jellyElasticityRef.current = jellyElasticity / 100;
    if (config) {
      smonthlAPIRef.current.updateConfig('jelly.elasticity', jellyElasticity / 100);
    }
  }, [jellyElasticity, config]);

  useEffect(() => {
    magneticStrengthRef.current = magneticStrength / 100;
    if (config) {
      smonthlAPIRef.current.updateConfig('jelly.magneticStrength', magneticStrength / 100);
    }
  }, [magneticStrength, config]);

  return (
    <div 
      className="liquid-glass-demo"
      style={{ backgroundImage: `url('${backgrounds[backgroundIndex]}')` }}
    >
      <div className="cursor-light" ref={cursorLightRef} />

      <div className="control-panel">
        <h3>Glass Controls</h3>
        
        <div className="control-group">
          <label>
            Transparency
            <span className="value">{transparency}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={transparency}
            step="1"
            onChange={(e) => setTransparency(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Blur Amount
            <span className="value">{blur}px</span>
          </label>
          <input
            type="range"
            min="10"
            max="150"
            value={blur}
            step="5"
            onChange={(e) => setBlur(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Magnifying Blur
            <span className="value">{magBlur}px</span>
          </label>
          <input
            type="range"
            min="10"
            max="80"
            value={magBlur}
            step="5"
            onChange={(e) => setMagBlur(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Magnifying Brightness
            <span className="value">{magBrightness}%</span>
          </label>
          <input
            type="range"
            min="100"
            max="150"
            value={magBrightness}
            step="5"
            onChange={(e) => setMagBrightness(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Lens Size
            <span className="value">{lensSize}px</span>
          </label>
          <input
            type="range"
            min="20"
            max="80"
            value={lensSize}
            step="5"
            onChange={(e) => setLensSize(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Border Radius
            <span className="value">{borderRadius}px</span>
          </label>
          <input
            type="range"
            min="8"
            max="60"
            value={borderRadius}
            step="4"
            onChange={(e) => setBorderRadius(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Jelly Elasticity
            <span className="value">{jellyElasticity}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={jellyElasticity}
            step="5"
            onChange={(e) => setJellyElasticity(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Magnetic Strength
            <span className="value">{magneticStrength}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={magneticStrength}
            step="5"
            onChange={(e) => setMagneticStrength(Number(e.target.value))}
          />
        </div>

        <button className="reset-btn" onClick={handleReset}>Reset to Default</button>
        <button className="reset-btn" onClick={handleExportConfig}>Export JSON</button>
        <button className="reset-btn" onClick={handleImportConfig}>Import JSON</button>
      </div>

      <div
        ref={containerRef}
        className="glass-container"
        onMouseDown={handleMouseDown}
        style={{
          width: config?.glass.width ? `${config.glass.width}px` : '700px',
          height: config?.glass.height ? `${config.glass.height}px` : '140px',
          background: `rgba(255, 255, 255, ${transparency / 100})`,
          backdropFilter: `blur(${blur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
          borderRadius: `${borderRadius}px`
        }}
      >
        <button className="close-btn" onClick={() => window.close()}>×</button>
        <div className="content">
          {config?.content.type === 'icon' && config.content.icon ? (
            <div style={{ fontSize: `${Math.min(config.glass.width || 700, config.glass.height || 140) * 0.4}px` }}>
              {config.content.icon}
            </div>
          ) : (
            <>
              <h1>{config?.content.title || 'Magnifying Liquid Glass'}</h1>
              <p>{config?.content.subtitle || 'Real lens magnification • Beautiful backgrounds • Light shadows'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiquidGlassDemo;
