import { frame } from '@starryui/frame'
import { column, row } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import { renderMarkdownFromPath } from '@starryui/starryui-docs/util/markdown'
import {
 StarryUITheme,
 applyTheme,
 attachThemeFacet,
 attachThemeVariables,
} from '@starryui/theme'
import { NORMAL_DELAY_MS } from '@starryui/traits/constants.js'
import hljs from 'highlight.js/lib/core'
import hljsLanguageTypeScript from 'highlight.js/lib/languages/typescript'
import { componentList } from './component-list'

hljs.registerLanguage('typescript', hljsLanguageTypeScript)

export function components(theme: StarryUITheme): StarryUIPage {
 const themedFrame = applyTheme(theme, frame)
 const themedPage = applyTheme(theme, page)
 const themedRow = applyTheme(theme, row)
 const themedColumn = applyTheme(theme, column)
 return themedPage({
  title: 'Components',
  content(container, config) {
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(container, theme.variables)
   const topArea = themedColumn({
    style: {
     borderBottom: '1px solid var(--theme2)',
     flexGrow: '0',
     minHeight: '128px',
     padding: 'var(--dimension3) var(--dimension4)',
    },
    themeFacets: ['document', 'opaque'],
   })
   const header = document.createElement('h2')
   header.textContent = 'Components'
   topArea.appendChild(header)
   const para0 = document.createElement('p')
   para0.textContent = 'Browse the gallery of StarryUI components.'
   topArea.appendChild(para0)
   container.appendChild(topArea)
   const mainArea = themedColumn({
    style: {
     overflowY: 'hidden',
    },
    themeFacets: ['document', 'opaque'],
   })
   container.appendChild(mainArea)

   const galleryWrap = document.createElement('div')
   Object.assign(galleryWrap.style, {
    bottom: '0',
    left: '0',
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'absolute',
    right: '0',
    top: '0',
   })

   const gallery = themedRow({
    style: {
     gap: 'var(--dimension3)',
     height: '100%',
     overflowX: 'hidden',
     padding: 'var(--dimension3) var(--dimension4)',
     width: 'fit-content',
    },
   })
   mainArea.appendChild(galleryWrap)
   galleryWrap.appendChild(gallery)

   for (const componentDefinition of componentList) {
    const column = themedColumn({
     style: {
      minWidth: '448px',
     },
    })
    const frame = themedFrame({
     style: {
      padding: 'var(--dimension3) var(--dimension4)',
     },
    })
    const h1 = document.createElement('h1')
    const h1text = document.createElement('a')
    h1text.setAttribute('href', `/#/components/${componentDefinition.title}`)
    const pre0 = document.createElement('pre')
    const packageName =
     componentDefinition.packageTitle ?? componentDefinition.title
    pre0.textContent = 'npm install @starryui/' + packageName
    const pre1 = document.createElement('pre')
    pre1.innerHTML = hljs.highlight(
     `import { ${componentDefinition.title} } from '@starryui/` +
      packageName +
      "'",
     {
      language: 'typescript',
     }
    ).value
    const h6install = document.createElement('h6')
    h6install.textContent = 'Install'
    const h6import = document.createElement('h6')
    h6import.textContent = 'Import'
    const h6example = document.createElement('h6')
    h6example.textContent = 'Example'
    const example = document.createElement('div')
    example.style.borderBottom = '1px solid var(--theme2)'
    example.style.minHeight = '128px'
    example.appendChild(componentDefinition.example(theme))
    const sourceLink = document.createElement('a')
    sourceLink.textContent = 'source'
    Object.assign(sourceLink.style, {
     fontSize: '11px',
     position: 'absolute',
     top: 'var(--dimension4)',
     right: 'var(--dimension4)',
    })
    sourceLink.setAttribute('target', '_blank')
    sourceLink.setAttribute(
     'href',
     `https://github.com/starryui/starryui/tree/main/packages/${packageName}/index.ts`
    )
    frame.appendChild(sourceLink)
    h1.appendChild(h1text)
    h1text.textContent = componentDefinition.title
    column.appendChild(frame)
    frame.appendChild(h1)
    frame.appendChild(h6example)
    frame.appendChild(example)
    frame.appendChild(h6install)
    frame.appendChild(pre0)
    frame.appendChild(h6import)
    frame.appendChild(pre1)

    if (componentDefinition.exampleSource) {
     const highlighted = hljs.highlight(componentDefinition.exampleSource, {
      language: 'typescript',
     })
     const code = document.createElement('code')
     const preES = document.createElement('pre')
     preES.appendChild(code)
     code.innerHTML = highlighted.value
     const h6examplesource = document.createElement('h6')
     h6examplesource.textContent = 'Example Source'
     frame.appendChild(h6examplesource)
     frame.appendChild(preES)
    }

    const hoverReadme = document.createElement('div')
    const readmeContent = document.createElement('div')
    Object.assign(hoverReadme.style, {
     marginTop: 'var(--dimension3)',
     padding: 'var(--dimension2)',
     textAlign: 'center',
    })
    let loading = false
    hoverReadme.addEventListener('mouseover', async function () {
     if (loading) {
      return
     }
     loading = true
     hoverReadme.textContent = 'loading...' // todo loading component
     readmeContent.setAttribute('data-starryui-reveal', 'hidden')
     readmeContent.innerHTML = await renderMarkdownFromPath(
      `/pages/components/${componentDefinition.title}.md`
     )
     frame.appendChild(readmeContent)
     setTimeout(function () {
      hoverReadme.setAttribute('data-starryui-reveal', 'hidden')
      readmeContent.setAttribute('data-starryui-reveal', 'reveal')
      setTimeout(function () {
       frame.removeChild(hoverReadme)
      }, NORMAL_DELAY_MS)
     }, NORMAL_DELAY_MS)
    })
    attachThemeFacet(hoverReadme, theme, 'opaque-alt')
    hoverReadme.textContent = 'hover to load more content'
    frame.appendChild(hoverReadme)

    gallery.appendChild(column)
   }

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
