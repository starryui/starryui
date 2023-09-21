import { StarryUIPage } from '@starryui/page'
import {
 StarryUITheme,
 attachStyle,
 attachThemeVariables,
 useThemeDimensions,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { NORMAL_DELAY_MS } from './constants'
import { mainTray } from './main-tray'
import { about } from './pages/about'
import { components } from './pages/components'
import { home } from './pages/home'
import { tutorials } from './pages/tutorials'

async function route() {
 if (activePage) {
  activePage.element.setAttribute('data-starryui-reveal', 'hidden')
  await activePage.onUnload?.(false)
  await new Promise((r) => setTimeout(r, NORMAL_DELAY_MS))
  document.body.removeChild(activePage.element)
  await activePage.onUnload?.(true)
  activePage = undefined
 }
 switch (location.hash) {
  case '':
  case '#':
   activePage = getPage(location.hash, 'home', topTray.activeTheme)
   break
  case '#/about':
  case '#/components':
  case '#/tutorials':
   activePage = getPage(
    location.hash,
    location.hash.substring(2),
    topTray.activeTheme
   )
   break
 }
 if (activePage) {
  // routing occurred
  await activePage.onLoad?.(false)
  activePage.element.setAttribute('data-starryui-reveal', 'hidden') // todo can move to onLoad
  document.body.appendChild(activePage.element)
  await new Promise((r) => setTimeout(r, NORMAL_DELAY_MS))
  activePage.element.setAttribute('data-starryui-reveal', 'reveal') // todo can move to onLoad
  await activePage.onLoad?.(true)
 } else {
  console.warn(`Path ${location.hash} did not have an associated page`)
 }
}

attachThemeVariables('body', themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

const topTray = mainTray(route, themeMidnight)

let activePage: StarryUIPage | undefined
const pageCache = new Map<string, StarryUIPage>()

function loadPage(path: string, id: string, theme: StarryUITheme) {
 switch (id) {
  case 'about':
   return topTray.withBreadcrumb(path, about(theme))
  case 'components':
   return topTray.withBreadcrumb(path, components(theme))
  case 'tutorials':
   return topTray.withBreadcrumb(path, tutorials(theme))
  case 'home':
   return home(theme)
  default:
   throw new Error(`Page '${id}' not found`)
 }
}

function getPage(path: string, id: string, theme: StarryUITheme) {
 const cacheId = `<theme:${theme.name}><page:${id}>`
 if (pageCache.has(cacheId)) {
  return pageCache.get(cacheId)
 }
 const page = loadPage(path, id, theme)
 pageCache.set(cacheId, page)
 return page
}

route()
addEventListener('hashchange', route)
