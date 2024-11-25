import { defineConfig, type DefaultTheme } from 'vitepress'
import { getSidebar } from './kits.mjs'

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    sidebar: {
      '/en/i_dev/': { base: '/en/i_dev/', items: getSidebar('docs/en/i_dev/') },
      '/en/data_dev/': {
        base: '/en/data_dev/',
        items: getSidebar('docs/en/data_dev/'),
      },
      '/en/ext_dev/': {
        base: '/en/ext_dev/',
        items: getSidebar('docs/en/ext_dev/'),
      },
    },
  },
})
