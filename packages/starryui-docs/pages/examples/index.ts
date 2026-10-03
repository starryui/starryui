import { column } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import {
 StarryUITheme,
 applyTheme,
 attachThemeFacet,
 attachThemeVariables,
} from '@starryui/theme'
import { exampleLinkList } from './catalog'

export { contactsExample } from './contacts'
export { inventoryExample } from './inventory'
export { notesExample } from './notes'
export { settingsExample } from './settings'
export { todoExample } from './todo'

export function examples(theme: StarryUITheme): StarryUIPage {
 const themedColumn = applyTheme(theme, column)
 const themedPage = applyTheme(theme, page)
 return themedPage({
  title: 'Examples',
  content(container, config) {
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(container, theme.variables)
   const topArea = themedColumn({
    style: {
     borderBottom: '1px solid var(--theme2)',
     flexGrow: '0',
     gap: 'var(--dimension2)',
     minHeight: '128px',
     padding: 'var(--dimension3) var(--dimension4)',
    },
    themeFacets: ['document', 'opaque'],
   })
   const header = document.createElement('h2')
   header.textContent = 'Examples'
   const intro = document.createElement('p')
   intro.textContent =
    'Launch a small app built from StarryUI components. Edits stay in this browser.'
   topArea.append(header, intro)
   container.appendChild(topArea)
   const mainArea = themedColumn({
    style: {
     gap: 'var(--dimension3)',
     padding: 'var(--dimension3) var(--dimension4)',
    },
    themeFacets: ['document', 'opaque'],
   })
   for (const item of exampleLinkList) {
    const link = themedColumn({
     href: item.href,
     style: { flexGrow: '0', gap: 'var(--dimension2)', maxWidth: '720px' },
     tagName: 'a',
    })
    attachThemeFacet(link, theme, 'link-frame')
    const h1 = document.createElement('h1')
    const h1text = document.createElement('span')
    h1text.textContent = item.title
    h1.appendChild(h1text)
    const h4 = document.createElement('h4')
    h4.textContent = item.subtitle
    link.append(h1, h4)
    mainArea.appendChild(link)
   }
   container.appendChild(mainArea)

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
