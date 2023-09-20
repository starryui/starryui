import { column } from '@starryui/layout'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'
import { ApplicationPage, ApplicationTask } from '../types'
import { renderMarkdownFromPath } from '@starryui/starryui-docs/util/markdown'

export function about(theme: StarryUITheme): ApplicationPage {
 const [themedColumn] = applyTheme(theme, [column])
 const mainArea = themedColumn({
  style: { padding: '0 20px' },
  themeFacets: ['document', 'opaque'],
 })
 const themeVariablesStyle: HTMLStyleElement | undefined = attachThemeVariables(
  mainArea,
  theme.variables
 )

 async function load() {
  mainArea.innerHTML = await renderMarkdownFromPath('/pages/about/content.md')
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
