/**
 * Gallery Component - 图片轮播
 */
class Gallery {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = {
      itemWidth: 380,
      gap: 30,
      autoplay: false,
      autoplayDelay: 3000,
      ...options
    };
    
    this.track = null;
    this.items = [];
    this.currentIndex = 0;
    this.position = 0;
    this.autoplayTimer = null;
    
    this.init();
  }

  init() {
    this.track = this.container.querySelector('.c-gallery__track');
    this.items = Array.from(this.track.children);
    this.createNav();
    this.bindEvents();
    
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  createNav() {
    const nav = DOMUtils.create('div', { className: 'c-gallery__nav' });
    
    this.prevBtn = DOMUtils.create('button', {
      className: 'c-gallery__btn',
      innerHTML: '←'
    });
    
    this.nextBtn = DOMUtils.create('button', {
      className: 'c-gallery__btn',
      innerHTML: '→'
    });
    
    nav.appendChild(this.prevBtn);
    nav.appendChild(this.nextBtn);
    this.container.appendChild(nav);
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    
    // 触摸滑动支持
    let startX = 0;
    let isDragging = false;
    
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.stopAutoplay();
    }, { passive: true });
    
    this.track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const diff = startX - e.touches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
        isDragging = false;
      }
    }, { passive: true });
    
    this.track.addEventListener('touchend', () => {
      isDragging = false;
      if (this.options.autoplay) this.startAutoplay();
    });
    
    // 鼠标悬停停止自动播放
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => {
      if (this.options.autoplay) this.startAutoplay();
    });
  }

  next() {
    const maxIndex = this.items.length - 1;
    const maxPosition = -(maxIndex - 2) * this.options.itemWidth;
    
    this.position = Math.max(this.position - this.options.itemWidth, maxPosition);
    this.updatePosition();
  }

  prev() {
    this.position = Math.min(this.position + this.options.itemWidth, 0);
    this.updatePosition();
  }

  updatePosition() {
    this.track.style.transform = `translateX(${this.position}px)`;
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.next(), this.options.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  destroy() {
    this.stopAutoplay();
  }
}
