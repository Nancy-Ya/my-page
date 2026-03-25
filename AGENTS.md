# 项目文档

## 项目概述

这是一个**工程化架构**的个人主页网站，展示专业商业智能顾问的形象。采用模块化 CSS 和 JavaScript 架构，具有丰富的交互效果和动态视觉元素。

- **项目名称**: Nancy个人主页 (self-page)
- **项目类型**: 静态网站（工程化架构）
- **主要语言**: 中文 (zh-CN)
- **技术栈**: HTML5 + CSS3（模块化）+ ES6+ JavaScript

## 文件结构

```
.
├── index.html                 # 主页面入口
├── assets/                    # 静态资源
│   ├── images/                # 图片资源
│   │   └── avatar.jpg         # 个人头像图片
│   ├── css/                   # 样式系统
│   │   ├── design-tokens.css  # 设计系统变量（颜色、间距、字体）
│   │   ├── base.css           # 基础重置和全局样式
│   │   ├── utilities.css      # 原子化工具类
│   │   ├── components.css     # BEM 组件样式
│   │   ├── layouts.css        # 页面布局样式
│   │   ├── animations.css     # 动画关键帧
│   │   └── main.css           # 样式入口文件
│   └── js/                    # JavaScript 架构
│       ├── core/              # 核心系统
│       │   ├── EventBus.js    # 发布订阅事件总线
│       │   ├── StateManager.js # 响应式状态管理
│       │   └── Component.js   # 组件基类
│       ├── utils/             # 工具函数
│       │   ├── dom.js         # DOM 工具
│       │   ├── math.js        # 数学工具
│       │   └── detect.js      # 环境检测
│       ├── components/        # UI 组件
│       │   ├── Cursor.js      # 自定义光标
│       │   ├── ThemeToggle.js # 主题切换
│       │   ├── Parallax.js    # 视差滚动
│       │   ├── RadarChart.js  # SVG 雷达图
│       │   ├── WordCloud.js   # 动态词云
│       │   ├── Gallery.js     # 图片轮播
│       │   ├── ScrollAnimations.js # 滚动动画
│       │   ├── SmoothScroll.js # 平滑滚动
│       │   └── FloatingParticles.js # 星空粒子背景
│       ├── config.js          # 全局配置（数据集中管理）
│       └── app.js             # 应用入口
├── introductions/             # 自我介绍文档
│   └── nancy.mdx              # 页面内容同步文档
├── skills/                    # 项目级 skills
│   └── personal-portfolio-engineering/
│       ├── SKILL.md           # skill 入口说明
│       └── assets/            # skill 附带模板资源
└── AGENTS.md                  # 本文档
```

## 内容同步规则

- 网页中的人物信息、教育经历、技能、客户列表、联系方式等内容发生变化时，必须同步更新 `introductions/nancy.mdx`。
- `introductions/nancy.mdx` 中的人物信息发生变化时，也必须同步更新网页中的对应内容，保证两处信息一致。
- 如果本次修改只发生在一侧，提交前必须检查另一侧是否已完成同步。
- 新增人物描述时，优先以网页最终展示内容为准，再同步到 `introductions/nancy.mdx` 做结构化沉淀。

## 技术栈详情

### CSS 架构（ITCSS + BEM）

| 层级 | 文件 | 命名规范 | 说明 |
|------|------|----------|------|
| Settings | `design-tokens.css` | CSS 变量 | 颜色、间距、字体等原子令牌 |
| Base | `base.css` | - | CSS Reset、全局样式 |
| Utilities | `utilities.css` | `u-*` | 原子化工具类 |
| Components | `components.css` | `c-*` | BEM 命名的组件样式 |
| Layouts | `layouts.css` | `l-*` | 页面级布局 |
| Animations | `animations.css` | `a-*` | 关键帧动画定义 |

### JavaScript 架构

- **核心系统**: EventBus（事件通信）、StateManager（状态管理）、Component（组件基类）
- **组件系统**: 基于类封装的独立 UI 组件，支持生命周期管理
- **配置驱动**: 所有数据集中管理在 `config.js`
- **工具函数**: 模块化的 DOM、Math、Detect 工具

### 字体栈
```css
font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
```

## 页面结构与功能

### 1. Hero 区域
- 装饰性 Logo（菱形星形 SVG）
- 姓名标题 + "人形AI-001" 称号（渐变文字）
- 职位公司信息
- 星座/MBTI/家乡徽章
- 头像（带装饰边框）

### 2. 关于我 (About)
- 专业简介（手动换行排版）
- 引用金句
- 教育背景概述
- 个人爱好

### 3. 专业能力 (Skills)
- **SVG 雷达图**: 6维能力可视化，带动画入场
- **技能进度条**: 6项专业技能，滚动触发填充动画

### 4. 服务客户 (Projects)
- **动态词云**: 24个客户名称，浮动动画，防重叠布局

### 5. 教育经历 (Timeline)
- **水平时间轴**: 2015-2022 教育历程
- 交互卡片：hover 上浮效果
- 水平滚轮支持

### 6. 生活剪影 (Gallery)
- **图片轮播**: 左右切换按钮
- Hover 遮罩显示标题
- 支持触摸滑动

### 7. 联系方式 (Contact)
- 邮箱链接
- 电话链接

## 高级交互效果

### 全局效果
- **自定义光标**: 双元素跟随系统（主光标 + 跟随光圈），支持悬停放大
- **星空粒子背景**: 60个浮动粒子，带闪烁、连线、鼠标交互
- **暗色模式**: 默认暗色，左下角按钮切换，localStorage 记忆
- **平滑滚动**: 锚点链接平滑滚动
- **滚动动画**: fade-in 入场动画

### 响应式适配
- 移动端禁用自定义光标
- 导航栏自动折叠
- 布局自适应（Grid/Flexbox）

## 主题配置

### 亮色主题
- 背景: `#FAFAFA`
- 主色: `#9B7ED9` (紫色)

### 暗色主题（默认）
- 背景: `#0F0F0F`
- 主色: `#B794F6` (亮紫色)
- 粒子: `200, 180, 255` (淡紫色，带光晕)

## 开发与预览

### 本地预览
```bash
# Python 服务器
python3 -m http.server 8080

# 访问 http://localhost:8080
```

### 修改内容

编辑 `assets/js/config.js` 修改个人数据：

| 配置项 | 说明 |
|--------|------|
| `profile` | 姓名、职位、公司、徽章 |
| `skills` | 技能名称和数值（0-100）|
| `projects` | 客户/项目列表（词云）|
| `education` | 教育经历（时间轴）|
| `photos` | 照片轮播数据 |
| `contact` | 邮箱、电话 |

### 样式定制

编辑 `assets/css/design-tokens.css` 修改设计系统：
- `--color-purple-*`: 紫色色系
- `--space-*`: 间距尺度
- `--text-*`: 字体大小

## 部署

### 部署文件
部署以下文件到静态托管服务：
- `index.html`
- `assets/` 目录
- `introductions/` 目录（如需同时发布介绍文档）

### 推荐托管
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**注意**: 使用了 CSS 变量、ES6+ 语法、IntersectionObserver 等现代特性。

## 性能优化

- `will-change` GPU 加速
- `passive: true` 滚动事件
- 减少动画偏好检测 (`prefers-reduced-motion`)
- 移动端禁用复杂效果

## 无障碍

- 图片包含 alt 文本
- 按钮包含 aria-label
- 键盘可访问
- 尊重 `prefers-reduced-motion` 设置
