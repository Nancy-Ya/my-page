/**
 * Configuration - 全局配置
 */
const CONFIG = {
  // 个人信息
  profile: {
    name: 'Nancy',
    title: '商业智能顾问',
    subtitle: '人形AI-001',
    company: '明策云科技（北京）有限公司 · 咨询部华北区',
    location: '来自山东青岛，现居北京',
    badges: [
      { icon: '♍', text: '处女座' },
      { icon: '', text: 'INTJ' },
      { icon: '📍', text: '山东青岛' }
    ]
  },

  // 技能数据
  skills: [
    { name: '数据分析与挖掘', value: 95 },
    { name: '机器学习应用', value: 90 },
    { name: '数字化运营', value: 92 },
    { name: '数据产品咨询', value: 88 },
    { name: '可视化报表', value: 85 },
    { name: '客户成功', value: 90 }
  ],

  // 项目/客户列表
  projects: [
    '云智科技', '心流科技', '易通行', '美廉美', '全国天气网', 
    '欢乐世界', '视联通', '中石化', '安途', '光明乳业', 
    '三元食品', '青岛银行', '平安财险', '网际快讯', '语义科技', 
    '创想科技', '左脑科技', '智慧图谱', '中运通达', '博学教育', 
    '曲奇科技', '天籁之声', '太平洋保险', '星光聚会'
  ],

  // 教育经历
  education: [
    {
      year: '2019-2022',
      school: '对外经济贸易大学',
      major: '管理科学与工程 · 硕士',
      desc: '研究方向：机器学习与人工智能<br>深入探索数据挖掘算法与商业智能应用',
      tag: '机器学习与人工智能研究方向'
    },
    {
      year: '2015-2019',
      school: '吉林大学',
      major: '信息管理与信息系统 · 学士',
      desc: '管理学学士学位<br>系统学习信息系统与数据分析基础',
      tag: '管理学学士'
    }
  ],

  // 照片数据
  photos: [
    { src: 'avatar.jpg', title: '音乐时光' },
    { src: 'avatar.jpg', title: '舞蹈瞬间' },
    { src: 'avatar.jpg', title: '工作日常' },
    { src: 'avatar.jpg', title: '旅行记录' },
    { src: 'avatar.jpg', title: '生活美学' }
  ],

  // 联系方式
  contact: {
    email: 'nancy@*******.com',
    phone: '138xxxxxxxx'
  },

  // 默认主题
  theme: {
    default: 'dark'
  },

  // 动画配置
  animations: {
    scrollReveal: true,
    parallax: true,
    smoothScroll: false, // 与原生滚动冲突，可选开启
    customCursor: true
  },

  // 性能配置
  performance: {
    usePassiveEvents: true,
    reduceMotionQuery: '(prefers-reduced-motion: reduce)',
    retinaQuery: '(min-resolution: 2dppx)'
  }
};
