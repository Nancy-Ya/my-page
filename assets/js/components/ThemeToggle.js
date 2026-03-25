/**
 * ThemeToggle Component - 主题切换
 */
class ThemeToggle {
  constructor(options = {}) {
    this.options = {
      storageKey: 'user-theme-preference',
      ...options
    };
    
    this.button = null;
    this.currentTheme = 'dark'; // 默认暗色
    
    this.init();
  }

  init() {
    // 检查用户是否手动设置过主题
    const userPreference = localStorage.getItem(this.options.storageKey);
    
    if (userPreference) {
      // 用户设置过，使用用户的选择
      this.currentTheme = userPreference;
      document.documentElement.setAttribute('data-theme', userPreference);
    } else {
      // 用户没设置过，强制使用暗色，不保存（这样下次还是默认暗色）
      this.currentTheme = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    this.createButton();
    this.bindEvents();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.className = 'c-theme-toggle';
    this.button.setAttribute('aria-label', '切换主题');
    this.button.innerHTML = this.currentTheme === 'dark' ? '🌙' : '☀️';
    this.button.style.cssText = `
      position: fixed;
      bottom: 40px;
      left: 40px;
      z-index: 300;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--theme-bg-secondary);
      border: 1px solid var(--theme-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(this.button);
  }

  bindEvents() {
    if (!this.button) return;
    
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });
  }

  toggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    
    this.currentTheme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    this.button.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
    
    // 保存用户选择
    localStorage.setItem(this.options.storageKey, newTheme);
    
    // 触发主题变更事件
    if (typeof eventBus !== 'undefined') {
      eventBus.emit('theme:change', newTheme);
    }
  }
}
