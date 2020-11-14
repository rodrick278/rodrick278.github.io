var psd = require('./psd')

module.exports = {
  title: 'Rodrick',
  description: 'Talk is cheap,show me the code.',
  // 绑定域名不可用二级目录
  // base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/fav.ico' }],
  ],
  theme: 'reco',
  themeConfig: {
    logo: '/portrait.png',
    mode: 'auto',
    nav: require('./navbar'),
    // 博客配置
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    },
    // 设置首页右侧信息栏头像
    authorAvatar: '/portrait.png',
    // 在所有页面中启用自动生成侧栏
    sidebar: require('./sidebar'),
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      }
    ],
    // valineConfig 评论
    valineConfig: {
      /**
       * module.exports={
          appId: 'Ku8egeKXzFIuu8TkdMv0b7OF-MdYXbMMI',
          appKey: 'rlAkigkuUcU7LaSRBA4QB6Yd',
          serverURLs:'https://ku8egekx.api.lncldglobal.com',
        }
       */
      appId: psd.appId,// your appId
      appKey: psd.appKey, // your appKey
      visitor: true,
      serverURLs: psd.serverURLs,
      placeholder: 'Hi~留下邮箱可以第一时间收到回复的邮件提醒哦(๑´ㅂ`๑)',
      emojiCDN: '//i0.hdslb.com/bfs/emote/',
      emojiMaps: {
        "tv_doge": "6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png",
        "tv_亲亲": "a8111ad55953ef5e3be3327ef94eb4a39d535d06.png",
        "tv_偷笑": "bb690d4107620f1c15cff29509db529a73aee261.png",
        "tv_再见": "180129b8ea851044ce71caf55cc8ce44bd4a4fc8.png",
        "tv_冷漠": "b9cbc755c2b3ee43be07ca13de84e5b699a3f101.png",
        "tv_发怒": "34ba3cd204d5b05fec70ce08fa9fa0dd612409ff.png",
        "tv_发财": "34db290afd2963723c6eb3c4560667db7253a21a.png",
        "tv_可爱": "9e55fd9b500ac4b96613539f1ce2f9499e314ed9.png",
        "tv_吐血": "09dd16a7aa59b77baa1155d47484409624470c77.png",
        "tv_呆": "fe1179ebaa191569b0d31cecafe7a2cd1c951c9d.png",
        "tv_呕吐": "9f996894a39e282ccf5e66856af49483f81870f3.png",
        "tv_困": "241ee304e44c0af029adceb294399391e4737ef2.png",
        "tv_坏笑": "1f0b87f731a671079842116e0991c91c2c88645a.png",
        "tv_大佬": "093c1e2c490161aca397afc45573c877cdead616.png",
        "tv_大哭": "23269aeb35f99daee28dda129676f6e9ea87934f.png",
        "tv_委屈": "d04dba7b5465779e9755d2ab6f0a897b9b33bb77.png",
        "tv_害羞": "a37683fb5642fa3ddfc7f4e5525fd13e42a2bdb1.png",
        "tv_尴尬": "7cfa62dafc59798a3d3fb262d421eeeff166cfa4.png",
        "tv_微笑": "70dc5c7b56f93eb61bddba11e28fb1d18fddcd4c.png",
        "tv_思考": "90cf159733e558137ed20aa04d09964436f618a1.png",
        "tv_惊吓": "0d15c7e2ee58e935adc6a7193ee042388adc22af.png",
      }
    }
  },
  plugins: [
    '@vuepress/active-header-links'
    , [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: ['shizuku', 'koharu', 'blackCat'],
        modelStyle: { left: '5px', bottom: '5px', opacity: '0.9' },
        btnStyle: { left: '70px', bottom: '40px' },
        messageStyle: { left: '68px', bottom: '190px' },
        clean: true
      }
    ]
    , ['@vuepress-reco/vuepress-plugin-bgm-player', {
      audios: [{
        name: 'History',
        artist: 'Rich Brian',
        // 绑定域名不可用二级目录
        // url: '/blog/bgm/History.mp3',
        // cover: '/blog/bgm/History.jpg'
        url: '/bgm/History.mp3',
        cover: '/bgm/History.jpg'
      }],
      position: { right: '10px', bottom: '10px', 'z-index': '999999' },
      autoShrink: true,
      floatPosition: 'right',
      floatStyle: { bottom: '85px', 'z-index': '999999' }
    }]
    , '@vuepress-reco/vuepress-plugin-pagation'
    , 'ribbon'
    , 'cursor-effects'
    , 'go-top'
  ]
}  