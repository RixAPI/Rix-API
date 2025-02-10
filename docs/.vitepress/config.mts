import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Rix API",
  description: "RixAPI是提供各大Ai模型接口聚合管理系统，帮助你仅用一个接口即可对接不同平台的几十种大模型.",
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }],
    ['meta', { name: 'keywords', content: 'RixAPI,rix-api,rixapi,api,api分发' }],
    ['meta', { name: 'description', content: 'RixAPI是提供各大Ai模型接口聚合管理系统，帮助你仅用一个接口即可对接不同平台的几十种大模型.' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://img.fy6b.com/2024/08/23/53d7e54cc31a2.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '部署说明', link: '/deploy' },
      { text: '更新日志', link: '/update' },
      { text: '授权介绍', link: '/about' },
      { text: '授权查询', link: 'https://license.rixapi.com/verify' },
      { text: '友情链接', link: '/link' },
      { text: 'API 使用文档', link: 'https://apiai.apifox.cn' },
    ],
    footer: {
      copyright: 'Copyright © 2024-present RixAPI.',
    },

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '部署说明', link: '/deploy/' },
          { text: '更新日志', link: '/update/' },
          { text: '授权介绍', link: '/about/' },
          { text: '友情链接', link: '/link/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RixAPI/Rix-API' }
    ]
  },
  vite: {
    ssr: {
      noExternal: ['@escook/vitepress-theme', 'vitepress']
    }
  },
  markdown: {
    headers: {
      level: [1, 2, 3, 4]  // 显示 h1-h4 级别的标题
    }
  }
})
