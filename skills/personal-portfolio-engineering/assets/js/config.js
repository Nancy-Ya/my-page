/**
 * Configuration - 全局配置
 */
const CONFIG = {
  // 个人信息
  profile: {
    name: '于清雅',
    title: '大数据应用顾问',
    subtitle: '人形AI-001',
    company: '神策网络科技（北京）有限公司 · 交付部华北组',
    location: '来自辽宁大连，现居北京',
    badges: [
      { icon: '♌', text: '狮子座' },
      { icon: '', text: 'INFJ' },
      { icon: '📍', text: '辽宁大连' }
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
    '爱诗科技', '心影随形', 'E高速', '物美', '中国天气', 
    '环球影城', '虹魔方', '壳牌', '安克', '伊利', 
    '蒙牛', '廊坊银行', '中华保险', '奇虎360', '深言科技', 
    '生数科技', '右脑科技', '智谱科技', '中交兴路', '智博教育', 
    '饼干科技', '丹拿之声', '新华保险', '星聚会'
  ],

  // 教育经历
  education: [
    {
      year: '2019-2022',
      school: '东北财经大学',
      major: '管理科学与工程 · 硕士',
      desc: '研究方向：机器学习与人工智能<br>深入探索数据挖掘算法与商业智能应用',
      tag: '机器学习与人工智能研究方向'
    },
    {
      year: '2015-2019',
      school: '辽宁大学',
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
    email: 'yuqingya@sensorsdata.com',
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
