import { defineConfig, type DefaultTheme } from 'vitepress'
import { getSidebar } from './kits.mjs'

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    sidebar: {
      '/en/apple/': { base: '/en/apple/', items: getSidebar('docs/en/apple/') },
      '/en/bigdata/': {
        base: '/en/bigdata/',
        items: getSidebar('docs/en/bigdata/'),
      },
      '/en/development/': {
        base: '/en/development/',
        items: getSidebar('docs/en/development/'),
      },
    },
  },
})
