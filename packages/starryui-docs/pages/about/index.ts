import { column } from '@starryui/layout'
import {
 StarryUITheme,
 applyTheme,
 attachThemeFacet,
 attachThemeVariables,
} from '@starryui/theme'
import { ApplicationPage, ApplicationTask } from '../types'
import { renderMarkdownFromPath } from '@starryui/starryui-docs/util/markdown'
import { example0 } from './examples/example0'

export function about(theme: StarryUITheme): ApplicationPage {
 const [themedColumn] = applyTheme(theme, [column])
 const mainArea = themedColumn({
  style: { padding: 'var(--dimension3) var(--dimension4)' },
  themeFacets: ['document', 'opaque'],
 })
 const themeVariablesStyle: HTMLStyleElement | undefined = attachThemeVariables(
  mainArea,
  theme.variables
 )

 function renderExample(className: string, build: () => HTMLElement) {
  const example = mainArea.getElementsByClassName(className)[0] as HTMLElement
  if (!example) {
   console.warn('.${className} element not found')
   return
  }
  attachThemeFacet(example, theme, 'row')
  const code = example.previousElementSibling as HTMLElement
  if (!code) {
   console.warn('.${className} previous code element not found')
   return
  }
  const result = document.createElement('div')
  result.style.width = '50%'
  attachThemeFacet(result, theme, 'column')

  const source = document.createElement('div')
  attachThemeFacet(source, theme, 'column')

  const sourceTitle = document.createElement('h6')
  const resultTitle = document.createElement('h6')
  sourceTitle.textContent = 'TypeScript Source'
  resultTitle.textContent = 'Result'
  result.appendChild(resultTitle)
  source.appendChild(sourceTitle)

  const resultContainer = document.createElement('div')
  resultContainer.style.padding = '10px'
  attachThemeFacet(resultContainer, theme, 'column')
  attachThemeFacet(resultContainer, theme, 'opaque-alt')
  result.appendChild(resultContainer)

  source.appendChild(code)
  example.appendChild(source)
  example.appendChild(result)

  resultContainer.appendChild(build())
 }

 async function load() {
  mainArea.innerHTML = await renderMarkdownFromPath('/pages/about/content.md')
  renderExample('example0', example0)
 }

 load().catch((e) => console.warn(e))

 async function onLoad(final: boolean) {
  if (final) {
   for (const task of startUpTasks.final) {
    await task()
   }
  } else {
   for (const task of startUpTasks.initial) {
    await task()
   }
  }
 }

 async function onUnload(final: boolean) {
  if (final) {
   for (const task of cleanUpTasks.final) {
    await task()
   }
  } else {
   for (const task of cleanUpTasks.initial) {
    await task()
   }
  }
 }

 const startUpTasks: { initial: ApplicationTask[]; final: ApplicationTask[] } =
  {
   initial: [
    function () {
     if (themeVariablesStyle) {
      document.head.appendChild(themeVariablesStyle)
     }
    },
   ],
   final: [],
  }
 const cleanUpTasks: { initial: ApplicationTask[]; final: ApplicationTask[] } =
  {
   initial: [],
   final: [
    function () {
     if (themeVariablesStyle) {
      document.head.removeChild(themeVariablesStyle)
     }
    },
   ],
  }

 return {
  cleanUpTasks,
  element: mainArea,
  onLoad,
  onUnload,
  startUpTasks,
  title: 'About',
 }
}
