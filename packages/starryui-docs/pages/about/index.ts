import { row } from '@starryui/layout'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'
import { ApplicationPage, ApplicationTask } from '../types'

export function about(theme: StarryUITheme): ApplicationPage {
 const [themedRow] = applyTheme(theme, [row])
 const mainArea = themedRow({
  style: { padding: '10px' },
  themeFacets: ['opaque'],
 })
 const themeVariablesStyle: HTMLStyleElement | undefined = attachThemeVariables(
  mainArea,
  theme.variables
 )

 mainArea.textContent = 'about StarryUI'

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
