import { defineConfig, type DefaultTheme } from 'vitepress'
import { getSidebar } from './kits.mjs'

export const zh = defineConfig({
  lang: 'zh-Hans',
  themeConfig: {
    sidebar: {
      '/apple/': { base: 'apple/', items: getSidebar('docs/apple/') },
      '/bigdata/': {
        base: '/bigdata/',
        items: getSidebar('docs/bigdata/'),
      },
      '/development/': {
        base: '/development/',
        items: getSidebar('docs/development/'),
      },
    },
    footer: {
      message: '基于 VitePress 构建',
      copyright: `版权所有© 2018-${new Date().getFullYear()} LittleControl`,
    },
  },
})
