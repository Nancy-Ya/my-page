/**
 * SmoothScroll Component - 平滑滚动
 * 使用 Lenis 风格的平滑滚动实现
 */
class SmoothScroll {
  constructor(options = {}) {
    this.options = {
      lerp: 0.1,
      wheelMultiplier: 1,
      ...options
    };
    
    this.targetY = 0;
    this.currentY = 0;
    this.isActive = true;
    this.rafId = null;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    window.addEventListener('wheel', (e) => {
      this.targetY += e.deltaY * this.options.wheelMultiplier;
      this.targetY = MathUtils.clamp(
        this.targetY,
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
    }, { passive: true });

    // 锚点链接平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          this.scrollTo(target);
        }
      });
    });
  }

  animate() {
    if (!this.isActive) {
      this.rafId = requestAnimationFrame(() => this.animate());
      return;
    }

    // 线性插值实现平滑效果
    this.currentY = MathUtils.lerp(this.currentY, this.targetY, this.options.lerp);
    
    // 如果接近目标，直接到达
    if (Math.abs(this.targetY - this.currentY) < 0.5) {
      this.currentY = this.targetY;
    }
    
    window.scrollTo(0, this.currentY);
    
    this.rafId = requestAnimationFrame(() => this.animate());
  }

  scrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      const rect = element.getBoundingClientRect();
      this.targetY = window.pageYOffset + rect.top - offset;
    }
  }

  scrollToTop() {
    this.targetY = 0;
  }

  destroy() {
    this.isActive = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
