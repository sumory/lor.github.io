import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lor Framework",
  description: "docs for Lor.",
  ignoreDeadLinks: true, // 忽略死链检查
  base: "/lor_site/",
  themeConfig: {
    // logo: "/images/lor.png",
    nav: [
      { text: 'Home', link: '/' },
      { text: '迁移', link: '/others/migrate/' },
      { text: '发布记录', link: '/others/changelog/' },
      { 
        text: 'API', 
        items: [
          { text: 'v0.3', link: '/api/034/' },
          { text: 'v0.2', link: '/api/026/' },
        ]
      },
    ],

    sidebar: [
      {
        text: '基础',
        items: [
          { text: '介绍', link: '/basic/getting-started.0/' },
          { text: '安装', link: '/basic/installation.1/' },
          { text: 'Lord 工具', link: '/basic/lord_usage.3/' },
          { text: 'RESTful 示例', link: '/basic/restful.4/' },
        ]
      },
      {
        text: '路由',
        items: [
          { text: '基本用法', link: '/router/basic_route.101/' },
          { text: '组路由', link: '/router/group_router.102/' },
          { text: '多级处理函数', link: '/router/multi_business_middleware.103/' },
          { text: '路由优先级', link: '/router/route_priority.104/' },
          { text: '直接挂载到组路由', link: '/router/group_index_route.105/' },
          { text: '路由模式', link: '/router/strict_route.106/' },
        ]
      },
      {
        text: '高级',
        items: [
          { text: '常见问题', link: '/features/issues.201/' },
          { text: '使用 HTML 模板', link: '/features/view_usage.202/' },
          { text: '使用 cookie', link: '/features/cookie_usage.203/' },
          { text: '使用 session', link: '/features/session_usage.204/' },
          { text: '将 Lor 当做一个库使用', link: '/features/use_as_lib.205/' },
        ]
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2016-present Sumory Wu'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sumory/lor' }
    ],

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    search: {
      provider: 'local'
    },

    docFooter: {
      prev: false,
      next: false
    },

  }
})
