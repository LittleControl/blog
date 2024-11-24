import { defineConfig } from 'vitepress'
import { shared } from './shared.mjs'
import { zh } from './zh.mjs'
import { en } from './en.mjs'

const sidebar = zh?.themeConfig?.sidebar || []
for (const item in sidebar) {
  console.log(item, sidebar[item])
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,
  locales: {
    root: { label: '简体中文', ...zh },
    en: { label: 'English', lang: 'en-US', ...en },
  },
})
