// SmonthlAPI TypeScript Type Definitions

export interface GlassConfig {
  transparency: number;
  blur: number;
  magnifyingBlur: number;
  magnifyingBrightness: number;
  lensSize: number;
  borderRadius: number;
  width: number;
  height: number;
}

export interface ContentConfig {
  type: 'text' | 'icon' | 'menu';
  title?: string;
  subtitle?: string;
  icon?: string;
  label?: string;
  items?: MenuItem[];
}

export interface MenuItem {
  label: string;
  icon?: string;
}

export interface JellyConfig {
  enabled: boolean;
  elasticity: number;
  friction: number;
  bounceIntensity: number;
  wobbleSpeed: number;
  magneticRange: number;
  magneticStrength: number;
}

export interface LightingConfig {
  cursorFollowEnabled: boolean;
  followDistance: number;
  lightIntensity: number;
  lightSize: number;
  lightColor: string;
}

export interface SmonthlConfig {
  componentType: string;
  glass: GlassConfig;
  content: ContentConfig;
  jelly: JellyConfig;
  lighting: LightingConfig;
  backgrounds: string[];
  backgroundChangeInterval: number;
  templates?: Record<string, Partial<SmonthlConfig>>;
}

export type ConfigEventType = 'configLoaded' | 'configUpdated' | 'configImported';

export interface ConfigListener {
  event: ConfigEventType;
  callback: (data: any) => void;
}

export class SmonthlAPI {
  config: SmonthlConfig | null;
  listeners: ConfigListener[];

  constructor() {
    this.config = null;
    this.listeners = [];
  }

  async loadConfig(url: string = './glass-config.json'): Promise<SmonthlConfig> {
    try {
      const response = await fetch(url);
      this.config = await response.json();
      this.notifyListeners('configLoaded', this.config);
      return this.config!;
    } catch (error) {
      console.error('Failed to load config:', error);
      const defaultConfig = this.getDefaultConfig();
      this.config = defaultConfig;
      return defaultConfig;
    }
  }

  getDefaultConfig(): SmonthlConfig {
    return {
      componentType: 'liquid-glass',
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
        type: 'text',
        title: 'Magnifying Liquid Glass',
        subtitle: 'Real lens magnification • Beautiful backgrounds'
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
        lightColor: '255, 255, 255'
      },
      backgrounds: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'
      ],
      backgroundChangeInterval: 10000
    };
  }

  createFromTemplate(templateName: string): SmonthlConfig | null {
    if (!this.config || !this.config.templates || !this.config.templates[templateName]) {
      console.error(`Template "${templateName}" not found`);
      return null;
    }

    const template = this.config.templates[templateName];
    return {
      ...this.config,
      ...template,
      glass: { ...this.config.glass, ...template.glass },
      content: { ...this.config.content, ...template.content }
    } as SmonthlConfig;
  }

  createCustomComponent(options: {
    type?: string;
    width?: number;
    height?: number;
    borderRadius?: number;
    transparency?: number;
    blur?: number;
    contentType?: 'text' | 'icon' | 'menu';
    title?: string;
    subtitle?: string;
    icon?: string;
    label?: string;
  }): SmonthlConfig {
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

  createCircle(size: number, icon?: string): SmonthlConfig {
    return this.createCustomComponent({
      type: 'circle',
      width: size,
      height: size,
      borderRadius: size / 2,
      icon: icon,
      contentType: 'icon'
    });
  }

  createSquare(size: number, title?: string): SmonthlConfig {
    return this.createCustomComponent({
      type: 'square',
      width: size,
      height: size,
      borderRadius: size * 0.15,
      title: title,
      contentType: 'text'
    });
  }

  createRectangle(width: number, height: number, title?: string): SmonthlConfig {
    return this.createCustomComponent({
      type: 'rectangle',
      width: width,
      height: height,
      borderRadius: Math.min(width, height) * 0.1,
      title: title,
      contentType: 'text'
    });
  }

  createIconButton(icon: string, size: number = 60): SmonthlConfig {
    return this.createCustomComponent({
      type: 'icon-button',
      width: size,
      height: size,
      borderRadius: size / 2,
      icon: icon,
      contentType: 'icon'
    });
  }

  applyShape(shape: 'circle' | 'rounded' | 'square' | 'sharp' | 'pill', size: number): void {
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

  setSize(width: number, height: number): void {
    this.updateConfig('glass.width', width);
    this.updateConfig('glass.height', height);
  }

  setIcon(icon: string): void {
    this.updateConfig('content.type', 'icon');
    this.updateConfig('content.icon', icon);
  }

  setTitle(title: string, subtitle: string = ''): void {
    this.updateConfig('content.type', 'text');
    this.updateConfig('content.title', title);
    if (subtitle) {
      this.updateConfig('content.subtitle', subtitle);
    }
  }

  // Simple DSL-style shortcuts
  glass(config: {
    size?: number;
    width?: number;
    height?: number;
    shape?: 'circle' | 'square';
    icon?: string;
    text?: string;
    blur?: number;
    transparency?: number;
    radius?: number;
    font?: string;
    icons?: string;
  }): SmonthlConfig {
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
    
    return this.config!;
  }

  // Shortcut: circle
  circle(size: number, icon?: string): SmonthlConfig {
    return this.glass({ size, shape: 'circle', icon });
  }

  // Shortcut: square
  square(size: number, text?: string): SmonthlConfig {
    return this.glass({ size, shape: 'square', text });
  }

  // Shortcut: button
  button(text: string, width: number = 200, height: number = 60): SmonthlConfig {
    const config = this.glass({ width, height, text });
    this.applyShape('pill', height);
    return this.config!;
  }

  // Shortcut: card
  card(title: string, subtitle: string, width: number = 300, height: number = 200): SmonthlConfig {
    this.config = this.createRectangle(width, height, title);
    this.updateConfig('content.subtitle', subtitle);
    return this.config!;
  }

  // Shortcut: icon
  icon(emoji: string, size: number = 80): SmonthlConfig {
    return this.circle(size, emoji);
  }

  // Shortcut: window
  window(title: string, width: number = 600, height: number = 400): SmonthlConfig {
    return this.card(title, '', width, height);
  }

  // Chain-able methods
  blur(amount: number): this {
    this.updateConfig('glass.blur', amount);
    return this;
  }

  transparent(amount: number): this {
    this.updateConfig('glass.transparency', amount);
    return this;
  }

  rounded(amount: number): this {
    this.updateConfig('glass.borderRadius', amount);
    return this;
  }

  draggable(enabled: boolean = true): this {
    this.updateConfig('draggable', enabled);
    return this;
  }

  jelly(enabled: boolean = true): this {
    this.updateConfig('jelly.enabled', enabled);
    return this;
  }

  magnetic(strength: number = 0.3): this {
    this.updateConfig('jelly.magneticStrength', strength);
    return this;
  }

  lights(enabled: boolean = true): this {
    this.updateConfig('lighting.cursorFollowEnabled', enabled);
    return this;
  }

  font(name: string, weights: string = '300,400,600'): this {
    this.loadGoogleFont(name, weights);
    return this;
  }

  icons(library: string): this {
    this.loadIconLibrary(library);
    return this;
  }

  // Load external icon library
  loadIconLibrary(type: string, cdnUrl: string | null = null): boolean {
    const libraries: Record<string, string> = {
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

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);

    this.updateConfig('iconLibrary.type', type);
    this.updateConfig('iconLibrary.cdnUrl', url);
    
    return true;
  }

  // Load custom font
  loadFont(fontFamily: string, fontUrl: string | null = null): boolean {
    if (fontUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      document.head.appendChild(link);
    }
    
    this.updateConfig('typography.fontFamily', fontFamily);
    return true;
  }

  // Load Google Font
  loadGoogleFont(fontName: string, weights: string = '300,400,600'): boolean {
    const url = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@${weights}&display=swap`;
    return this.loadFont(fontName, url);
  }

  // Set typography
  setTypography(options: {
    fontFamily?: string;
    titleSize?: string;
    subtitleSize?: string;
    titleWeight?: number;
    subtitleWeight?: number;
    letterSpacing?: string;
    lineHeight?: number;
  }): void {
    if (options.fontFamily) this.updateConfig('typography.fontFamily', options.fontFamily);
    if (options.titleSize) this.updateConfig('typography.titleSize', options.titleSize);
    if (options.subtitleSize) this.updateConfig('typography.subtitleSize', options.subtitleSize);
    if (options.titleWeight) this.updateConfig('typography.titleWeight', options.titleWeight);
    if (options.subtitleWeight) this.updateConfig('typography.subtitleWeight', options.subtitleWeight);
    if (options.letterSpacing) this.updateConfig('typography.letterSpacing', options.letterSpacing);
    if (options.lineHeight) this.updateConfig('typography.lineHeight', options.lineHeight);
  }

  // Create icon with library
  createIconWithLibrary(libraryType: string, iconClass: string, size: number = 64): SmonthlConfig {
    const config = this.createCircle(size);
    config.content = {
      type: 'icon',
      iconLibrary: libraryType,
      iconClass: iconClass
    };
    return config;
  }

  getTemplates(): Record<string, Partial<SmonthlConfig>> {
    return this.config?.templates || {};
  }

  updateConfig(path: string, value: any): void {
    if (!this.config) return;
    
    const keys = path.split('.');
    let obj: any = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.notifyListeners('configUpdated', { path, value });
  }

  getConfig(path: string): any {
    if (!this.config) return null;
    
    const keys = path.split('.');
    let obj: any = this.config;
    for (const key of keys) {
      obj = obj[key];
    }
    return obj;
  }

  exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  importConfig(jsonString: string): boolean {
    try {
      this.config = JSON.parse(jsonString);
      this.notifyListeners('configImported', this.config);
      return true;
    } catch (error) {
      console.error('Failed to import config:', error);
      return false;
    }
  }

  on(event: ConfigEventType, callback: (data: any) => void): void {
    this.listeners.push({ event, callback });
  }

  notifyListeners(event: ConfigEventType, data: any): void {
    this.listeners
      .filter(l => l.event === event)
      .forEach(l => l.callback(data));
  }

  saveToLocalStorage(): void {
    localStorage.setItem('smonthlConfig', this.exportConfig());
  }

  loadFromLocalStorage(): boolean {
    const saved = localStorage.getItem('smonthlConfig');
    if (saved) {
      return this.importConfig(saved);
    }
    return false;
  }
}
