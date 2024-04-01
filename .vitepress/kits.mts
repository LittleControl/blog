import { readdirSync } from 'fs'
import { DefaultTheme } from 'vitepress'

// dynamic generate sidebar
export function getSidebar(pathParam: string): DefaultTheme.SidebarItem[] {
  const res: DefaultTheme.SidebarItem[] = []
  pathParam = pathParam.endsWith('/')
    ? pathParam.slice(0, pathParam.length - 1)
    : pathParam
  readdirSync(pathParam, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      res.push({
        text: item.name,
        items: getSidebar(`${item.path}/${item.name}`),
      })
    } else {
      res.push({ text: item.name, link: `${item.path}/${item.name}` })
    }
  })
  return res
}
