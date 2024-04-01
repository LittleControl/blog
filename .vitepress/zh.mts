import { defineConfig, type DefaultTheme } from 'vitepress'
import { getSidebar } from './kits.mjs'

export const zh = defineConfig({
  lang: 'zh-Hans',
  themeConfig: {
    sidebar: {
      '/zh/apple/': { base: '/zh/apple/', items: getSidebar('zh/apple/') },
      '/zh/bigdata/': {
        base: '/zh/bigdata/',
        items: getSidebar('zh/bigdata/'),
      },
      '/zh/development/': {
        base: '/zh/development/',
        items: getSidebar('zh/development/'),
      },
    },
    footer: {
      message: '基于 VitePress 构建',
      copyright: `版权所有© 2018-${new Date().getFullYear()} 里晓空`,
    },
  },
})
