/**
 * Parallax Component - 视差滚动效果
 */
class Parallax {
  constructor(options = {}) {
    this.options = {
      elements: '[data-parallax]',
      speed: 0.5,
      ...options
    };
    
    this.elements = [];
    this.scrollY = 0;
    this.isActive = true;
    this.rafId = null;
    
    this.init();
  }

  init() {
    this.findElements();
    this.bindEvents();
    this.update();
  }

  findElements() {
    const elements = document.querySelectorAll(this.options.elements);
    this.elements = Array.from(elements).map(el => ({
      element: el,
      speed: parseFloat(el.dataset.parallax) || this.options.speed,
      rect: el.getBoundingClientRect()
    }));
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.pageYOffset;
    }, { passive: true });

    window.addEventListener('resize', DOMUtils.debounce(() => {
      this.findElements();
    }, 250));
  }

  update() {
    if (!this.isActive || Detect.prefersReducedMotion) {
      this.rafId = requestAnimationFrame(() => this.update());
      return;
    }

    this.elements.forEach(item => {
      const { element, speed } = item;
      const rect = element.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = Detect.viewportHeight / 2;
      const distance = (centerY - viewportCenter) * speed * 0.1;
      
      element.style.transform = `translateY(${distance}px)`;
    });

    this.rafId = requestAnimationFrame(() => this.update());
  }

  destroy() {
    this.isActive = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
