// Smonthl Configuration API
class SmonthlAPI {
  constructor() {
    this.config = null;
    this.listeners = [];
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
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmonthlAPI;
}
