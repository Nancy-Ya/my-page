/**
 * WordCloud Component - 动态词云
 */
class WordCloud {
  constructor(container, words, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.words = words;
    this.options = {
      width: 1000,
      height: 500,
      minSize: 14,
      maxSize: 28,
      animationDuration: 15,
      ...options
    };
    
    this.placedWords = [];
    this.init();
  }

  init() {
    this.container.className = 'c-word-cloud';
    this.render();
  }

  render() {
    const colors = [
      'var(--theme-text-primary)',
      'var(--theme-text-secondary)',
      'var(--theme-accent-primary)',
      'var(--theme-accent-warm)'
    ];
    
    this.words.forEach((word, index) => {
      const size = MathUtils.randomInt(this.options.minSize, this.options.maxSize);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = MathUtils.random(0.7, 1);
      
      const element = DOMUtils.create('span', {
        className: 'c-word-cloud__item',
        style: `
          font-size: ${size}px;
          color: ${color};
          opacity: ${opacity};
        `
      });
      element.textContent = word;
      
      // 计算位置（避免重叠）
      const position = this.findPosition(element);
      element.style.left = position.x + 'px';
      element.style.top = position.y + 'px';
      
      // 添加浮动动画
      const duration = this.options.animationDuration + MathUtils.random(-5, 5);
      const delay = MathUtils.random(0, 5);
      element.style.animation = `floatWord ${duration}s ease-in-out ${delay}s infinite`;
      
      this.container.appendChild(element);
      this.placedWords.push({ element, x: position.x, y: position.y, width: 0, height: 0 });
    });
  }

  findPosition(element) {
    const containerRect = this.container.getBoundingClientRect();
    let x, y, overlap;
    let attempts = 0;
    const maxAttempts = 50;
    
    // 临时添加到 DOM 以获取尺寸
    element.style.visibility = 'hidden';
    this.container.appendChild(element);
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    element.remove();
    element.style.visibility = 'visible';
    
    do {
      x = MathUtils.random(0, containerRect.width - width - 20);
      y = MathUtils.random(0, containerRect.height - height - 20);
      
      overlap = this.placedWords.some(placed => {
        return (
          x < placed.x + placed.width + 20 &&
          x + width + 20 > placed.x &&
          y < placed.y + placed.height + 20 &&
          y + height + 20 > placed.y
        );
      });
      
      attempts++;
    } while (overlap && attempts < maxAttempts);
    
    // 更新最后一个放置的词的信息
    if (this.placedWords.length > 0) {
      this.placedWords[this.placedWords.length - 1].width = width;
      this.placedWords[this.placedWords.length - 1].height = height;
    }
    
    return { x, y };
  }
}
