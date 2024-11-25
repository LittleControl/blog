import { defineConfig, type DefaultTheme } from 'vitepress'
import { getSidebar } from './kits.mjs'

export const zh = defineConfig({
  lang: 'zh-Hans',
  themeConfig: {
    sidebar: {
      '/i_dev/': { base: 'i_dev/', items: getSidebar('docs/zh/i_dev/') },
      '/data_dev/': {
        base: '/data_dev/',
        items: getSidebar('docs/zh/data_dev/'),
      },
      '/ext_dev/': {
        base: '/ext_dev/',
        items: getSidebar('docs/zh/ext_dev/'),
      },
    },
    footer: {
      message: '基于 VitePress 构建',
      copyright: `版权所有© 2018-${new Date().getFullYear()} LittleControl`,
    },
  },
})
