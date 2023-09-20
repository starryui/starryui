import { column } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'

export function components(theme: StarryUITheme): StarryUIPage {
 const themedPage = applyTheme(theme, page)
 return themedPage({
  title: 'Components',
  content(container, config) {
   const themedColumn = applyTheme(theme, column)
   const mainArea = themedColumn({
    style: { padding: 'var(--dimension3) var(--dimension4)' },
    themeFacets: ['document', 'opaque'],
   })
   container.appendChild(mainArea)
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(mainArea, theme.variables)

   const header = document.createElement('h2')
   header.textContent = 'Components'
   mainArea.appendChild(header)

   config?.startUpTasks?.initial?.push?.(function () {
    if (themeVariablesStyle) {
     document.head.appendChild(themeVariablesStyle)
    }
   })

   config?.cleanUpTasks?.final?.push(function () {
    if (themeVariablesStyle) {
     document.head.removeChild(themeVariablesStyle)
    }
   })
  },
 })
}
