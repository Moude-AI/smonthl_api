// Smonthl Configuration API v2.0.1
class SmonthlAPI {
  constructor() {
    this.config = null;
    this.listeners = [];
    this.externalResources = [];
    this.customStyles = [];
  }

  // Load configuration from JSON
  async loadConfig(url = './glass-config.json') {
    try {
      const response = await fetch(url);
      this.config = await response.json();
      this.notifyListeners('configLoaded', this.config);
      return this.config;
    } catch (error) {
      console.error('Failed to load config:', error);
      return this.getDefaultConfig();
    }
  }

  // Get default configuration
  getDefaultConfig() {
    return {
      componentType: "liquid-glass",
      glass: {
        transparency: 6,
        blur: 60,
        magnifyingBlur: 30,
        magnifyingBrightness: 115,
        lensSize: 40,
        borderRadius: 32,
        width: 700,
        height: 140
      },
      content: {
        type: "text",
        title: "Magnifying Liquid Glass",
        subtitle: "Real lens magnification • Beautiful backgrounds"
      },
      jelly: {
        enabled: true,
        elasticity: 0.6,
        friction: 0.85,
        bounceIntensity: 15,
        wobbleSpeed: 0.3,
        magneticRange: 150,
        magneticStrength: 0.3
      },
      lighting: {
        cursorFollowEnabled: true,
        followDistance: 200,
        lightIntensity: 0.8,
        lightSize: 120,
        lightColor: "255, 255, 255"
      },
      backgrounds: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
      ],
      backgroundChangeInterval: 10000
    };
  }

  // Create component from template
  createFromTemplate(templateName) {
    if (!this.config || !this.config.templates || !this.config.templates[templateName]) {
      console.error(`Template "${templateName}" not found`);
      return null;
    }
    
    const template = this.config.templates[templateName];
    // Merge template with base config
    return {
      ...this.config,
      ...template,
      glass: { ...this.config.glass, ...template.glass },
      content: { ...this.config.content, ...template.content }
    };
  }

  // Create custom component with specific size and shape
  createCustomComponent(options) {
    const defaults = this.getDefaultConfig();
    return {
      ...defaults,
      componentType: options.type || 'custom',
      glass: {
        ...defaults.glass,
        width: options.width || 200,
        height: options.height || 200,
        borderRadius: options.borderRadius || 16,
        transparency: options.transparency || defaults.glass.transparency,
        blur: options.blur || defaults.glass.blur
      },
      content: {
        type: options.contentType || 'text',
        title: options.title || '',
        subtitle: options.subtitle || '',
        icon: options.icon || '',
        label: options.label || ''
      }
    };
  }

  // Create circular component
  createCircle(size, icon) {
    return this.createCustomComponent({
      type: 'circle',
      width: size,
      height: size,
      borderRadius: size / 2,
      icon: icon,
      contentType: 'icon'
    });
  }

  // Create square component
  createSquare(size, title) {
    return this.createCustomComponent({
      type: 'square',
      width: size,
      height: size,
      borderRadius: size * 0.15,
      title: title,
      contentType: 'text'
    });
  }

  // Create rectangle component
  createRectangle(width, height, title) {
    return this.createCustomComponent({
      type: 'rectangle',
      width: width,
      height: height,
      borderRadius: Math.min(width, height) * 0.1,
      title: title,
      contentType: 'text'
    });
  }

  // Create icon button
  createIconButton(icon, size = 60) {
    return this.createCustomComponent({
      type: 'icon-button',
      width: size,
      height: size,
      borderRadius: size / 2,
      icon: icon,
      contentType: 'icon'
    });
  }

  // Apply shape preset
  applyShape(shape, size) {
    const shapes = {
      circle: { borderRadius: size / 2 },
      rounded: { borderRadius: size * 0.25 },
      square: { borderRadius: size * 0.1 },
      sharp: { borderRadius: 0 },
      pill: { borderRadius: 9999 }
    };
    
    if (shapes[shape]) {
      this.updateConfig('glass.borderRadius', shapes[shape].borderRadius);
    }
  }

  // Set component size
  setSize(width, height) {
    this.updateConfig('glass.width', width);
    this.updateConfig('glass.height', height);
  }

  // Set icon
  setIcon(icon) {
    this.updateConfig('content.type', 'icon');
    this.updateConfig('content.icon', icon);
  }

  // Set title
  setTitle(title, subtitle = '') {
    this.updateConfig('content.type', 'text');
    this.updateConfig('content.title', title);
    if (subtitle) {
      this.updateConfig('content.subtitle', subtitle);
    }
  }

  // Simple DSL-style shortcuts
  glass(config) {
    // Simple syntax: api.glass({ size: 100, shape: 'circle', icon: '🚀' })
    if (config.size) {
      if (config.shape === 'circle') {
        this.config = this.createCircle(config.size, config.icon || config.text);
      } else if (config.shape === 'square') {
        this.config = this.createSquare(config.size, config.text);
      } else {
        this.config = this.createCustomComponent({
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          icon: config.icon,
          title: config.text
        });
      }
    } else if (config.width && config.height) {
      this.config = this.createRectangle(config.width, config.height, config.text);
    }
    
    if (config.blur) this.updateConfig('glass.blur', config.blur);
    if (config.transparency) this.updateConfig('glass.transparency', config.transparency);
    if (config.radius) this.updateConfig('glass.borderRadius', config.radius);
    if (config.font) this.loadGoogleFont(config.font);
    if (config.icons) this.loadIconLibrary(config.icons);
    
    return this.config;
  }

  // Shortcut: circle
  circle(size, icon) {
    return this.glass({ size, shape: 'circle', icon });
  }

  // Shortcut: square
  square(size, text) {
    return this.glass({ size, shape: 'square', text });
  }

  // Shortcut: button
  button(text, width = 200, height = 60) {
    const config = this.glass({ width, height, text });
    this.applyShape('pill', height);
    return this.config;
  }

  // Shortcut: card
  card(title, subtitle, width = 300, height = 200) {
    this.config = this.createRectangle(width, height, title);
    this.updateConfig('content.subtitle', subtitle);
    return this.config;
  }

  // Shortcut: icon
  icon(emoji, size = 80) {
    return this.circle(size, emoji);
  }

  // Shortcut: window
  window(title, width = 600, height = 400) {
    return this.card(title, '', width, height);
  }

  // Chain-able methods
  blur(amount) {
    this.updateConfig('glass.blur', amount);
    return this;
  }

  transparent(amount) {
    this.updateConfig('glass.transparency', amount);
    return this;
  }

  rounded(amount) {
    this.updateConfig('glass.borderRadius', amount);
    return this;
  }

  draggable(enabled = true) {
    this.updateConfig('draggable', enabled);
    return this;
  }

  jelly(enabled = true) {
    this.updateConfig('jelly.enabled', enabled);
    return this;
  }

  magnetic(strength = 0.3) {
    this.updateConfig('jelly.magneticStrength', strength);
    return this;
  }

  lights(enabled = true) {
    this.updateConfig('lighting.cursorFollowEnabled', enabled);
    return this;
  }

  font(name, weights = '300,400,600') {
    this.loadGoogleFont(name, weights);
    return this;
  }

  icons(library) {
    this.loadIconLibrary(library);
    return this;
  }

  // Load external icon library
  loadIconLibrary(type, cdnUrl = null) {
    const libraries = {
      'fontawesome': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
      'material': 'https://fonts.googleapis.com/icon?family=Material+Icons',
      'bootstrap': 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
      'feather': 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.css',
      'ionicons': 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.css'
    };

    const url = cdnUrl || libraries[type];
    if (!url) {
      console.error(`Unknown icon library: ${type}`);
      return false;
    }

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);

    this.updateConfig('iconLibrary.type', type);
    this.updateConfig('iconLibrary.cdnUrl', url);
    
    return true;
  }

  // Load custom font
  loadFont(fontFamily, fontUrl = null) {
    if (fontUrl) {
      // Load from URL
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      document.head.appendChild(link);
    }
    
    this.updateConfig('typography.fontFamily', fontFamily);
    return true;
  }

  // Load Google Font
  loadGoogleFont(fontName, weights = '300,400,600') {
    const url = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@${weights}&display=swap`;
    return this.loadFont(fontName, url);
  }

  // Set typography
  setTypography(options) {
    if (options.fontFamily) this.updateConfig('typography.fontFamily', options.fontFamily);
    if (options.titleSize) this.updateConfig('typography.titleSize', options.titleSize);
    if (options.subtitleSize) this.updateConfig('typography.subtitleSize', options.subtitleSize);
    if (options.titleWeight) this.updateConfig('typography.titleWeight', options.titleWeight);
    if (options.subtitleWeight) this.updateConfig('typography.subtitleWeight', options.subtitleWeight);
    if (options.letterSpacing) this.updateConfig('typography.letterSpacing', options.letterSpacing);
    if (options.lineHeight) this.updateConfig('typography.lineHeight', options.lineHeight);
  }

  // Create icon with library
  createIconWithLibrary(libraryType, iconClass, size = 64) {
    const config = this.createCircle(size);
    config.content = {
      type: 'icon-library',
      iconLibrary: libraryType,
      iconClass: iconClass
    };
    config.iconLibrary = {
      type: libraryType,
      className: iconClass
    };
    return config;
  }

  // Get all available templates
  getTemplates() {
    return this.config?.templates || {};
  }

  // Update configuration
  updateConfig(path, value) {
    const keys = path.split('.');
    let obj = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.notifyListeners('configUpdated', { path, value });
  }

  // Get configuration value
  getConfig(path) {
    const keys = path.split('.');
    let obj = this.config;
    for (const key of keys) {
      obj = obj[key];
    }
    return obj;
  }

  // Export configuration as JSON
  exportConfig() {
    return JSON.stringify(this.config, null, 2);
  }

  // Import configuration from JSON string
  importConfig(jsonString) {
    try {
      this.config = JSON.parse(jsonString);
      this.notifyListeners('configImported', this.config);
      return true;
    } catch (error) {
      console.error('Failed to import config:', error);
      return false;
    }
  }

  // Add event listener
  on(event, callback) {
    this.listeners.push({ event, callback });
  }

  // Notify listeners
  notifyListeners(event, data) {
    this.listeners
      .filter(l => l.event === event)
      .forEach(l => l.callback(data));
  }

  // Save configuration to localStorage
  saveToLocalStorage() {
    localStorage.setItem('smonthlConfig', this.exportConfig());
  }

  // Load configuration from localStorage
  loadFromLocalStorage() {
    const saved = localStorage.getItem('smonthlConfig');
    if (saved) {
      return this.importConfig(saved);
    }
    return false;
  }

  // ========== V2.0.1 CREATIVE SYNTAX ==========
  
  // Natural language-like syntax
  make(what) {
    this._builder = { type: what };
    return this;
  }

  with(props) {
    Object.assign(this._builder, props);
    return this;
  }

  sized(width, height = width) {
    if (!this._builder) this._builder = {};
    this._builder.width = width;
    this._builder.height = height;
    return this;
  }

  containing(content) {
    if (!this._builder) this._builder = {};
    this._builder.content = content;
    return this;
  }

  styled(styles) {
    if (!this._builder) this._builder = {};
    this._builder.styles = styles;
    return this;
  }

  build() {
    const b = this._builder || {};
    const config = this.createCustomComponent({
      type: b.type || 'custom',
      width: b.width || 200,
      height: b.height || 200,
      borderRadius: b.borderRadius || 16,
      icon: b.content,
      title: b.content,
      contentType: b.content ? (b.content.length <= 2 ? 'icon' : 'text') : 'text'
    });
    
    if (b.styles) {
      Object.keys(b.styles).forEach(key => {
        this.updateConfig(`glass.${key}`, b.styles[key]);
      });
    }
    
    this.config = config;
    this._builder = null;
    return config;
  }

  // Emoji-based syntax
  '🔵'(size, content) { return this.circle(size, content); }
  '🟦'(size, content) { return this.square(size, content); }
  '🔘'(text, w, h) { return this.button(text, w, h); }
  '🎴'(title, subtitle, w, h) { return this.card(title, subtitle, w, h); }
  '⭐'(emoji, size) { return this.icon(emoji, size); }
  '🪟'(title, w, h) { return this.window(title, w, h); }

  // Shorthand operators
  '@'(size) { return this.circle(size); }
  '#'(size) { return this.square(size); }
  '~'(blur) { return this.blur(blur); }
  '%'(transparency) { return this.transparent(transparency); }
  '+'(enabled) { return this.jelly(enabled); }
  '*'(strength) { return this.magnetic(strength); }
  '!'(enabled) { return this.lights(enabled); }

  // External resource loading
  import(resource) {
    if (typeof resource === 'string') {
      // URL import
      return this.loadExternal(resource);
    } else if (typeof resource === 'object') {
      // Multiple resources
      if (Array.isArray(resource)) {
        resource.forEach(r => this.loadExternal(r));
      } else {
        // Named resources
        Object.keys(resource).forEach(key => {
          this.loadExternal(resource[key], key);
        });
      }
    }
    return this;
  }

  loadExternal(url, name = null) {
    const ext = url.split('.').pop().toLowerCase();
    
    if (ext === 'css') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      if (name) link.id = `smonthl-${name}`;
      document.head.appendChild(link);
      this.externalResources.push({ type: 'css', url, name });
    } else if (ext === 'js') {
      const script = document.createElement('script');
      script.src = url;
      if (name) script.id = `smonthl-${name}`;
      document.head.appendChild(script);
      this.externalResources.push({ type: 'js', url, name });
    } else if (ext === 'json') {
      // Load JSON config
      fetch(url)
        .then(r => r.json())
        .then(data => {
          this.config = data;
          this.externalResources.push({ type: 'json', url, name, data });
        });
    }
    
    return this;
  }

  // Style presets
  preset(name) {
    const presets = {
      minimal: { blur: 20, transparency: 3, borderRadius: 8 },
      frosted: { blur: 60, transparency: 6, borderRadius: 32 },
      heavy: { blur: 100, transparency: 12, borderRadius: 48 },
      sharp: { blur: 40, transparency: 5, borderRadius: 0 },
      soft: { blur: 80, transparency: 8, borderRadius: 64 },
      neon: { blur: 50, transparency: 10, borderRadius: 24 },
      crystal: { blur: 30, transparency: 4, borderRadius: 16 }
    };
    
    if (presets[name]) {
      Object.keys(presets[name]).forEach(key => {
        this.updateConfig(`glass.${key}`, presets[name][key]);
      });
    }
    
    return this;
  }

  // Theme system
  theme(colors) {
    if (typeof colors === 'string') {
      // Predefined themes
      const themes = {
        ocean: { light: '100, 200, 255', bg: '#1e3a8a' },
        sunset: { light: '255, 150, 100', bg: '#7c2d12' },
        forest: { light: '150, 255, 150', bg: '#14532d' },
        purple: { light: '200, 150, 255', bg: '#581c87' },
        gold: { light: '255, 215, 0', bg: '#78350f' }
      };
      
      if (themes[colors]) {
        this.updateConfig('lighting.lightColor', themes[colors].light);
        document.body.style.background = themes[colors].bg;
      }
    } else if (typeof colors === 'object') {
      // Custom theme
      if (colors.light) this.updateConfig('lighting.lightColor', colors.light);
      if (colors.bg) document.body.style.background = colors.bg;
    }
    
    return this;
  }

  // Inline CSS injection
  css(styles) {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    styleEl.id = `smonthl-custom-${Date.now()}`;
    document.head.appendChild(styleEl);
    this.customStyles.push(styleEl);
    return this;
  }

  // Load any external font
  useFont(family, url = null) {
    if (url) {
      // Custom font URL
      this.css(`@font-face { font-family: '${family}'; src: url('${url}'); }`);
    } else {
      // Try Google Fonts
      this.loadGoogleFont(family);
    }
    this.updateConfig('typography.fontFamily', family);
    return this;
  }

  // Load any icon set
  useIcons(library, url = null) {
    if (url) {
      // Custom icon library
      this.loadExternal(url, `icons-${library}`);
    } else {
      // Predefined libraries
      this.loadIconLibrary(library);
    }
    return this;
  }

  // Animation presets
  animate(type) {
    const animations = {
      bounce: { elasticity: 0.8, friction: 0.7 },
      smooth: { elasticity: 0.4, friction: 0.9 },
      snappy: { elasticity: 0.9, friction: 0.6 },
      slow: { elasticity: 0.3, friction: 0.95 },
      fast: { elasticity: 0.7, friction: 0.75 }
    };
    
    if (animations[type]) {
      this.updateConfig('jelly.elasticity', animations[type].elasticity);
      this.updateConfig('jelly.friction', animations[type].friction);
    }
    
    return this;
  }

  // Quick config from string
  from(syntax) {
    // Parse custom syntax: "circle:100 icon:🚀 blur:80 jelly:on"
    const parts = syntax.split(' ');
    const config = {};
    
    parts.forEach(part => {
      const [key, value] = part.split(':');
      config[key] = value;
    });
    
    if (config.circle) {
      this.circle(parseInt(config.circle), config.icon);
    } else if (config.square) {
      this.square(parseInt(config.square), config.text);
    } else if (config.button) {
      this.button(config.text || 'Button', parseInt(config.button), 60);
    }
    
    if (config.blur) this.blur(parseInt(config.blur));
    if (config.jelly === 'on') this.jelly(true);
    if (config.magnetic) this.magnetic(parseFloat(config.magnetic));
    if (config.preset) this.preset(config.preset);
    if (config.theme) this.theme(config.theme);
    
    return this.config;
  }

  // Batch operations
  batch(operations) {
    operations.forEach(op => {
      if (typeof op === 'function') {
        op(this);
      } else if (typeof op === 'string') {
        this.from(op);
      }
    });
    return this;
  }

  // Clone current config
  clone() {
    const api = new SmonthlAPI();
    api.config = JSON.parse(JSON.stringify(this.config));
    return api;
  }

  // Merge configs
  merge(otherConfig) {
    this.config = {
      ...this.config,
      ...otherConfig,
      glass: { ...this.config.glass, ...otherConfig.glass },
      content: { ...this.config.content, ...otherConfig.content }
    };
    return this;
  }

  // Reset to defaults
  reset() {
    this.config = this.getDefaultConfig();
    return this;
  }

  // Get all loaded resources
  getResources() {
    return {
      external: this.externalResources,
      styles: this.customStyles
    };
  }

  // Clean up resources
  cleanup() {
    this.customStyles.forEach(style => style.remove());
    this.customStyles = [];
    return this;
  }

  // ========== V2.0.2-BETA EXTENDED SYNTAX ==========
  
  // Pipe operator for chaining
  pipe(...fns) {
    fns.forEach(fn => fn(this));
    return this;
  }

  // Conditional syntax
  when(condition, trueFn, falseFn = null) {
    if (condition) {
      trueFn(this);
    } else if (falseFn) {
      falseFn(this);
    }
    return this;
  }

  // Loop syntax
  repeat(times, fn) {
    for (let i = 0; i < times; i++) {
      fn(this, i);
    }
    return this;
  }

  // Template literals support
  template(strings, ...values) {
    const syntax = strings.reduce((acc, str, i) => {
      return acc + str + (values[i] || '');
    }, '');
    return this.from(syntax);
  }

  // JSON-like syntax
  define(config) {
    if (config.shape) {
      const shapes = {
        circle: () => this.circle(config.size || 100, config.icon),
        square: () => this.square(config.size || 100, config.text),
        button: () => this.button(config.text || 'Button', config.width || 200, config.height || 60),
        card: () => this.card(config.title || 'Title', config.subtitle || '', config.width || 300, config.height || 200)
      };
      if (shapes[config.shape]) shapes[config.shape]();
    }
    
    if (config.effects) {
      if (config.effects.blur) this.blur(config.effects.blur);
      if (config.effects.transparency) this.transparent(config.effects.transparency);
      if (config.effects.jelly) this.jelly(config.effects.jelly);
      if (config.effects.magnetic) this.magnetic(config.effects.magnetic);
      if (config.effects.lights) this.lights(config.effects.lights);
    }
    
    if (config.style) {
      if (config.style.preset) this.preset(config.style.preset);
      if (config.style.theme) this.theme(config.style.theme);
      if (config.style.animate) this.animate(config.style.animate);
    }
    
    if (config.resources) {
      if (config.resources.fonts) this.useFont(config.resources.fonts);
      if (config.resources.icons) this.useIcons(config.resources.icons);
      if (config.resources.css) this.import(config.resources.css);
    }
    
    return this.config;
  }

  // Fluent English-like syntax
  create(what) { return this.make(what); }
  withSize(w, h) { return this.sized(w, h); }
  withContent(c) { return this.containing(c); }
  withStyle(s) { return this.styled(s); }
  andMake() { return this.build(); }
  
  // Shorthand combinations
  glassCircle(size, icon, preset = 'frosted') {
    return this.circle(size, icon).preset(preset);
  }
  
  glassSquare(size, text, preset = 'frosted') {
    return this.square(size, text).preset(preset);
  }
  
  glassButton(text, w, h, preset = 'frosted') {
    return this.button(text, w, h).preset(preset);
  }

  // Size presets
  tiny() { return this.sized(50, 50); }
  small() { return this.sized(100, 100); }
  medium() { return this.sized(200, 200); }
  large() { return this.sized(400, 400); }
  huge() { return this.sized(600, 600); }

  // Effect combinations
  glassy() { return this.blur(60).transparent(6); }
  frosted() { return this.preset('frosted'); }
  minimal() { return this.preset('minimal'); }
  heavy() { return this.preset('heavy'); }
  
  // Physics presets
  bouncy() { return this.animate('bounce').jelly(true); }
  smooth() { return this.animate('smooth').jelly(true); }
  snappy() { return this.animate('snappy').jelly(true); }
  
  // Magnetic presets
  weakMagnetic() { return this.magnetic(0.1); }
  normalMagnetic() { return this.magnetic(0.3); }
  strongMagnetic() { return this.magnetic(0.7); }
  
  // Light presets
  dimLights() { return this.lights(true).updateConfig('lighting.lightIntensity', 0.3); }
  normalLights() { return this.lights(true).updateConfig('lighting.lightIntensity', 0.8); }
  brightLights() { return this.lights(true).updateConfig('lighting.lightIntensity', 1.5); }

  // Color helpers
  withColor(color) {
    this.updateConfig('lighting.lightColor', color);
    return this;
  }
  
  withBackground(bg) {
    if (Array.isArray(bg)) {
      this.updateConfig('backgrounds', bg);
    } else {
      this.updateConfig('backgrounds', [bg]);
    }
    return this;
  }

  // Advanced string parsing with operators
  parse(expression) {
    // Support: "circle(100) | blur(80) | jelly(true) | theme('ocean')"
    const operations = expression.split('|').map(s => s.trim());
    
    operations.forEach(op => {
      const match = op.match(/(\w+)\(([^)]*)\)/);
      if (match) {
        const [, method, args] = match;
        const parsedArgs = args.split(',').map(a => {
          a = a.trim().replace(/['"]/g, '');
          if (a === 'true') return true;
          if (a === 'false') return false;
          if (!isNaN(a)) return parseFloat(a);
          return a;
        });
        
        if (typeof this[method] === 'function') {
          this[method](...parsedArgs);
        }
      }
    });
    
    return this.config;
  }

  // Macro system
  macro(name, fn) {
    if (!this._macros) this._macros = {};
    this._macros[name] = fn;
    return this;
  }
  
  useMacro(name, ...args) {
    if (this._macros && this._macros[name]) {
      this._macros[name](this, ...args);
    }
    return this;
  }

  // Quick presets
  quick = {
    button: (text) => this.button(text, 200, 60).preset('frosted').bouncy(),
    icon: (emoji) => this.icon(emoji, 80).preset('crystal').smooth(),
    card: (title, subtitle) => this.card(title, subtitle, 300, 200).preset('soft').normalMagnetic(),
    window: (title) => this.window(title, 600, 400).preset('minimal').smooth()
  };

  // Experimental: CSS-like syntax parser
  fromCSS(cssString) {
    const rules = cssString.match(/([^{]+)\{([^}]+)\}/g);
    if (rules) {
      rules.forEach(rule => {
        const [selector, props] = rule.split('{');
        const properties = props.replace('}', '').split(';').filter(p => p.trim());
        
        properties.forEach(prop => {
          const [key, value] = prop.split(':').map(s => s.trim());
          if (key === 'blur') this.blur(parseInt(value));
          if (key === 'transparency') this.transparent(parseInt(value));
          if (key === 'border-radius') this.rounded(parseInt(value));
        });
      });
    }
    return this;
  }

  // Experimental: YAML-like syntax
  fromYAML(yamlString) {
    const lines = yamlString.split('\n').filter(l => l.trim());
    const config = {};
    
    lines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      config[key] = value;
    });
    
    return this.from(Object.keys(config).map(k => `${k}:${config[k]}`).join(' '));
  }

  // Version info
  version() {
    return '2.0.3-beta';
  }
  
  // Feature detection
  supports(feature) {
    const features = {
      'backdrop-filter': CSS.supports('backdrop-filter', 'blur(10px)'),
      'jelly': true,
      'magnetic': true,
      'lights': true,
      'external-imports': true,
      'presets': true,
      'themes': true,
      'animations': true,
      'macros': true,
      'pipe': true,
      'parse': true,
      'liquid-text': true
    };
    return features[feature] || false;
  }

  // ========== LIQUID GLASS TEXT ==========
  
  // Create liquid glass text
  text(content, options = {}) {
    const defaults = {
      fontSize: 48,
      fontWeight: 600,
      letterSpacing: 2,
      blur: 60,
      transparency: 6,
      glow: true,
      glowColor: '255, 255, 255',
      glowIntensity: 0.8,
      gradient: false,
      gradientColors: ['#ffffff', '#e0e0e0'],
      stroke: true,
      strokeWidth: 2,
      strokeColor: 'rgba(255, 255, 255, 0.3)',
      shadow: true,
      shadowBlur: 20,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      animate: false,
      animationType: 'float'
    };
    
    const opts = { ...defaults, ...options };
    
    // Create text element with liquid glass styling
    const textStyle = {
      content: content,
      fontSize: opts.fontSize + 'px',
      fontWeight: opts.fontWeight,
      letterSpacing: opts.letterSpacing + 'px',
      color: 'rgba(255, 255, 255, 0.9)',
      textShadow: opts.shadow ? `0 0 ${opts.shadowBlur}px ${opts.shadowColor}` : 'none',
      backdropFilter: `blur(${opts.blur}px)`,
      WebkitBackdropFilter: `blur(${opts.blur}px)`,
      background: opts.gradient 
        ? `linear-gradient(135deg, ${opts.gradientColors.join(', ')})`
        : `rgba(255, 255, 255, ${opts.transparency / 100})`,
      WebkitBackgroundClip: opts.gradient ? 'text' : 'initial',
      WebkitTextFillColor: opts.gradient ? 'transparent' : 'inherit',
      textStroke: opts.stroke ? `${opts.strokeWidth}px ${opts.strokeColor}` : 'none',
      WebkitTextStroke: opts.stroke ? `${opts.strokeWidth}px ${opts.strokeColor}` : 'none',
      filter: opts.glow ? `drop-shadow(0 0 ${opts.glowIntensity * 30}px rgba(${opts.glowColor}, ${opts.glowIntensity}))` : 'none',
      animation: opts.animate ? this._getTextAnimation(opts.animationType) : 'none'
    };
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'liquid-text',
      content: {
        type: 'liquid-text',
        text: content,
        style: textStyle
      }
    };
    
    return this.config;
  }

  // Create liquid glass number
  number(num, options = {}) {
    return this.text(num.toString(), {
      fontSize: 72,
      fontWeight: 700,
      letterSpacing: 4,
      gradient: true,
      gradientColors: ['#60a5fa', '#3b82f6', '#2563eb'],
      glow: true,
      glowColor: '59, 130, 246',
      ...options
    });
  }

  // Create liquid glass heading
  heading(text, level = 1, options = {}) {
    const sizes = { 1: 64, 2: 52, 3: 42, 4: 36, 5: 28, 6: 24 };
    return this.text(text, {
      fontSize: sizes[level] || 48,
      fontWeight: 700,
      ...options
    });
  }

  // Create liquid glass paragraph
  paragraph(text, options = {}) {
    return this.text(text, {
      fontSize: 18,
      fontWeight: 400,
      letterSpacing: 0.5,
      blur: 40,
      transparency: 8,
      ...options
    });
  }

  // Create liquid glass label
  label(text, options = {}) {
    return this.text(text, {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 1,
      blur: 30,
      transparency: 10,
      ...options
    });
  }

  // Create animated liquid glass text
  animatedText(text, animationType = 'float', options = {}) {
    return this.text(text, {
      animate: true,
      animationType: animationType,
      ...options
    });
  }

  // Create glowing liquid glass text
  glowText(text, color = '255, 255, 255', options = {}) {
    return this.text(text, {
      glow: true,
      glowColor: color,
      glowIntensity: 1.2,
      blur: 80,
      ...options
    });
  }

  // Create gradient liquid glass text
  gradientText(text, colors = ['#60a5fa', '#3b82f6'], options = {}) {
    return this.text(text, {
      gradient: true,
      gradientColors: colors,
      fontSize: 56,
      fontWeight: 700,
      ...options
    });
  }

  // Create neon liquid glass text
  neonText(text, color = '#00ffff', options = {}) {
    return this.text(text, {
      glow: true,
      glowColor: color.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', '),
      glowIntensity: 1.5,
      gradient: true,
      gradientColors: [color, '#ffffff'],
      animate: true,
      animationType: 'pulse',
      ...options
    });
  }

  // Create frosted liquid glass text
  frostedText(text, options = {}) {
    return this.text(text, {
      blur: 100,
      transparency: 12,
      stroke: true,
      strokeWidth: 3,
      ...options
    });
  }

  // Create crystal liquid glass text
  crystalText(text, options = {}) {
    return this.text(text, {
      blur: 30,
      transparency: 4,
      gradient: true,
      gradientColors: ['#ffffff', '#e0e0e0', '#c0c0c0'],
      glow: true,
      glowIntensity: 0.6,
      ...options
    });
  }

  // Helper: Get text animation CSS
  _getTextAnimation(type) {
    const animations = {
      float: 'liquidFloat 3s ease-in-out infinite',
      pulse: 'liquidPulse 2s ease-in-out infinite',
      glow: 'liquidGlow 2s ease-in-out infinite',
      wave: 'liquidWave 4s ease-in-out infinite',
      shimmer: 'liquidShimmer 3s linear infinite'
    };
    return animations[type] || animations.float;
  }

  // Inject liquid text animations CSS
  injectTextAnimations() {
    if (document.getElementById('smonthl-text-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'smonthl-text-animations';
    style.textContent = `
      @keyframes liquidFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes liquidPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.9; }
      }
      
      @keyframes liquidGlow {
        0%, 100% { filter: drop-shadow(0 0 20px currentColor); }
        50% { filter: drop-shadow(0 0 40px currentColor); }
      }
      
      @keyframes liquidWave {
        0% { transform: translateX(0) translateY(0); }
        25% { transform: translateX(5px) translateY(-5px); }
        50% { transform: translateX(0) translateY(0); }
        75% { transform: translateX(-5px) translateY(5px); }
        100% { transform: translateX(0) translateY(0); }
      }
      
      @keyframes liquidShimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
    `;
    document.head.appendChild(style);
    this.customStyles.push(style);
  }

  // Create multi-line liquid glass text
  multilineText(lines, options = {}) {
    const configs = lines.map((line, i) => {
      return this.text(line, {
        ...options,
        fontSize: (options.fontSize || 48) - (i * 4)
      });
    });
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'liquid-multiline-text',
      content: {
        type: 'liquid-multiline-text',
        lines: configs
      }
    };
    
    return this.config;
  }

  // Create liquid glass counter (for numbers that change)
  counter(start, end, duration = 2000, options = {}) {
    const config = this.number(start, options);
    config.counter = {
      start: start,
      end: end,
      duration: duration,
      current: start
    };
    return config;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmonthlAPI;
}
