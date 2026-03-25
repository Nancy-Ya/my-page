/**
 * ScrollAnimations Component - 滚动动画
 */
class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      selector: '.js-scroll-animate',
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };
    
    this.elements = [];
    this.observer = null;
    
    this.init();
  }

  init() {
    this.findElements();
    this.createObserver();
  }

  findElements() {
    this.elements = Array.from(document.querySelectorAll(this.options.selector));
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin
    });

    this.elements.forEach(el => this.observer.observe(el));
  }

  animate(element) {
    element.classList.add('is-visible');
    
    // 如果有子元素需要交错动画
    if (element.classList.contains('js-stagger-children')) {
      element.classList.add('is-visible');
    }
  }

  refresh() {
    this.observer.disconnect();
    this.findElements();
    this.elements.forEach(el => this.observer.observe(el));
  }

  destroy() {
    this.observer?.disconnect();
  }
}
