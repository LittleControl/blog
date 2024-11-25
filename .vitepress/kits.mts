import { readdirSync } from 'fs'
import { DefaultTheme } from 'vitepress'

/**
 ** @Author: littlecontrol
 ** @Date: 2024-11-26 06:07
 ** @Description: dynamic generate sidebar
 ** @Params: path
 ** @Return: DefaultTheme.SidebarItem[]
 **/
export function getSidebar(pathParam: string): DefaultTheme.SidebarItem[] {
  const res: DefaultTheme.SidebarItem[] = []
  pathParam = pathParam.endsWith('/')
    ? pathParam.slice(0, pathParam.length - 1)
    : pathParam
  readdirSync(pathParam, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      res.push({
        text: item.name,
        items: getSidebar(`${item.parentPath}/${item.name}`),
      })
    } else {
      res.push({ text: item.name, link: `${item.name}` })
    }
  })
  return res
}
