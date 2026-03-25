/**
 * App - 应用主入口
 * 初始化所有组件和系统
 */
class App {
  constructor() {
    this.components = new Map();
    this.isInitialized = false;
  }

  /**
   * 初始化应用
   */
  init() {
    if (this.isInitialized) return;

    // 检查减少动画偏好
    if (Detect.prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    }

    // 初始化核心系统
    this.initTheme();
    this.initParticles();
    this.initCursor();
    this.initNavigation();
    this.initParallax();
    this.initScrollAnimations();
    this.initComponents();
    
    this.isInitialized = true;
    console.log('🚀 App initialized');
  }

  /**
   * 初始化主题
   */
  initTheme() {
    const themeToggle = new ThemeToggle();
    this.components.set('theme', themeToggle);
    
    // 监听主题变化，重新绘制雷达图
    eventBus.on('theme:change', () => {
      this.initRadarChart();
    });
  }

  /**
   * 初始化背景粒子
   */
  initParticles() {
    if (Detect.isMobile || Detect.prefersReducedMotion) return;
    
    const particles = new FloatingParticles({
      count: 20,
      minSize: 2,
      maxSize: 6,
      speed: 0.2
    });
    this.components.set('particles', particles);
  }

  /**
   * 初始化自定义光标
   */
  initCursor() {
    if (Detect.isMobile || Detect.prefersReducedMotion) return;
    
    const cursor = new Cursor();
    this.components.set('cursor', cursor);
  }

  /**
   * 初始化导航
   */
  initNavigation() {
    const nav = document.querySelector('.c-nav');
    if (!nav) return;

    // 滚动时添加背景
    const handleScroll = DOMUtils.throttle(() => {
      const scrollY = window.pageYOffset;
      nav.classList.toggle('is-scrolled', scrollY > 50);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * 初始化视差效果
   */
  initParallax() {
    if (Detect.prefersReducedMotion) return;

    const parallax = new Parallax({
      elements: '[data-parallax]'
    });
    this.components.set('parallax', parallax);
  }

  /**
   * 初始化滚动动画
   */
  initScrollAnimations() {
    const scrollAnimations = new ScrollAnimations({
      selector: '.js-scroll-animate'
    });
    this.components.set('scrollAnimations', scrollAnimations);
  }

  /**
   * 初始化各区域组件
   */
  initComponents() {
    // 雷达图
    this.initRadarChart();
    
    // 词云
    this.initWordCloud();
    
    // 时间轴
    this.initTimeline();
    
    // 画廊
    this.initGallery();
    
    // 技能条动画
    this.initSkillBars();
  }

  /**
   * 初始化雷达图
   */
  initRadarChart() {
    const container = document.getElementById('radarChartContainer');
    if (!container) return;

    // 清除现有内容
    container.innerHTML = '';

    const radarChart = new RadarChart(container, CONFIG.skills, {
      size: 400,
      radius: 130,
      animationDuration: 1500
    });
    
    this.components.set('radarChart', radarChart);
  }

  /**
   * 初始化词云
   */
  initWordCloud() {
    const container = document.getElementById('wordCloud');
    if (!container) return;

    const wordCloud = new WordCloud(container, CONFIG.projects, {
      minSize: 14,
      maxSize: 28,
      animationDuration: 20
    });
    
    this.components.set('wordCloud', wordCloud);
  }

  /**
   * 初始化时间轴
   */
  initTimeline() {
    const timeline = document.querySelector('.c-timeline');
    if (!timeline) return;

    // 水平滚轮支持 - 只在时间轴可以水平滚动时拦截
    let isScrolling = false;
    
    timeline.addEventListener('wheel', (e) => {
      // 只有当用户明显意图水平滚动或时间轴有水平滚动空间时才处理
      const canScrollLeft = timeline.scrollLeft > 0;
      const canScrollRight = timeline.scrollLeft < (timeline.scrollWidth - timeline.clientWidth - 5);
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      
      // 如果是明显的水平滚动，让浏览器处理
      if (isHorizontalScroll) return;
      
      // 只有当有水平滚动空间且用户意图是水平滚动时才拦截
      if ((canScrollLeft && e.deltaY < 0) || (canScrollRight && e.deltaY > 0)) {
        // 检查是否到达边界
        const atStart = timeline.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = timeline.scrollLeft >= (timeline.scrollWidth - timeline.clientWidth - 5) && e.deltaY > 0;
        
        // 如果不在边界，才拦截滚动进行水平滚动
        if (!atStart && !atEnd) {
          e.preventDefault();
          timeline.scrollLeft += e.deltaY;
        }
        // 如果在边界，让页面正常垂直滚动
      }
    }, { passive: false });
  }

  /**
   * 初始化画廊
   */
  initGallery() {
    const container = document.querySelector('.c-gallery');
    if (!container) return;

    const gallery = new Gallery(container, {
      itemWidth: 380,
      gap: 30,
      autoplay: false
    });
    
    this.components.set('gallery', gallery);
  }

  /**
   * 初始化技能条动画
   */
  initSkillBars() {
    const bars = document.querySelectorAll('.c-skill-bar__fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const value = bar.dataset.value;
          setTimeout(() => {
            bar.style.width = value + '%';
          }, 200);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
  }

  /**
   * 销毁应用
   */
  destroy() {
    this.components.forEach(component => {
      if (typeof component.destroy === 'function') {
        component.destroy();
      }
    });
    this.components.clear();
    this.isInitialized = false;
  }
}

// 创建全局应用实例
const app = new App();

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
  app.destroy();
});
