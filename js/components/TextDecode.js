/**
 * TextDecode Component - 文字逐字解码动画
 */
class TextDecode {
  constructor(elements, options = {}) {
    this.elements = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
    this.options = {
      chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
      duration: 1500,
      frameRate: 30,
      ...options
    };
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      // 保存原始文字
      const originalText = el.textContent;
      el.dataset.original = originalText;
      
      // 添加滚动监听
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.decode(el, originalText);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(el);
    });
  }

  decode(element, finalText) {
    const chars = this.options.chars;
    const duration = this.options.duration;
    const frameRate = this.options.frameRate;
    const totalFrames = (duration / 1000) * frameRate;
    let frame = 0;
    
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        const charProgress = i / finalText.length;
        
        // 如果当前字符应该已经解码完成
        if (progress > charProgress + 0.3) {
          result += finalText[i];
        } else if (progress > charProgress) {
          // 解码中的字符随机闪烁
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          // 未开始解码的字符显示为随机字符
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      element.textContent = result;
      
      if (frame < totalFrames) {
        setTimeout(() => requestAnimationFrame(animate), 1000 / frameRate);
      } else {
        element.textContent = finalText;
      }
    };
    
    animate();
  }
}
