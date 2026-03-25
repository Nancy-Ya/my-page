/**
 * StateManager - 状态管理器
 * 简单的中央状态管理，支持订阅状态变化
 */
class StateManager {
  constructor(initialState = {}) {
    this.state = new Proxy(initialState, {
      set: (target, key, value) => {
        const oldValue = target[key];
        target[key] = value;
        this._notify(key, value, oldValue);
        return true;
      }
    });
    this.listeners = new Map();
  }

  /**
   * 获取状态
   * @param {string} key - 状态键名
   * @returns {any}
   */
  get(key) {
    return key ? this.state[key] : { ...this.state };
  }

  /**
   * 设置状态
   * @param {string|Object} key - 键名或状态对象
   * @param {any} value - 值
   */
  set(key, value) {
    if (typeof key === 'object') {
      Object.entries(key).forEach(([k, v]) => {
        this.state[k] = v;
      });
    } else {
      this.state[key] = value;
    }
  }

  /**
   * 订阅状态变化
   * @param {string} key - 状态键名
   * @param {Function} callback - 回调函数
   * @returns {Function} 取消订阅函数
   */
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);

    return () => {
      this.listeners.get(key)?.delete(callback);
    };
  }

  /**
   * 通知订阅者
   * @private
   */
  _notify(key, newValue, oldValue) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach(callback => {
        callback(newValue, oldValue, key);
      });
    }
    
    // 通知通配符订阅者
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(callback => {
        callback({ key, newValue, oldValue });
      });
    }
  }

  /**
   * 重置状态
   */
  reset() {
    this.listeners.clear();
  }
}

const stateManager = new StateManager({
  theme: 'light',
  scrollY: 0,
  isLoading: false,
  activeSection: null
});
