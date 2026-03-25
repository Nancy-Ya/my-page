/**
 * EventBus - 事件总线
 * 实现发布-订阅模式，用于组件间通信
 */
class EventBus {
  constructor() {
    this.events = new Map();
    this.onceEvents = new Map();
  }

  /**
   * 订阅事件
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   * @returns {Function} 取消订阅的函数
   */
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(callback);

    return () => this.off(event, callback);
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  off(event, callback) {
    if (this.events.has(event)) {
      this.events.get(event).delete(callback);
      if (this.events.get(event).size === 0) {
        this.events.delete(event);
      }
    }
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`EventBus error in ${event}:`, error);
        }
      });
    }
  }

  clear() {
    this.events.clear();
    this.onceEvents.clear();
  }

  getEvents() {
    return Array.from(this.events.keys());
  }
}

const eventBus = new EventBus();
