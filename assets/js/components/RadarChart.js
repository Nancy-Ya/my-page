/**
 * RadarChart Component - SVG 雷达图
 */
class RadarChart {
  constructor(container, data, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.data = data;
    this.options = {
      size: 400,
      radius: 150,
      levels: 5,
      animationDuration: 1000,
      ...options
    };
    
    this.svg = null;
    this.ns = 'http://www.w3.org/2000/svg';
    this.init();
  }

  init() {
    if (!this.container || !this.data || this.data.length === 0) {
      console.warn('RadarChart: container or data is missing');
      return;
    }
    this.createSVG();
    this.draw();
  }

  createSVG() {
    // 清空容器
    this.container.innerHTML = '';
    this.container.style.width = '100%';
    this.container.style.maxWidth = '450px';
    this.container.style.margin = '0 auto';
    
    // 创建 SVG
    this.svg = document.createElementNS(this.ns, 'svg');
    this.svg.setAttribute('viewBox', `0 0 ${this.options.size} ${this.options.size}`);
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', 'auto');
    this.svg.style.display = 'block';
    
    this.container.appendChild(this.svg);
  }

  createSVGElement(tag, attrs = {}) {
    const el = document.createElementNS(this.ns, tag);
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    return el;
  }

  draw() {
    const { size, radius, levels } = this.options;
    const centerX = size / 2;
    const centerY = size / 2;
    const angleStep = (Math.PI * 2) / this.data.length;

    // 创建渐变定义
    const defs = this.createSVGElement('defs');
    const gradient = this.createSVGElement('linearGradient', {
      id: 'radarGradient',
      x1: '0%',
      y1: '0%',
      x2: '100%',
      y2: '100%'
    });
    
    const stop1 = this.createSVGElement('stop', {
      offset: '0%',
      'stop-color': 'var(--theme-accent-primary)',
      'stop-opacity': '0.7'
    });
    const stop2 = this.createSVGElement('stop', {
      offset: '100%',
      'stop-color': 'var(--theme-accent-secondary)',
      'stop-opacity': '0.3'
    });
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    this.svg.appendChild(defs);

    // 绘制网格
    const gridGroup = this.createSVGElement('g', { class: 'radar-grid' });
    
    for (let i = 1; i <= levels; i++) {
      const r = (radius / levels) * i;
      let path = '';
      
      for (let j = 0; j < this.data.length; j++) {
        const angle = j * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        path += `${j === 0 ? 'M' : 'L'} ${x.toFixed(2)},${y.toFixed(2)} `;
      }
      path += 'Z';
      
      const polygon = this.createSVGElement('path', {
        d: path,
        fill: 'none',
        stroke: 'var(--theme-border)',
        'stroke-width': '1'
      });
      gridGroup.appendChild(polygon);
    }

    // 绘制轴线和标签
    for (let i = 0; i < this.data.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const line = this.createSVGElement('line', {
        x1: centerX,
        y1: centerY,
        x2: x.toFixed(2),
        y2: y.toFixed(2),
        stroke: 'var(--theme-border)',
        'stroke-width': '1'
      });
      gridGroup.appendChild(line);
      
      // 标签
      const labelX = centerX + Math.cos(angle) * (radius + 35);
      const labelY = centerY + Math.sin(angle) * (radius + 35);
      const text = this.createSVGElement('text', {
        x: labelX.toFixed(2),
        y: labelY.toFixed(2),
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        fill: 'var(--theme-text-secondary)',
        'font-size': '11'
      });
      text.textContent = this.data[i].name;
      gridGroup.appendChild(text);
    }
    
    this.svg.appendChild(gridGroup);

    // 绘制数据区域
    const dataGroup = this.createSVGElement('g', { class: 'radar-data' });
    let dataPath = '';
    const points = [];
    
    this.data.forEach((item, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (item.value / 100) * radius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      points.push({ x, y });
      dataPath += `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)},${y.toFixed(2)} `;
    });
    dataPath += 'Z';
    
    const area = this.createSVGElement('path', {
      d: dataPath,
      fill: 'url(#radarGradient)',
      stroke: 'var(--theme-accent-primary)',
      'stroke-width': '2'
    });
    
    // 添加动画
    area.style.opacity = '0';
    dataGroup.appendChild(area);
    
    // 数据点
    points.forEach(point => {
      const circle = this.createSVGElement('circle', {
        cx: point.x.toFixed(2),
        cy: point.y.toFixed(2),
        r: '4',
        fill: 'var(--theme-accent-primary)',
        stroke: 'var(--theme-bg-primary)',
        'stroke-width': '2'
      });
      circle.style.opacity = '0';
      dataGroup.appendChild(circle);
      
      // 点的入场动画
      setTimeout(() => {
        circle.style.transition = 'opacity 0.4s ease';
        circle.style.opacity = '1';
      }, 300 + points.indexOf(point) * 100);
    });
    
    this.svg.appendChild(dataGroup);
    
    // 区域的入场动画
    setTimeout(() => {
      area.style.transition = `opacity ${this.options.animationDuration}ms ease-out`;
      area.style.opacity = '1';
    }, 100);
  }

  update(data) {
    this.data = data;
    this.svg.innerHTML = '';
    this.draw();
  }
}
