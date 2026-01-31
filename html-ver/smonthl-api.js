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
