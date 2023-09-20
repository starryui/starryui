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
  if (!final) {
   for (const task of startUpTasks) {
    await task()
   }
  }
 }

 async function onUnload(final: boolean) {
  if (final) {
   for (const task of cleanUpTasks) {
    await task()
   }
  }
 }

 const startUpTasks: ApplicationTask[] = [
  function () {
   if (themeVariablesStyle) {
    document.head.appendChild(themeVariablesStyle)
   }
  },
 ]
 const cleanUpTasks: ApplicationTask[] = [
  function () {
   if (themeVariablesStyle) {
    document.head.removeChild(themeVariablesStyle)
   }
  },
 ]

 return {
  cleanUpTasks,
  element: mainArea,
  onLoad,
  onUnload,
  startUpTasks,
  title: 'About',
 }
}
