import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: "LittleControl's Blog",
  description: 'A VitePress Site',
  lastUpdated: true,
  cleanUrls: true,
  // srcDir: './docs',
  rewrites: {
    'docs/zh/:rest*': ':rest*',
    'docs/en/:rest*': 'en/:rest*',
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo_transparent.png' }],
  ],
  themeConfig: {
    logo: {
      src: '/logo_transparent.png',
      alt: 'LittleControl',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/LittleControl' }],
    search: {
      provider: 'local',
    },
    // siteTitle: false,
  },
})
