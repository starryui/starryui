import { column, row } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'
import { tutorial_09_23_esbuild_supabase } from './2023/tutorial-09-23-esbuild-supabase'

export function tutorials(theme: StarryUITheme): StarryUIPage {
 const themedPage = applyTheme(theme, page)
 const themedRow = applyTheme(theme, row)
 return themedPage({
  title: 'Tutorials',
  content(container, config) {
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(container, theme.variables)
   const topArea = themedRow({
    style: {
     borderBottom: '1px solid var(--theme2)',
     flexGrow: '0',
     minHeight: '128px',
     padding: 'var(--dimension3) var(--dimension4)',
    },
    themeFacets: ['document', 'opaque'],
   })
   const header = document.createElement('h2')
   header.textContent = 'Tutorials'
   topArea.appendChild(header)
   container.appendChild(topArea)
   const themedColumn = applyTheme(theme, column)
   const mainArea = themedColumn({
    style: { padding: 'var(--dimension3) var(--dimension4)' },
    themeFacets: ['document', 'opaque'],
   })
   container.appendChild(mainArea)

   const div = document.createElement('div')
   const tutorialLink = document.createElement('a')
   tutorialLink.textContent = tutorial_09_23_esbuild_supabase(theme).title
   tutorialLink.setAttribute('href', '#/tutorials/2023/09/23/esbuild-supabase')
   div.appendChild(tutorialLink)
   mainArea.appendChild(div)

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
