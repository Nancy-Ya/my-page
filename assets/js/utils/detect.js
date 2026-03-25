/**
 * Detection Utilities - 环境检测
 */
const Detect = {
  /**
   * 是否支持触摸
   */
  get isTouch() {
    return window.matchMedia('(pointer: coarse)').matches;
  },

  /**
   * 是否减少动画
   */
  get prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * 是否为 Retina 屏幕
   */
  get isRetina() {
    return window.devicePixelRatio > 1;
  },

  /**
   * 是否为移动端
   */
  get isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * 视口宽度
   */
  get viewportWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
  },

  /**
   * 视口高度
   */
  get viewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
  }
};
