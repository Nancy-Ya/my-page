/**
 * Component - 组件基类
 * 所有组件的抽象基类，提供生命周期和事件管理
 */
class Component {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.options = { ...this.defaultOptions, ...options };
    this.isDestroyed = false;
    this.eventListeners = [];
    
    if (this.element) {
      this.init();
    }
  }

  get defaultOptions() {
    return {};
  }

  /**
   * 初始化组件
   * 子类应该重写这个方法
   */
  init() {
    this.bindEvents();
  }

  /**
   * 绑定事件
   * 子类应该重写这个方法
   */
  bindEvents() {}

  /**
   * 添加事件监听
   * @param {EventTarget} target - 目标元素
   * @param {string} event - 事件类型
   * @param {Function} handler - 处理函数
   * @param {Object} options - 选项
   */
  addEvent(target, event, handler, options = {}) {
    target.addEventListener(event, handler, options);
    this.eventListeners.push({ target, event, handler, options });
  }

  /**
   * 触发事件
   * @param {string} eventName - 事件名
   * @param {any} detail - 详情数据
   */
  emit(eventName, detail = null) {
    const event = new CustomEvent(eventName, { detail, bubbles: true });
    this.element?.dispatchEvent(event);
  }

  /**
   * 销毁组件
   */
  destroy() {
    this.eventListeners.forEach(({ target, event, handler, options }) => {
      target.removeEventListener(event, handler, options);
    });
    this.eventListeners = [];
    this.isDestroyed = true;
  }
}
