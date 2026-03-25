/**
 * DOM Utilities - DOM 工具函数
 */
const DOMUtils = {
  /**
   * 选择单个元素
   */
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  /**
   * 选择多个元素
   */
  $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  },

  /**
   * 创建元素
   */
  create(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        el.className = value;
      } else if (key === 'dataset') {
        Object.assign(el.dataset, value);
      } else if (key === 'innerHTML') {
        el.innerHTML = value;
      } else if (key === 'textContent') {
        el.textContent = value;
      } else if (key.startsWith('on') && typeof value === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    });
    children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    });
    return el;
  },

  /**
   * 检查元素是否在视口内
   */
  isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - threshold) &&
      rect.bottom >= 0
    );
  },

  /**
   * 节流函数
   */
  throttle(fn, delay) {
    let lastTime = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastTime >= delay) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  },

  /**
   * 防抖函数
   */
  debounce(fn, delay) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * 平滑滚动到元素
   */
  scrollTo(element, offset = 0) {
    const target = typeof element === 'string' ? document.querySelector(element) : element;
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
};
