import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: "LittleControl's Blog",
  description: 'A VitePress Site',
  lastUpdated: true,
  cleanUrls: true,
  srcDir: './docs',
})
