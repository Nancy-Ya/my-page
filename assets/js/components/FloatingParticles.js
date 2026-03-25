/**
 * FloatingParticles Component - 星空背景粒子
 */
class FloatingParticles {
  constructor(options = {}) {
    this.options = {
      count: 60,
      minSize: 1,
      maxSize: 4,
      speed: 0.15,
      connectDistance: 120,
      ...options
    };
    this.particles = [];
    this.canvas = null;
    this.ctx = null;
    this.rafId = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    if (Detect.prefersReducedMotion) return;
    this.createCanvas();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;
    document.body.prepend(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }, { passive: true });
  }

  createParticles() {
    for (let i = 0; i < this.options.count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: MathUtils.random(this.options.minSize, this.options.maxSize),
        speedX: MathUtils.random(-this.options.speed, this.options.speed),
        speedY: MathUtils.random(-this.options.speed, this.options.speed),
        opacity: MathUtils.random(0.3, 1),
        twinkleSpeed: MathUtils.random(0.02, 0.05),
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  getColor() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    // 浅色模式：更淡更灰的紫色，柔和不刺眼
    // 暗色模式：明亮的淡紫色
    return isDark ? '200, 180, 255' : '160, 140, 190';
  }

  getOpacityMultiplier() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    // 浅色模式降低整体透明度
    return isDark ? 1 : 0.6;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const color = this.getColor();

    // 更新和绘制粒子
    this.particles.forEach((p, i) => {
      // 更新位置
      p.x += p.speedX;
      p.y += p.speedY;

      // 边界循环
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // 闪烁效果
      p.twinklePhase += p.twinkleSpeed;
      const twinkle = 0.6 + 0.4 * Math.sin(p.twinklePhase);
      const opacityMultiplier = this.getOpacityMultiplier();
      const finalOpacity = p.opacity * twinkle * opacityMultiplier;

      // 绘制粒子光晕
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, `rgba(${color}, ${finalOpacity})`);
      gradient.addColorStop(0.5, `rgba(${color}, ${finalOpacity * 0.3})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // 绘制核心
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${color}, ${finalOpacity})`;
      this.ctx.fill();

      // 绘制连线
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.connectDistance) {
          const opacityMultiplier = this.getOpacityMultiplier();
          const opacity = (1 - distance / this.options.connectDistance) * 0.15 * twinkle * opacityMultiplier;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${color}, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }

      // 鼠标交互 - 附近粒子更亮
      const mouseDist = Math.sqrt(
        Math.pow(p.x - this.mouseX, 2) + 
        Math.pow(p.y - this.mouseY, 2)
      );
      if (mouseDist < 150) {
        const brightness = (1 - mouseDist / 150) * 0.5;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${color}, ${brightness})`;
        this.ctx.fill();
      }
    });

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.canvas?.remove();
  }
}
