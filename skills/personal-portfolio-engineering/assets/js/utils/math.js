/**
 * Math Utilities - 数学工具函数
 */
const MathUtils = {
  /**
   * 线性插值
   */
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  },

  /**
   * 限制数值范围
   */
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  /**
   * 映射范围
   */
  map(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  },

  /**
   * 随机数
   */
  random(min, max) {
    return Math.random() * (max - min) + min;
  },

  /**
   * 随机整数
   */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * 距离计算
   */
  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  },

  /**
   * 缓动函数 - easeOutQuart
   */
  easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  },

  /**
   * 缓动函数 - easeOutCubic
   */
  easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }
};
