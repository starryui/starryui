import { column } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import { renderMarkdownFromPath } from '@starryui/starryui-docs/util/markdown'
import {
 StarryUITheme,
 applyTheme,
 attachThemeFacet,
 attachThemeVariables,
} from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { NORMAL_DELAY_MS } from '@starryui/traits/constants.js'
import hljs from 'highlight.js/lib/core'
import hljsLanguageTypeScript from 'highlight.js/lib/languages/typescript'

hljs.registerLanguage('typescript', hljsLanguageTypeScript)

export function component(
 theme: StarryUITheme,
 componentDefinition: StarryUIComponentDefinition
): StarryUIPage {
 const themedPage = applyTheme(theme, page)
 const themedColumn = applyTheme(theme, column)
 return themedPage({
  title: componentDefinition.title,
  content(container, config) {
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(container, theme.variables)
   const mainArea = themedColumn({
    style: {
     padding: 'var(--dimension3) var(--dimension4)',
    },
    themeFacets: ['document', 'opaque'],
   })
   container.appendChild(mainArea)

   const h1 = document.createElement('h1')
   const h1text = document.createElement('span')
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
   mainArea.appendChild(sourceLink)
   h1.appendChild(h1text)
   h1text.textContent = componentDefinition.title
   mainArea.appendChild(h1)
   mainArea.appendChild(h6example)
   mainArea.appendChild(example)
   mainArea.appendChild(h6install)
   mainArea.appendChild(pre0)
   mainArea.appendChild(h6import)
   mainArea.appendChild(pre1)

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
    mainArea.appendChild(h6examplesource)
    mainArea.appendChild(preES)
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
    mainArea.appendChild(readmeContent)
    setTimeout(function () {
     hoverReadme.setAttribute('data-starryui-reveal', 'hidden')
     readmeContent.setAttribute('data-starryui-reveal', 'reveal')
     setTimeout(function () {
      mainArea.removeChild(hoverReadme)
     }, NORMAL_DELAY_MS)
    }, NORMAL_DELAY_MS)
   })
   attachThemeFacet(hoverReadme, theme, 'opaque-alt')
   hoverReadme.textContent = 'hover to load more content'
   mainArea.appendChild(hoverReadme)

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
