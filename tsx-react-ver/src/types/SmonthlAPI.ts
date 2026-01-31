// SmonthlAPI TypeScript Type Definitions v2.0.1

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
  iconLibrary?: string;
  iconClass?: string;
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

export interface ExternalResource {
  type: 'css' | 'js' | 'json';
  url: string;
  name: string | null;
  data?: any;
}

export type ConfigEventType = 'configLoaded' | 'configUpdated' | 'configImported';

export interface ConfigListener {
  event: ConfigEventType;
  callback: (data: any) => void;
}

export class SmonthlAPI {
  config: SmonthlConfig | null;
  listeners: ConfigListener[];
  externalResources: ExternalResource[];
  customStyles: HTMLStyleElement[];
  private _builder?: any;

  constructor() {
    this.config = null;
    this.listeners = [];
    this.externalResources = [];
    this.customStyles = [];
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
    this.glass({ width, height, text });
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

  // ========== V2.0.1 CREATIVE SYNTAX ==========
  
  make(what: string): this {
    this._builder = { type: what };
    return this;
  }

  with(props: any): this {
    Object.assign(this._builder, props);
    return this;
  }

  sized(width: number, height: number = width): this {
    if (!this._builder) this._builder = {};
    this._builder.width = width;
    this._builder.height = height;
    return this;
  }

  containing(content: string): this {
    if (!this._builder) this._builder = {};
    this._builder.content = content;
    return this;
  }

  styled(styles: any): this {
    if (!this._builder) this._builder = {};
    this._builder.styles = styles;
    return this;
  }

  build(): SmonthlConfig {
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
    this._builder = undefined;
    return config;
  }

  import(resource: string | string[] | Record<string, string>): this {
    if (typeof resource === 'string') {
      this.loadExternal(resource);
    } else if (Array.isArray(resource)) {
      resource.forEach(r => this.loadExternal(r));
    } else {
      Object.keys(resource).forEach(key => {
        this.loadExternal(resource[key], key);
      });
    }
    return this;
  }

  loadExternal(url: string, name: string | null = null): this {
    const ext = url.split('.').pop()?.toLowerCase();
    
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
      fetch(url)
        .then(r => r.json())
        .then(data => {
          this.config = data;
          this.externalResources.push({ type: 'json', url, name, data });
        });
    }
    
    return this;
  }

  preset(name: string): this {
    const presets: Record<string, any> = {
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

  theme(colors: string | { light?: string; bg?: string }): this {
    if (typeof colors === 'string') {
      const themes: Record<string, any> = {
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
    } else {
      if (colors.light) this.updateConfig('lighting.lightColor', colors.light);
      if (colors.bg) document.body.style.background = colors.bg;
    }
    
    return this;
  }

  css(styles: string): this {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    styleEl.id = `smonthl-custom-${Date.now()}`;
    document.head.appendChild(styleEl);
    this.customStyles.push(styleEl);
    return this;
  }

  useFont(family: string, url: string | null = null): this {
    if (url) {
      this.css(`@font-face { font-family: '${family}'; src: url('${url}'); }`);
    } else {
      this.loadGoogleFont(family);
    }
    this.updateConfig('typography.fontFamily', family);
    return this;
  }

  useIcons(library: string, url: string | null = null): this {
    if (url) {
      this.loadExternal(url, `icons-${library}`);
    } else {
      this.loadIconLibrary(library);
    }
    return this;
  }

  animate(type: string): this {
    const animations: Record<string, any> = {
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

  from(syntax: string): SmonthlConfig | null {
    const parts = syntax.split(' ');
    const config: Record<string, string> = {};
    
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

  batch(operations: Array<((api: SmonthlAPI) => void) | string>): this {
    operations.forEach(op => {
      if (typeof op === 'function') {
        op(this);
      } else if (typeof op === 'string') {
        this.from(op);
      }
    });
    return this;
  }

  clone(): SmonthlAPI {
    const api = new SmonthlAPI();
    api.config = JSON.parse(JSON.stringify(this.config));
    return api;
  }

  merge(otherConfig: Partial<SmonthlConfig>): this {
    this.config = {
      ...this.config!,
      ...otherConfig,
      glass: { ...this.config!.glass, ...(otherConfig.glass || {}) },
      content: { ...this.config!.content, ...(otherConfig.content || {}) }
    };
    return this;
  }

  reset(): this {
    this.config = this.getDefaultConfig();
    return this;
  }

  getResources(): { external: ExternalResource[]; styles: HTMLStyleElement[] } {
    return {
      external: this.externalResources,
      styles: this.customStyles
    };
  }

  cleanup(): this {
    this.customStyles.forEach(style => style.remove());
    this.customStyles = [];
    return this;
  }
}
