// SmonthlAPI TypeScript Type Definitions v2.0.4-beta

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
  type: 'text' | 'icon' | 'menu' | 'code' | 'highlighted-code' | 'transformed-code' | 'analysis' | 'template' | 'playground' | 'diff' | 'lint' | 'formatted' | 'documentation' | 'test-results' | 'performance' | 'bundle' | 'compiled' | 'ast' | 'refactored' | 'search-results' | 'replaced' | 'composed' | 'layout';
  title?: string;
  subtitle?: string;
  icon?: string;
  label?: string;
  items?: MenuItem[];
  iconLibrary?: string;
  iconClass?: string;
  source?: string;
  language?: string;
  options?: any;
  result?: any;
  html?: string;
  theme?: string;
  original?: string;
  transformed?: string;
  transformer?: string;
  metrics?: any;
  name?: string;
  variables?: any;
  code?: string;
  output?: any;
  modified?: string;
  differences?: any[];
  issues?: any[];
  rules?: any;
  formatted?: string;
  style?: string;
  format?: string;
  docs?: any[];
  tests?: any[];
  results?: any[];
  iterations?: number;
  totalTime?: number;
  averageTime?: number;
  opsPerSecond?: number;
  modules?: any;
  bundled?: string;
  compiled?: string;
  target?: string;
  ast?: any;
  refactored?: string;
  pattern?: string;
  matches?: any[];
  count?: number;
  replacement?: string;
  replaced?: string;
  components?: any[];
  layoutType?: string;
  children?: any[];
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
  customCSS?: Record<string, any>;
  animation?: any;
  transition?: string[];
  transform?: string;
  filter?: string;
  responsive?: any;
  darkMode?: any;
  computed?: Function;
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
  plugins: Array<{ plugin: any; options: any }>;
  resourceCache: Map<string, any>;
  private _builder?: any;
  private _macros?: Record<string, (api: SmonthlAPI, ...args: any[]) => void>;
  private _themes?: Record<string, any>;
  private _vars?: Record<string, any>;
  private _watchers?: Record<string, Function>;
  private _events?: Record<string, Function[]>;
  private _state?: any;
  gsap?: any;
  Chart?: any;
  THREE?: any;

  constructor() {
    this.config = null;
    this.listeners = [];
    this.externalResources = [];
    this.customStyles = [];
    this.plugins = [];
    this.resourceCache = new Map();
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

  // ========== V2.0.2-BETA EXTENDED SYNTAX ==========
  
  pipe(...fns: Array<(api: SmonthlAPI) => void>): this {
    fns.forEach(fn => fn(this));
    return this;
  }

  when(condition: boolean, trueFn: (api: SmonthlAPI) => void, falseFn: ((api: SmonthlAPI) => void) | null = null): this {
    if (condition) {
      trueFn(this);
    } else if (falseFn) {
      falseFn(this);
    }
    return this;
  }

  repeat(times: number, fn: (api: SmonthlAPI, index: number) => void): this {
    for (let i = 0; i < times; i++) {
      fn(this, i);
    }
    return this;
  }

  template(strings: TemplateStringsArray, ...values: any[]): SmonthlConfig | null {
    const syntax = strings.reduce((acc, str, i) => {
      return acc + str + (values[i] || '');
    }, '');
    return this.from(syntax);
  }

  define(config: {
    shape?: 'circle' | 'square' | 'button' | 'card';
    size?: number;
    width?: number;
    height?: number;
    icon?: string;
    text?: string;
    title?: string;
    subtitle?: string;
    effects?: {
      blur?: number;
      transparency?: number;
      jelly?: boolean;
      magnetic?: number;
      lights?: boolean;
    };
    style?: {
      preset?: string;
      theme?: string;
      animate?: string;
    };
    resources?: {
      fonts?: string;
      icons?: string;
      css?: string | string[];
    };
  }): SmonthlConfig | null {
    if (config.shape) {
      const shapes: Record<string, () => void> = {
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

  create(what: string): this { return this.make(what); }
  withSize(w: number, h?: number): this { return this.sized(w, h); }
  withContent(c: string): this { return this.containing(c); }
  withStyle(s: any): this { return this.styled(s); }
  andMake(): SmonthlConfig { return this.build(); }
  
  glassCircle(size: number, icon?: string, preset: string = 'frosted'): SmonthlConfig {
    this.circle(size, icon);
    this.preset(preset);
    return this.config!;
  }
  
  glassSquare(size: number, text?: string, preset: string = 'frosted'): SmonthlConfig {
    this.square(size, text);
    this.preset(preset);
    return this.config!;
  }
  
  glassButton(text: string, w?: number, h?: number, preset: string = 'frosted'): SmonthlConfig {
    this.button(text, w, h);
    this.preset(preset);
    return this.config!;
  }

  tiny(): this { return this.sized(50, 50); }
  small(): this { return this.sized(100, 100); }
  medium(): this { return this.sized(200, 200); }
  large(): this { return this.sized(400, 400); }
  huge(): this { return this.sized(600, 600); }

  glassy(): this { return this.blur(60).transparent(6); }
  frosted(): this { return this.preset('frosted'); }
  minimal(): this { return this.preset('minimal'); }
  heavy(): this { return this.preset('heavy'); }
  
  bouncy(): this { return this.animate('bounce').jelly(true); }
  smooth(): this { return this.animate('smooth').jelly(true); }
  snappy(): this { return this.animate('snappy').jelly(true); }
  
  weakMagnetic(): this { return this.magnetic(0.1); }
  normalMagnetic(): this { return this.magnetic(0.3); }
  strongMagnetic(): this { return this.magnetic(0.7); }
  
  dimLights(): this { 
    this.lights(true);
    this.updateConfig('lighting.lightIntensity', 0.3);
    return this;
  }
  normalLights(): this { 
    this.lights(true);
    this.updateConfig('lighting.lightIntensity', 0.8);
    return this;
  }
  brightLights(): this { 
    this.lights(true);
    this.updateConfig('lighting.lightIntensity', 1.5);
    return this;
  }

  withColor(color: string): this {
    this.updateConfig('lighting.lightColor', color);
    return this;
  }
  
  withBackground(bg: string | string[]): this {
    if (Array.isArray(bg)) {
      this.updateConfig('backgrounds', bg);
    } else {
      this.updateConfig('backgrounds', [bg]);
    }
    return this;
  }

  parse(expression: string): SmonthlConfig | null {
    const operations = expression.split('|').map(s => s.trim());
    
    operations.forEach(op => {
      const match = op.match(/(\w+)\(([^)]*)\)/);
      if (match) {
        const [, method, args] = match;
        const parsedArgs = args.split(',').map(a => {
          a = a.trim().replace(/['"]/g, '');
          if (a === 'true') return true;
          if (a === 'false') return false;
          if (!isNaN(Number(a))) return parseFloat(a);
          return a;
        });
        
        if (typeof (this as any)[method] === 'function') {
          (this as any)[method](...parsedArgs);
        }
      }
    });
    
    return this.config;
  }
  
  macro(name: string, fn: (api: SmonthlAPI, ...args: any[]) => void): this {
    if (!this._macros) this._macros = {};
    this._macros[name] = fn;
    return this;
  }
  
  useMacro(name: string, ...args: any[]): this {
    if (this._macros && this._macros[name]) {
      this._macros[name](this, ...args);
    }
    return this;
  }

  fromCSS(cssString: string): this {
    const rules = cssString.match(/([^{]+)\{([^}]+)\}/g);
    if (rules) {
      rules.forEach(rule => {
        const [, props] = rule.split('{');
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

  fromYAML(yamlString: string): SmonthlConfig | null {
    const lines = yamlString.split('\n').filter(l => l.trim());
    const config: Record<string, string> = {};
    
    lines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      config[key] = value;
    });
    
    return this.from(Object.keys(config).map(k => `${k}:${config[k]}`).join(' '));
  }

  version(): string {
    return '2.0.7';
  }
  
  supports(feature: string): boolean {
    const features: Record<string, boolean> = {
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
  
  text(content: string, options: any = {}): SmonthlConfig {
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
        type: 'text',
        title: content,
        style: textStyle
      } as any
    };
    
    return this.config!;
  }

  number(num: number, options: any = {}): SmonthlConfig {
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

  heading(text: string, level: number = 1, options: any = {}): SmonthlConfig {
    const sizes: Record<number, number> = { 1: 64, 2: 52, 3: 42, 4: 36, 5: 28, 6: 24 };
    return this.text(text, {
      fontSize: sizes[level] || 48,
      fontWeight: 700,
      ...options
    });
  }

  paragraph(text: string, options: any = {}): SmonthlConfig {
    return this.text(text, {
      fontSize: 18,
      fontWeight: 400,
      letterSpacing: 0.5,
      blur: 40,
      transparency: 8,
      ...options
    });
  }

  label(text: string, options: any = {}): SmonthlConfig {
    return this.text(text, {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 1,
      blur: 30,
      transparency: 10,
      ...options
    });
  }

  animatedText(text: string, animationType: string = 'float', options: any = {}): SmonthlConfig {
    return this.text(text, {
      animate: true,
      animationType: animationType,
      ...options
    });
  }

  glowText(text: string, color: string = '255, 255, 255', options: any = {}): SmonthlConfig {
    return this.text(text, {
      glow: true,
      glowColor: color,
      glowIntensity: 1.2,
      blur: 80,
      ...options
    });
  }

  gradientText(text: string, colors: string[] = ['#60a5fa', '#3b82f6'], options: any = {}): SmonthlConfig {
    return this.text(text, {
      gradient: true,
      gradientColors: colors,
      fontSize: 56,
      fontWeight: 700,
      ...options
    });
  }

  neonText(text: string, color: string = '#00ffff', options: any = {}): SmonthlConfig {
    return this.text(text, {
      glow: true,
      glowColor: color.replace('#', '').match(/.{2}/g)!.map(x => parseInt(x, 16)).join(', '),
      glowIntensity: 1.5,
      gradient: true,
      gradientColors: [color, '#ffffff'],
      animate: true,
      animationType: 'pulse',
      ...options
    });
  }

  frostedText(text: string, options: any = {}): SmonthlConfig {
    return this.text(text, {
      blur: 100,
      transparency: 12,
      stroke: true,
      strokeWidth: 3,
      ...options
    });
  }

  crystalText(text: string, options: any = {}): SmonthlConfig {
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

  private _getTextAnimation(type: string): string {
    const animations: Record<string, string> = {
      float: 'liquidFloat 3s ease-in-out infinite',
      pulse: 'liquidPulse 2s ease-in-out infinite',
      glow: 'liquidGlow 2s ease-in-out infinite',
      wave: 'liquidWave 4s ease-in-out infinite',
      shimmer: 'liquidShimmer 3s linear infinite'
    };
    return animations[type] || animations.float;
  }

  injectTextAnimations(): void {
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

  multilineText(lines: string[], options: any = {}): SmonthlConfig {
    lines.map((line, i) => {
      return this.text(line, {
        ...options,
        fontSize: (options.fontSize || 48) - (i * 4)
      });
    });
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'liquid-multiline-text',
      content: {
        type: 'text',
        title: lines.join('\n')
      } as any
    };
    
    return this.config!;
  }

  counter(start: number, end: number, duration: number = 2000, options: any = {}): any {
    const config = this.number(start, options);
    (config as any).counter = {
      start: start,
      end: end,
      duration: duration,
      current: start
    };
    return config;
  }

  // ========== V2.0.4-BETA PLUGIN & RESOURCE SYSTEM ==========
  
  use(plugin: any, options: any = {}): this {
    if (typeof plugin === 'function') {
      plugin(this, options);
    } else if (typeof plugin === 'object' && plugin.install) {
      plugin.install(this, options);
    }
    this.plugins.push({ plugin, options });
    return this;
  }

  async loadResource(url: string, type: string = 'auto'): Promise<any> {
    if (this.resourceCache.has(url)) return this.resourceCache.get(url);
    const detectedType = type === 'auto' ? url.split('.').pop()?.toLowerCase() : type;
    try {
      let resource;
      if (detectedType === 'json') {
        const response = await fetch(url);
        resource = await response.json();
      } else if (detectedType === 'css') {
        resource = await this._loadCSS(url);
      } else if (detectedType === 'js') {
        resource = await this._loadScript(url);
      }
      this.resourceCache.set(url, resource);
      return resource;
    } catch (error) {
      console.error(`Failed to load: ${url}`, error);
      return null;
    }
  }

  private _loadCSS(url: string): Promise<HTMLLinkElement> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => resolve(link);
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  private _loadScript(url: string): Promise<HTMLScriptElement> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve(script);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadResources(resources: Array<string | { url: string; type: string }>): Promise<any[]> {
    return Promise.all(resources.map(r => 
      typeof r === 'string' ? this.loadResource(r) : this.loadResource(r.url, r.type)
    ));
  }

  loadCDN(library: string, version: string = 'latest'): Promise<any> {
    const cdns: Record<string, string> = {
      'gsap': `https://cdn.jsdelivr.net/npm/gsap@${version}/dist/gsap.min.js`,
      'anime': `https://cdn.jsdelivr.net/npm/animejs@${version}/lib/anime.min.js`,
      'particles': `https://cdn.jsdelivr.net/npm/particles.js@${version}/particles.min.js`,
      'chart': `https://cdn.jsdelivr.net/npm/chart.js@${version}/dist/chart.min.js`,
      'd3': `https://cdn.jsdelivr.net/npm/d3@${version}/dist/d3.min.js`
    };
    return cdns[library] ? this.loadResource(cdns[library], 'js') : Promise.reject(new Error(`Unknown: ${library}`));
  }

  loadNPM(packageName: string, file: string = ''): Promise<any> {
    return this.loadResource(`https://unpkg.com/${packageName}${file ? '/' + file : ''}`);
  }

  loadGitHub(user: string, repo: string, path: string, branch: string = 'main'): Promise<any> {
    return this.loadResource(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`);
  }

  preload(resources: string[]): this {
    resources.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = url.endsWith('.js') ? 'script' : url.endsWith('.css') ? 'style' : 'fetch';
      document.head.appendChild(link);
    });
    return this;
  }

  clearCache(): this {
    this.resourceCache.clear();
    return this;
  }

  getCacheStats(): { size: number; keys: string[] } {
    return { size: this.resourceCache.size, keys: Array.from(this.resourceCache.keys()) };
  }

  installPlugin(name: string, _options: any = {}): Promise<any> {
    const plugins: Record<string, () => Promise<any>> = {
      'particles': () => this.loadCDN('particles'),
      'animations': () => this.loadCDN('gsap').then(() => { this.gsap = (window as any).gsap; }),
      'charts': () => this.loadCDN('chart').then(() => { this.Chart = (window as any).Chart; })
    };
    return plugins[name] ? plugins[name]() : Promise.reject(new Error(`Unknown plugin: ${name}`));
  }

  getPlugins(): Array<{ plugin: any; options: any }> {
    return this.plugins;
  }

  // ========== V2.0.5 FULL CODE FEATURES ==========
  
  code(source: string, language: string = 'javascript', options: any = {}): any {
    const defaults = {
      execute: false,
      sandbox: true,
      timeout: 5000,
      context: {},
      returnValue: true,
      async: false
    };
    const opts = { ...defaults, ...options };
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-block',
      content: {
        type: 'code',
        source: source,
        language: language,
        options: opts,
        result: null
      }
    };
    
    if (opts.execute) {
      this.config.content.result = this._executeCode(source, language, opts);
    }
    
    return this.config;
  }

  private _executeCode(source: string, language: string, options: any): any {
    try {
      if (language === 'javascript' || language === 'js') {
        if (options.sandbox) {
          const sandbox = { ...options.context, console: console };
          const fn = new Function(...Object.keys(sandbox), `"use strict"; ${options.returnValue ? 'return ' : ''}${source}`);
          return fn(...Object.values(sandbox));
        } else {
          return options.returnValue ? eval(source) : (eval(source), undefined);
        }
      } else if (language === 'json') {
        return JSON.parse(source);
      } else if (language === 'expression') {
        return this._evaluateExpression(source, options.context);
      }
    } catch (error: any) {
      return { error: error.message, stack: error.stack };
    }
  }

  private _evaluateExpression(expr: string, context: any = {}): any {
    const safeEval = (expression: string, vars: any) => {
      const fn = new Function(...Object.keys(vars), `"use strict"; return ${expression}`);
      return fn(...Object.values(vars));
    };
    return safeEval(expr, context);
  }

  highlight(source: string, language: string = 'javascript', theme: string = 'dark'): any {
    const highlighted = this._highlightSyntax(source, language, theme);
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-highlight',
      content: {
        type: 'highlighted-code',
        source: source,
        language: language,
        theme: theme,
        html: highlighted
      }
    };
    return this.config;
  }

  private _highlightSyntax(source: string, language: string, theme: string): string {
    const themes: any = {
      dark: { keyword: '#ff79c6', string: '#f1fa8c', number: '#bd93f9', comment: '#6272a4', function: '#50fa7b' },
      light: { keyword: '#d73a49', string: '#032f62', number: '#005cc5', comment: '#6a737d', function: '#6f42c1' }
    };
    const colors = themes[theme] || themes.dark;
    
    let highlighted = source;
    
    if (language === 'javascript' || language === 'js') {
      const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'this', 'async', 'await'];
      keywords.forEach(kw => {
        highlighted = highlighted.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span style="color:${colors.keyword}">${kw}</span>`);
      });
      highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, `<span style="color:${colors.string}">$&</span>`);
      highlighted = highlighted.replace(/\b\d+\b/g, `<span style="color:${colors.number}">$&</span>`);
      highlighted = highlighted.replace(/\/\/.*/g, `<span style="color:${colors.comment}">$&</span>`);
    }
    
    return `<pre style="background:${theme === 'dark' ? '#282a36' : '#f6f8fa'};padding:20px;border-radius:8px;overflow:auto;"><code>${highlighted}</code></pre>`;
  }

  transform(source: string, transformer: string, options: any = {}): any {
    const transformers: any = {
      minify: (code: string) => code.replace(/\s+/g, ' ').trim(),
      beautify: (code: string) => this._beautifyCode(code),
      obfuscate: (code: string) => this._obfuscateCode(code),
      transpile: (code: string) => this._transpileCode(code, options),
      optimize: (code: string) => this._optimizeCode(code)
    };
    
    const transformed = transformers[transformer] ? transformers[transformer](source) : source;
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-transform',
      content: {
        type: 'transformed-code',
        original: source,
        transformed: transformed,
        transformer: transformer
      }
    };
    
    return this.config;
  }

  private _beautifyCode(code: string): string {
    let indent = 0;
    let beautified = '';
    const lines = code.split(/[;{}]/);
    
    lines.forEach(line => {
      line = line.trim();
      if (line.includes('}')) indent--;
      beautified += '  '.repeat(Math.max(0, indent)) + line + '\n';
      if (line.includes('{')) indent++;
    });
    
    return beautified;
  }

  private _obfuscateCode(code: string): string {
    const varMap: any = {};
    let counter = 0;
    return code.replace(/\b([a-z_][a-z0-9_]*)\b/gi, (match) => {
      if (!varMap[match]) varMap[match] = '_0x' + (counter++).toString(16);
      return varMap[match];
    });
  }

  private _transpileCode(code: string, _options: any): string {
    let transpiled = code;
    transpiled = transpiled.replace(/const\s+/g, 'var ');
    transpiled = transpiled.replace(/let\s+/g, 'var ');
    transpiled = transpiled.replace(/=>\s*{/g, 'function() {');
    transpiled = transpiled.replace(/=>\s*/g, 'function() { return ');
    return transpiled;
  }

  private _optimizeCode(code: string): string {
    let optimized = code;
    optimized = optimized.replace(/console\.log\([^)]*\);?/g, '');
    optimized = optimized.replace(/\/\*[\s\S]*?\*\//g, '');
    optimized = optimized.replace(/\/\/.*/g, '');
    optimized = optimized.replace(/\s+/g, ' ').trim();
    return optimized;
  }

  analyze(source: string, language: string = 'javascript'): any {
    const analysis = {
      lines: source.split('\n').length,
      characters: source.length,
      words: source.split(/\s+/).length,
      functions: (source.match(/function\s+\w+/g) || []).length,
      variables: (source.match(/(?:const|let|var)\s+\w+/g) || []).length,
      complexity: this._calculateComplexity(source),
      dependencies: this._extractDependencies(source)
    };
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-analysis',
      content: {
        type: 'analysis',
        source: source,
        language: language,
        metrics: analysis
      }
    };
    
    return this.config;
  }

  private _calculateComplexity(code: string): number {
    let complexity = 1;
    const patterns = [/if\s*\(/g, /for\s*\(/g, /while\s*\(/g, /case\s+/g, /&&|\|\|/g];
    patterns.forEach(pattern => {
      const matches = code.match(pattern);
      if (matches) complexity += matches.length;
    });
    return complexity;
  }

  private _extractDependencies(code: string): string[] {
    const imports = code.match(/import\s+.*?from\s+['"]([^'"]+)['"]/g) || [];
    const requires = code.match(/require\s*\(\s*['"]([^'"]+)['"]\s*\)/g) || [];
    return [...imports, ...requires].map(dep => dep.match(/['"]([^'"]+)['"]/)?.[1] || '');
  }

  codeTemplate(name: string, variables: any = {}): any {
    const templates: any = {
      component: (vars: any) => `
class ${vars.name || 'Component'} {
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  
  render() {
    return ${vars.template || 'null'};
  }
}`,
      function: (vars: any) => `
function ${vars.name || 'myFunction'}(${vars.params || ''}) {
  ${vars.body || '// TODO: implement'}
  return ${vars.return || 'null'};
}`,
      class: (vars: any) => `
class ${vars.name || 'MyClass'} {
  constructor(${vars.params || ''}) {
    ${vars.constructor || '// Initialize'}
  }
  
  ${vars.methods || '// Add methods'}
}`,
      api: (vars: any) => `
async function ${vars.name || 'fetchData'}(${vars.params || 'url'}) {
  try {
    const response = await fetch(${vars.endpoint || 'url'});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}`,
      module: (vars: any) => `
// ${vars.name || 'Module'} v${vars.version || '1.0.0'}
export const ${vars.name || 'module'} = {
  ${vars.exports || '// Add exports'}
};

export default ${vars.name || 'module'};`
    };
    
    const generated = templates[name] ? templates[name](variables) : '';
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-template',
      content: {
        type: 'template',
        name: name,
        variables: variables,
        code: generated
      }
    };
    
    return this.config;
  }

  snippet(name: string, language: string = 'javascript'): any {
    const snippets: any = {
      debounce: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
      throttle: `function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`,
      deepClone: `function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}`,
      curry: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...args2) => curried.apply(this, args.concat(args2));
  };
}`,
      memoize: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`
    };
    
    return this.code(snippets[name] || '', language);
  }

  playground(initialCode: string = '', options: any = {}): any {
    const defaults = {
      language: 'javascript',
      theme: 'dark',
      autoRun: false,
      showOutput: true,
      editable: true
    };
    const opts = { ...defaults, ...options };
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-playground',
      content: {
        type: 'playground',
        code: initialCode,
        options: opts,
        output: null
      }
    };
    
    return this.config;
  }

  diff(code1: string, code2: string, options: any = {}): any {
    const differences = this._computeDiff(code1, code2);
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-diff',
      content: {
        type: 'diff',
        original: code1,
        modified: code2,
        differences: differences,
        options: options
      }
    };
    
    return this.config;
  }

  private _computeDiff(str1: string, str2: string): any[] {
    const lines1 = str1.split('\n');
    const lines2 = str2.split('\n');
    const diff: any[] = [];
    
    const maxLen = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLen; i++) {
      if (lines1[i] !== lines2[i]) {
        diff.push({
          line: i + 1,
          removed: lines1[i] || null,
          added: lines2[i] || null
        });
      }
    }
    
    return diff;
  }

  lint(source: string, rules: any = {}): any {
    const issues: any[] = [];
    
    if (rules.noConsole !== false && source.includes('console.')) {
      issues.push({ type: 'warning', message: 'Avoid console statements', line: -1 });
    }
    if (rules.noVar !== false && source.includes('var ')) {
      issues.push({ type: 'warning', message: 'Use const/let instead of var', line: -1 });
    }
    if (rules.semicolons !== false && !source.match(/;$/m)) {
      issues.push({ type: 'warning', message: 'Missing semicolons', line: -1 });
    }
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-lint',
      content: {
        type: 'lint',
        source: source,
        issues: issues,
        rules: rules
      }
    };
    
    return this.config;
  }

  format(source: string, style: string = 'standard'): any {
    const styles: any = {
      standard: { indent: 2, semicolons: true, quotes: 'single' },
      compact: { indent: 0, semicolons: false, quotes: 'double' },
      google: { indent: 2, semicolons: true, quotes: 'single' },
      airbnb: { indent: 2, semicolons: true, quotes: 'single' }
    };
    
    const config = styles[style] || styles.standard;
    let formatted = source;
    
    if (config.quotes === 'single') {
      formatted = formatted.replace(/"/g, "'");
    } else {
      formatted = formatted.replace(/'/g, '"');
    }
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-format',
      content: {
        type: 'formatted',
        original: source,
        formatted: formatted,
        style: style
      }
    };
    
    return this.config;
  }

  document(source: string, format: string = 'jsdoc'): any {
    const docs = this._generateDocs(source, format);
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-docs',
      content: {
        type: 'documentation',
        source: source,
        format: format,
        docs: docs
      }
    };
    
    return this.config;
  }

  private _generateDocs(source: string, _format: string): any[] {
    const functions = source.match(/function\s+(\w+)\s*\(([^)]*)\)/g) || [];
    const docs = functions.map(fn => {
      const match = fn.match(/function\s+(\w+)\s*\(([^)]*)\)/);
      return {
        name: match?.[1] || '',
        params: (match?.[2] || '').split(',').map(p => p.trim()).filter(p => p),
        description: `Function ${match?.[1] || ''}`
      };
    });
    
    return docs;
  }

  test(source: string, tests: any[] = [], options: any = {}): any {
    const results = tests.map(test => {
      try {
        const result = this._executeCode(source, 'javascript', { ...options, returnValue: true });
        const passed = test.assert(result);
        return { name: test.name, passed: passed, result: result };
      } catch (error: any) {
        return { name: test.name, passed: false, error: error.message };
      }
    });
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-test',
      content: {
        type: 'test-results',
        source: source,
        tests: tests,
        results: results
      }
    };
    
    return this.config;
  }

  profile(fn: Function, iterations: number = 1000): any {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      fn();
    }
    const end = performance.now();
    const avgTime = (end - start) / iterations;
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-profile',
      content: {
        type: 'performance',
        iterations: iterations,
        totalTime: end - start,
        averageTime: avgTime,
        opsPerSecond: 1000 / avgTime
      }
    };
    
    return this.config;
  }

  bundle(modules: any, options: any = {}): any {
    let bundled = '(function() {\n';
    bundled += '  const modules = {};\n';
    
    Object.keys(modules).forEach(name => {
      bundled += `  modules['${name}'] = function() {\n${modules[name]}\n  };\n`;
    });
    
    bundled += '  const require = (name) => modules[name]();\n';
    bundled += '  ' + (options.entry || 'require("main")') + ';\n';
    bundled += '})();';
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-bundle',
      content: {
        type: 'bundle',
        modules: modules,
        bundled: bundled,
        options: options
      }
    };
    
    return this.config;
  }

  // ========== V2.0.6 EXPANDED FEATURES ==========
  
  styleObject(styleObject: any): this {
    Object.keys(styleObject).forEach(key => {
      const value = styleObject[key];
      if (key === 'blur') this.blur(value);
      else if (key === 'transparency') this.transparent(value);
      else if (key === 'rounded') this.rounded(value);
    });
    return this;
  }

  cssInJS(styles: any): this {
    if (!this.config) this.config = this.getDefaultConfig();
    if (!this.config.customCSS) this.config.customCSS = {};
    Object.assign(this.config.customCSS, styles);
    return this;
  }

  tw(classes: string): this {
    const classMap: any = {
      'blur-sm': () => this.blur(20),
      'blur-md': () => this.blur(40),
      'blur-lg': () => this.blur(60),
      'blur-xl': () => this.blur(80),
      'rounded-sm': () => this.rounded(4),
      'rounded-md': () => this.rounded(8),
      'rounded-lg': () => this.rounded(16),
      'rounded-xl': () => this.rounded(24),
      'rounded-full': () => this.rounded(9999)
    };
    
    classes.split(' ').forEach(cls => {
      if (classMap[cls]) classMap[cls]();
    });
    
    return this;
  }

  animateAdvanced(name: string, options: any = {}): this {
    const animations: any = {
      fadeIn: { keyframes: 'fadeIn 0.5s ease-in', duration: 500 },
      fadeOut: { keyframes: 'fadeOut 0.5s ease-out', duration: 500 },
      slideIn: { keyframes: 'slideIn 0.5s ease-out', duration: 500 },
      slideOut: { keyframes: 'slideOut 0.5s ease-in', duration: 500 },
      zoomIn: { keyframes: 'zoomIn 0.5s ease-out', duration: 500 },
      zoomOut: { keyframes: 'zoomOut 0.5s ease-in', duration: 500 },
      rotate: { keyframes: 'rotate 1s linear infinite', duration: 1000 },
      pulse: { keyframes: 'pulse 2s ease-in-out infinite', duration: 2000 },
      bounce: { keyframes: 'bounce 1s ease-in-out infinite', duration: 1000 },
      shake: { keyframes: 'shake 0.5s ease-in-out', duration: 500 },
      flip: { keyframes: 'flip 1s ease-in-out', duration: 1000 },
      swing: { keyframes: 'swing 1s ease-in-out', duration: 1000 }
    };
    
    const anim = animations[name] || animations.fadeIn;
    if (!this.config) this.config = this.getDefaultConfig();
    this.config.animation = { ...anim, ...options };
    
    return this;
  }

  keyframesCustom(name: string, frames: any): this {
    const style = document.createElement('style');
    let css = `@keyframes ${name} {\n`;
    Object.keys(frames).forEach(key => {
      css += `  ${key} { ${Object.entries(frames[key]).map(([k, v]) => `${k}: ${v}`).join('; ')} }\n`;
    });
    css += '}';
    style.textContent = css;
    document.head.appendChild(style);
    this.customStyles.push(style);
    return this;
  }

  transitionCSS(property: string, duration: number = 300, easing: string = 'ease'): this {
    if (!this.config) this.config = this.getDefaultConfig();
    if (!this.config.transition) this.config.transition = [];
    this.config.transition.push(`${property} ${duration}ms ${easing}`);
    return this;
  }

  transformCSS(transforms: string): this {
    if (!this.config) this.config = this.getDefaultConfig();
    this.config.transform = transforms;
    return this;
  }

  filter(filters: string): this {
    if (!this.config) this.config = this.getDefaultConfig();
    this.config.filter = filters;
    return this;
  }

  async executeAsync(code: string, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const blob = new Blob([`
        self.onmessage = function(e) {
          try {
            const result = eval(e.data);
            self.postMessage({ success: true, result: result });
          } catch (error) {
            self.postMessage({ success: false, error: error.message });
          }
        }
      `], { type: 'application/javascript' });
      
      const worker = new Worker(URL.createObjectURL(blob));
      
      const timeout = setTimeout(() => {
        worker.terminate();
        reject(new Error('Execution timeout'));
      }, options.timeout || 5000);
      
      worker.onmessage = (e) => {
        clearTimeout(timeout);
        worker.terminate();
        if (e.data.success) resolve(e.data.result);
        else reject(new Error(e.data.error));
      };
      
      worker.postMessage(code);
    });
  }

  compile(source: string, target: string = 'es5', options: any = {}): any {
    const compiled = this._transpileCode(source, options);
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-compile',
      content: {
        type: 'compiled',
        source: source,
        compiled: compiled,
        target: target,
        options: options
      }
    };
    
    return this.config;
  }

  parseAST(source: string, language: string = 'javascript'): any {
    const ast = this._parseToAST(source, language);
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-ast',
      content: {
        type: 'ast',
        source: source,
        language: language,
        ast: ast
      }
    };
    
    return this.config;
  }

  private _parseToAST(source: string, _language: string): any {
    const ast = {
      type: 'Program',
      body: [],
      functions: (source.match(/function\s+(\w+)/g) || []).map(f => f.replace('function ', '')),
      variables: (source.match(/(?:const|let|var)\s+(\w+)/g) || []).map(v => v.split(' ')[1]),
      imports: (source.match(/import\s+.*?from\s+['"]([^'"]+)['"]/g) || [])
    };
    return ast;
  }

  refactor(source: string, rules: any = {}): any {
    let refactored = source;
    
    if (rules.removeComments) {
      refactored = refactored.replace(/\/\*[\s\S]*?\*\//g, '');
      refactored = refactored.replace(/\/\/.*/g, '');
    }
    
    if (rules.modernize) {
      refactored = refactored.replace(/var\s+/g, 'const ');
      refactored = refactored.replace(/function\s*\(/g, '() => {');
    }
    
    if (rules.addTypes) {
      refactored = refactored.replace(/function\s+(\w+)\s*\(/g, 'function $1(');
    }
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-refactor',
      content: {
        type: 'refactored',
        original: source,
        refactored: refactored,
        rules: rules
      }
    };
    
    return this.config;
  }

  search(source: string, pattern: string, options: any = {}): any {
    const regex = new RegExp(pattern, options.flags || 'g');
    const matches: any[] = [];
    let match;
    
    while ((match = regex.exec(source)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        line: source.substring(0, match.index).split('\n').length
      });
    }
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-search',
      content: {
        type: 'search-results',
        source: source,
        pattern: pattern,
        matches: matches,
        count: matches.length
      }
    };
    
    return this.config;
  }

  replace(source: string, pattern: string, replacement: string, options: any = {}): any {
    const regex = new RegExp(pattern, options.flags || 'g');
    const replaced = source.replace(regex, replacement);
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'code-replace',
      content: {
        type: 'replaced',
        original: source,
        replaced: replaced,
        pattern: pattern,
        replacement: replacement
      }
    };
    
    return this.config;
  }

  parseSyntax(syntax: string, extended: boolean = true): any {
    if (extended) {
      syntax = syntax.replace(/\$\{([^}]+)\}/g, (_, expr) => {
        try {
          return eval(expr);
        } catch {
          return '';
        }
      });
      
      syntax = syntax.replace(/@for\s+(\w+)\s+in\s+(\[.*?\])/g, (_, varName, array) => {
        const items = eval(array);
        return items.map((item: any) => `${varName}:${item}`).join(' ');
      });
      
      syntax = syntax.replace(/@if\s+\(([^)]+)\)\s+\{([^}]+)\}/g, (_, condition, content) => {
        try {
          return eval(condition) ? content : '';
        } catch {
          return '';
        }
      });
    }
    
    return this.from(syntax);
  }

  expandMacros(syntax: string): string {
    let expanded = syntax;
    
    if (this._macros) {
      Object.keys(this._macros).forEach(name => {
        const regex = new RegExp(`@${name}\\(([^)]*)\\)`, 'g');
        expanded = expanded.replace(regex, (_, args) => {
          const argList = args.split(',').map((a: string) => a.trim());
          const result = this._macros![name](this, ...argList);
          return result !== undefined ? String(result) : '';
        });
      });
    }
    
    return expanded;
  }

  presetExpanded(name: string, customizations: any = {}): this {
    const presets: any = {
      glass: { blur: 60, transparency: 10, rounded: 16 },
      frosted: { blur: 80, transparency: 8, rounded: 20 },
      crystal: { blur: 40, transparency: 5, rounded: 12 },
      neon: { blur: 50, transparency: 15, rounded: 8 },
      minimal: { blur: 30, transparency: 12, rounded: 4 },
      bold: { blur: 70, transparency: 6, rounded: 24 },
      soft: { blur: 90, transparency: 18, rounded: 32 },
      sharp: { blur: 20, transparency: 4, rounded: 0 },
      liquid: { blur: 100, transparency: 20, rounded: 40 },
      metallic: { blur: 35, transparency: 7, rounded: 8 }
    };
    
    const preset = presets[name] || presets.glass;
    const merged = { ...preset, ...customizations };
    
    return this.styleObject(merged);
  }

  compose(...components: any[]): any {
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'composition',
      content: {
        type: 'composed',
        components: components
      }
    };
    
    return this.config;
  }

  layout(type: string, children: any[] = [], options: any = {}): any {
    const layouts: any = {
      flex: { display: 'flex', ...options },
      grid: { display: 'grid', ...options },
      stack: { display: 'flex', flexDirection: 'column', ...options },
      row: { display: 'flex', flexDirection: 'row', ...options },
      center: { display: 'flex', justifyContent: 'center', alignItems: 'center', ...options }
    };
    
    this.config = {
      ...this.getDefaultConfig(),
      componentType: 'layout',
      content: {
        type: 'layout',
        layoutType: type,
        style: layouts[type] || layouts.flex,
        children: children
      }
    };
    
    return this.config;
  }

  responsive(breakpoints: any): this {
    if (!this.config) this.config = this.getDefaultConfig();
    this.config.responsive = breakpoints;
    return this;
  }

  darkMode(darkStyles: any): this {
    if (!this.config) this.config = this.getDefaultConfig();
    this.config.darkMode = darkStyles;
    return this;
  }

  createCustomTheme(name: string, themeData: any): this {
    if (!this._themes) this._themes = {};
    this._themes[name] = themeData;
    return this;
  }

  applyCustomTheme(name: string): this {
    if (this._themes && this._themes[name]) {
      return this.styleObject(this._themes[name]);
    }
    return this;
  }

  setVar(name: string, value: any): this {
    if (!this._vars) this._vars = {};
    this._vars[name] = value;
    return this;
  }

  getVar(name: string, defaultValue: any = null): any {
    return this._vars && this._vars[name] !== undefined ? this._vars[name] : defaultValue;
  }

  computed(fn: Function): this {
    if (!this.config) this.config = this.getDefaultConfig();
    this.config.computed = fn;
    return this;
  }

  watch(property: string, callback: Function): this {
    if (!this._watchers) this._watchers = {};
    this._watchers[property] = callback;
    return this;
  }

  onCustomEvent(event: string, handler: Function): this {
    if (!this._events) this._events = {};
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(handler);
    return this;
  }

  emit(event: string, data?: any): this {
    if (this._events && this._events[event]) {
      this._events[event].forEach((handler: Function) => handler(data));
    }
    return this;
  }

  stateManager(initialState: any = {}): this {
    this._state = new Proxy(initialState, {
      set: (target: any, property: string | symbol, value: any) => {
        if (typeof property === 'string') {
          target[property] = value;
          if (this._watchers && this._watchers[property]) {
            this._watchers[property](value);
          }
          this.emit('stateChange', { property, value });
        }
        return true;
      }
    });
    return this;
  }

  getState(): any {
    return this._state;
  }

  setState(updates: any): this {
    Object.assign(this._state, updates);
    return this;
  }

  // ========== V2.0.7 NEW FEATURES ==========
  
  chain() {
    const chainBuilder = {
      _operations: [] as Array<(api: SmonthlAPI) => any>,
      _api: this,
      
      then(operation: (api: SmonthlAPI) => any) {
        this._operations.push(operation);
        return this;
      },
      
      if(condition: () => boolean, trueOp: (api: SmonthlAPI) => any, falseOp?: (api: SmonthlAPI) => any) {
        this._operations.push(() => {
          if (condition()) {
            trueOp(this._api);
          } else if (falseOp) {
            falseOp(this._api);
          }
        });
        return this;
      },
      
      repeat(times: number, operation: (api: SmonthlAPI, index: number) => any) {
        this._operations.push(() => {
          for (let i = 0; i < times; i++) {
            operation(this._api, i);
          }
        });
        return this;
      },
      
      delay(ms: number) {
        this._operations.push(() => {
          return new Promise(resolve => setTimeout(resolve, ms));
        });
        return this;
      },
      
      parallel(...operations: Array<(api: SmonthlAPI) => any>) {
        this._operations.push(async () => {
          await Promise.all(operations.map(op => op(this._api)));
        });
        return this;
      },
      
      sequence(...operations: Array<(api: SmonthlAPI) => any>) {
        this._operations.push(async () => {
          for (const op of operations) {
            await op(this._api);
          }
        });
        return this;
      },
      
      async execute() {
        for (const operation of this._operations) {
          const result = operation(this._api);
          if (result instanceof Promise) {
            await result;
          }
        }
        return this._api.config;
      },
      
      build() {
        this._operations.forEach(op => op(this._api));
        return this._api.config;
      }
    };
    
    return chainBuilder;
  }

  monitor() {
    const performanceMonitor = {
      _metrics: {
        renderTime: 0,
        memoryUsage: 0,
        fps: 0,
        operations: [] as Array<{ name: string; duration: number; timestamp: number; async?: boolean }>,
        startTime: performance.now()
      },
      _api: this,
      
      startTracking() {
        this._metrics.startTime = performance.now();
        
        let lastTime = performance.now();
        let frames = 0;
        const trackFPS = () => {
          frames++;
          const currentTime = performance.now();
          if (currentTime >= lastTime + 1000) {
            this._metrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;
          }
          requestAnimationFrame(trackFPS);
        };
        trackFPS();
        
        if ((performance as any).memory) {
          this._metrics.memoryUsage = (performance as any).memory.usedJSHeapSize / 1048576;
        }
        
        return this;
      },
      
      trackOperation(name: string, fn: () => any) {
        const start = performance.now();
        const result = fn();
        const duration = performance.now() - start;
        
        this._metrics.operations.push({
          name: name,
          duration: duration,
          timestamp: Date.now()
        });
        
        return result;
      },
      
      async trackAsync(name: string, fn: () => Promise<any>) {
        const start = performance.now();
        const result = await fn();
        const duration = performance.now() - start;
        
        this._metrics.operations.push({
          name: name,
          duration: duration,
          timestamp: Date.now(),
          async: true
        });
        
        return result;
      },
      
      getMetrics() {
        return {
          ...this._metrics,
          totalTime: performance.now() - this._metrics.startTime,
          averageOperationTime: this._metrics.operations.length > 0
            ? this._metrics.operations.reduce((sum, op) => sum + op.duration, 0) / this._metrics.operations.length
            : 0,
          slowestOperation: this._metrics.operations.length > 0
            ? this._metrics.operations.reduce((max, op) => op.duration > max.duration ? op : max, this._metrics.operations[0])
            : null
        };
      },
      
      optimize() {
        const metrics = this.getMetrics();
        const optimizations: Array<{ type: string; message: string; suggestion: string }> = [];
        
        if (metrics.averageOperationTime > 100) {
          optimizations.push({
            type: 'slow-operations',
            message: 'Average operation time is high. Consider optimizing heavy operations.',
            suggestion: 'Use Web Workers for heavy computations'
          });
        }
        
        if (metrics.fps < 30) {
          optimizations.push({
            type: 'low-fps',
            message: 'Low FPS detected. Consider reducing visual effects.',
            suggestion: 'Reduce blur intensity or disable animations'
          });
        }
        
        if (metrics.memoryUsage > 100) {
          optimizations.push({
            type: 'high-memory',
            message: 'High memory usage detected.',
            suggestion: 'Clear caches or reduce resource loading'
          });
        }
        
        return {
          metrics: metrics,
          optimizations: optimizations,
          score: this._calculatePerformanceScore(metrics)
        };
      },
      
      _calculatePerformanceScore(metrics: any): number {
        let score = 100;
        
        if (metrics.averageOperationTime > 50) score -= 20;
        if (metrics.averageOperationTime > 100) score -= 20;
        
        if (metrics.fps < 30) score -= 30;
        else if (metrics.fps < 50) score -= 15;
        
        if (metrics.memoryUsage > 100) score -= 20;
        else if (metrics.memoryUsage > 50) score -= 10;
        
        return Math.max(0, score);
      },
      
      report() {
        const optimization = this.optimize();
        console.group('🔍 SmonthlAPI Performance Report');
        console.log('📊 Metrics:', optimization.metrics);
        console.log('⚡ Performance Score:', optimization.score + '/100');
        if (optimization.optimizations.length > 0) {
          console.log('💡 Optimizations:');
          optimization.optimizations.forEach(opt => {
            console.log(`  - ${opt.type}: ${opt.message}`);
            console.log(`    Suggestion: ${opt.suggestion}`);
          });
        } else {
          console.log('✅ No optimizations needed!');
        }
        console.groupEnd();
        
        return optimization;
      },
      
      autoOptimize() {
        const optimization = this.optimize();
        
        optimization.optimizations.forEach(opt => {
          if (opt.type === 'low-fps' && this._api.config) {
            if (this._api.config.glass.blur > 40) {
              this._api.config.glass.blur = 40;
              console.log('🔧 Auto-optimized: Reduced blur to 40');
            }
          }
          
          if (opt.type === 'high-memory') {
            if (this._api.resourceCache) {
              this._api.resourceCache.clear();
              console.log('🔧 Auto-optimized: Cleared resource cache');
            }
          }
        });
        
        return optimization;
      }
    };
    
    return performanceMonitor;
  }

  async batchProcess<T, R>(
    items: T[],
    processor: (item: T) => Promise<R> | R,
    options: {
      batchSize?: number;
      delay?: number;
      onProgress?: (progress: { processed: number; total: number; percentage: number }) => void;
      onComplete?: (results: R[]) => void;
      parallel?: boolean;
    } = {}
  ): Promise<R[]> {
    const defaults = {
      batchSize: 10,
      delay: 0,
      onProgress: null,
      onComplete: null,
      parallel: false
    };
    const opts = { ...defaults, ...options };
    
    const results: R[] = [];
    let processed = 0;
    
    const processBatch = async (batch: T[]) => {
      if (opts.parallel) {
        const batchResults = await Promise.all(batch.map(item => processor(item)));
        results.push(...batchResults);
      } else {
        for (const item of batch) {
          const result = await processor(item);
          results.push(result);
        }
      }
      
      processed += batch.length;
      
      if (opts.onProgress) {
        opts.onProgress({
          processed: processed,
          total: items.length,
          percentage: Math.round((processed / items.length) * 100)
        });
      }
      
      if (opts.delay && opts.delay > 0) {
        await new Promise(resolve => setTimeout(resolve, opts.delay));
      }
    };
    
    for (let i = 0; i < items.length; i += opts.batchSize!) {
      const batch = items.slice(i, i + opts.batchSize!);
      await processBatch(batch);
    }
    
    if (opts.onComplete) {
      opts.onComplete(results);
    }
    
    return results;
  }

  memoize<T extends (...args: any[]) => any>(
    fn: T,
    keyGenerator?: (...args: Parameters<T>) => string
  ): T {
    const cache = new Map<string, ReturnType<T>>();
    
    return ((...args: Parameters<T>) => {
      const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = fn(...args);
      cache.set(key, result);
      
      return result;
    }) as T;
  }

  debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 300): T {
    let timeoutId: any;
    
    return ((...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    }) as T;
  }

  throttle<T extends (...args: any[]) => any>(fn: T, limit: number = 300): T {
    let inThrottle: boolean;
    
    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  }
}
