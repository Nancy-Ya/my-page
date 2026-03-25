/**
 * Cursor Component - 自定义光标
 */
class Cursor {
  constructor(options = {}) {
    this.options = {
      size: 10,
      followerSize: 36,
      easing: 0.18,
      ...options
    };
    
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.cursorX = this.mouseX;
    this.cursorY = this.mouseY;
    this.followerX = this.mouseX;
    this.followerY = this.mouseY;
    this.isActive = true;
    this.rafId = null;
    this.isHovering = false;
    
    // 检查是否应该启用
    if (Detect.isMobile || Detect.isTouch || window.innerWidth <= 768) {
      return;
    }
    
    this.init();
  }

  init() {
    this.createElements();
    this.bindEvents();
    this.animate();
  }

  createElements() {
    // 主光标
    this.cursor = document.createElement('div');
    this.cursor.className = 'c-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: ${this.options.size}px;
      height: ${this.options.size}px;
      background: var(--theme-accent-primary, #9B7ED9);
      border-radius: 50%;
      pointer-events: none !important;
      z-index: 99999;
      top: 0;
      left: 0;
      transform: translate3d(${this.cursorX}px, ${this.cursorY}px, 0);
    `;
    
    // 跟随光圈
    this.follower = document.createElement('div');
    this.follower.className = 'c-cursor__follower';
    this.follower.style.cssText = `
      position: fixed;
      width: ${this.options.followerSize}px;
      height: ${this.options.followerSize}px;
      border: 1px solid var(--theme-accent-primary, #9B7ED9);
      border-radius: 50%;
      pointer-events: none !important;
      z-index: 99998;
      top: 0;
      left: 0;
      transform: translate3d(${this.followerX}px, ${this.followerY}px, 0);
      opacity: 0.6;
    `;
    
    document.body.appendChild(this.follower);
    document.body.appendChild(this.cursor);
  }

  bindEvents() {
    // 鼠标移动
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }, { passive: true });

    // Hover 效果 - 事件委托
    document.addEventListener('mouseover', (e) => {
      if (this.isInteractiveElement(e.target)) {
        this.setHover(true);
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (this.isInteractiveElement(e.target)) {
        this.setHover(false);
      }
    });

    // 页面可见性变化
    document.addEventListener('visibilitychange', () => {
      this.isActive = document.visibilityState === 'visible';
    });
  }

  isInteractiveElement(element) {
    const selector = 'a, button, [data-cursor-hover], .c-gallery__item, .c-card, .c-timeline__item, .c-theme-toggle, .c-gallery__btn';
    return element.matches(selector) || element.closest(selector);
  }

  setHover(isHover) {
    this.isHovering = isHover;
    const size = this.options.size;
    const followerSize = this.options.followerSize;
    
    if (isHover) {
      this.cursor.style.width = `${size * 3}px`;
      this.cursor.style.height = `${size * 3}px`;
      this.cursor.style.opacity = '0.8';
      this.follower.style.width = `${followerSize * 1.8}px`;
      this.follower.style.height = `${followerSize * 1.8}px`;
      this.follower.style.opacity = '0.4';
      this.follower.style.borderWidth = '2px';
    } else {
      this.cursor.style.width = `${size}px`;
      this.cursor.style.height = `${size}px`;
      this.cursor.style.opacity = '1';
      this.follower.style.width = `${followerSize}px`;
      this.follower.style.height = `${followerSize}px`;
      this.follower.style.opacity = '0.6';
      this.follower.style.borderWidth = '1px';
    }
  }

  animate() {
    if (!this.isActive) {
      this.rafId = requestAnimationFrame(() => this.animate());
      return;
    }

    // 平滑跟随 - 高响应度
    this.cursorX += (this.mouseX - this.cursorX) * 0.5;
    this.cursorY += (this.mouseY - this.cursorY) * 0.5;
    this.followerX += (this.mouseX - this.followerX) * this.options.easing;
    this.followerY += (this.mouseY - this.followerY) * this.options.easing;

    const cursorOffset = this.isHovering ? this.options.size * 1.5 : this.options.size / 2;
    const followerOffset = this.isHovering ? this.options.followerSize * 0.9 : this.options.followerSize / 2;

    // 使用 translate3d 启用 GPU 加速
    this.cursor.style.transform = `translate3d(${this.cursorX - cursorOffset}px, ${this.cursorY - cursorOffset}px, 0)`;
    this.follower.style.transform = `translate3d(${this.followerX - followerOffset}px, ${this.followerY - followerOffset}px, 0)`;

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.cursor?.remove();
    this.follower?.remove();
  }
}
