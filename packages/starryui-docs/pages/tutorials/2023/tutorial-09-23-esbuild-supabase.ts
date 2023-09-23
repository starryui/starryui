import { column, row } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import { renderMarkdownFromPath } from '@starryui/starryui-docs/util/markdown'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'

export function tutorial_09_23_esbuild_supabase(
 theme: StarryUITheme
): StarryUIPage {
 const title =
  'Building an app with ESBuild, Supabase, and StarryUI in TypeScript'
 const themedColumn = applyTheme(theme, column)
 const themedPage = applyTheme(theme, page)
 const themedRow = applyTheme(theme, row)
 return themedPage({
  title,
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
   header.textContent = title
   topArea.appendChild(header)
   container.appendChild(topArea)
   const mainArea = themedColumn({
    style: { padding: 'var(--dimension3) var(--dimension4)' },
    themeFacets: ['document', 'opaque'],
   })
   container.appendChild(mainArea)
   config?.startUpTasks?.initial?.push?.(async function () {
    if (themeVariablesStyle) {
     document.head.appendChild(themeVariablesStyle)
    }
    mainArea.innerHTML = 'loading...'
    mainArea.innerHTML = await renderMarkdownFromPath(
     '/pages/tutorials/2023/tutorial-09-23-esbuild-supabase.md'
    )
   })

   config?.cleanUpTasks?.final?.push(function () {
    if (themeVariablesStyle) {
     document.head.removeChild(themeVariablesStyle)
    }
   })
  },
 })
}
