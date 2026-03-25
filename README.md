# Nancy Self Page

Nancy 的个人主页静态项目，用于展示商业智能顾问的个人形象、专业能力、教育经历、服务客户和联系方式。项目采用模块化 CSS 和原生 ES6 JavaScript 组织，适合作为轻量级个人品牌主页持续维护。

## 在线访问

- 当前网页地址：https://nancy-ya.github.io/my-page/

## 项目特点

- 单页静态站点，部署简单，适合 GitHub Pages / Netlify / Vercel
- 样式、脚本、图片分目录管理，便于维护
- 模块化 CSS 架构，包含设计变量、基础样式、组件、布局和动画
- 原生 JavaScript 组件化组织，包含核心系统、工具函数和页面交互组件
- 页面内容与 `introductions/nancy.mdx` 双向同步，保证资料一致

## 页面内容

- Hero：姓名、称号、职位、公司、徽章和头像
- About：个人简介、金句、研究背景和兴趣爱好
- Skills：雷达图与技能条
- Projects：服务客户词云
- Timeline：教育经历时间轴
- Gallery：生活剪影轮播
- Contact：邮箱和电话

## 目录结构

```text
.
├── AGENTS.md
├── README.md
├── index.html
├── assets/
│   ├── css/
│   │   ├── animations.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── design-tokens.css
│   │   ├── layouts.css
│   │   ├── main.css
│   │   └── utilities.css
│   ├── images/
│   │   └── avatar.jpg
│   └── js/
│       ├── app.js
│       ├── config.js
│       ├── components/
│       ├── core/
│       └── utils/
├── introductions/
│   └── nancy.mdx
└── skills/
    └── personal-portfolio-engineering/
        ├── SKILL.md
        └── assets/
```

## 资源说明

- 页面入口：`index.html`
- 图片资源：`assets/images/`
- 样式资源：`assets/css/`
- 脚本资源：`assets/js/`
- 自我介绍文档：`introductions/nancy.mdx`
- 项目级 skill：`skills/personal-portfolio-engineering/`
- 协作约束文档：`AGENTS.md`

## 开发与预览

在项目根目录启动本地静态服务器：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 内容维护

主要数据集中在 `assets/js/config.js`，适合维护以下内容：

- 个人信息
- 技能列表与分值
- 服务客户列表
- 教育经历
- 相册数据
- 联系方式

当网页中的人物信息、技能、教育经历、客户列表、联系方式等发生变化时，必须同步更新 `introductions/nancy.mdx`；反过来，如果 `introductions/nancy.mdx` 内容更新，也必须同步网页对应内容。

## 样式维护

样式文件按职责拆分：

- `assets/css/design-tokens.css`：颜色、间距、字体等设计变量
- `assets/css/base.css`：基础重置与全局样式
- `assets/css/utilities.css`：工具类
- `assets/css/components.css`：组件样式
- `assets/css/layouts.css`：布局样式
- `assets/css/animations.css`：动画定义
- `assets/css/main.css`：统一入口

## 脚本维护

脚本文件按职责拆分：

- `assets/js/core/`：事件总线、状态管理、组件基类
- `assets/js/utils/`：DOM、数学和环境检测工具
- `assets/js/components/`：页面交互组件
- `assets/js/config.js`：配置数据
- `assets/js/app.js`：应用入口和初始化逻辑

## 维护建议

- 新增图片统一放到 `assets/images/`
- 新增样式统一放到 `assets/css/`
- 新增脚本统一放到 `assets/js/`
- 如果图片资源增多，可继续细分为 `assets/images/gallery/`、`assets/images/icons/` 等子目录
- 修改资料前，优先确认网页展示内容和 `introductions/nancy.mdx` 是否一致
