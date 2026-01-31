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
