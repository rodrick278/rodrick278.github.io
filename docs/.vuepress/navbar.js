module.exports = [
  // 时间轴
  { text: 'Home', link: '/', icon: 'reco-home' },
  { text: 'About', link: 'https://rodrick.cn/resume/', icon: 'reco-account' },
  { text: 'Timeline', link: '/timeline/', icon: 'reco-date' },
  {
    text: 'D&T',
    icon: 'reco-document',
    items: [
      {
        text: '官方文档',
        items: [
          { text: 'Vue', link: 'https://cn.vuejs.org/' },
          { text: 'Vue3', link: 'https://composition-api.vuejs.org//' },
          { text: 'Webpack', link: 'https://www.webpackjs.com/' },
          { text: 'MDN', link: 'https://developer.mozilla.org/zh-CN/' },
          { text: 'Node中文网', link: 'http://nodejs.cn/api/' },
          { text: 'React', link: 'https://react.docschina.org/' },
          { text: '小程序', link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/' },
          { text: 'FineReport', link: 'https://help.finereport.com/' },
        ]
      },
      {
        text: '学习面试',
        items: [
          { text: '现代JavaScript教程', link: 'https://zh.javascript.info/' },
          { text: 'ES6', link: 'https://es6.ruanyifeng.com/' },
          { text: '阿西河', link: 'https://www.axihe.com/' },
          { text: 'LeetCode', link: 'https://leetcode-cn.com/' },
          { text: '牛客网', link: 'https://www.nowcoder.com/' },
          
        ]
      },
      {
        text: '工具',
        items: [
          { text: 'bejson', link: 'https://www.bejson.com/' },
        ]
      }



    ]
  },
  {
    text: 'Contact',
    icon: 'reco-message',
    items: [
      { text: 'Github', link: 'https://github.com/rodrick278', icon: 'reco-github' },
      { text: 'Gitee', link: 'https://gitee.com/rodrick278', icon: 'reco-mayun' }
    ]
  }
]