import { StarryUIPage } from '@starryui/page'
import {
 StarryUITheme,
 attachStyle,
 attachThemeVariables,
 useThemeDimensions,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { NORMAL_DELAY_MS } from '@starryui/traits/constants'
import { mainTray } from './main-tray'
import { about } from './pages/about'
import { components } from './pages/components'
import { home } from './pages/home'
import { themes } from './pages/themes'
import { tutorials } from './pages/tutorials'
import { tutorial_09_23_esbuild_supabase } from './pages/tutorials/2023/tutorial-09-23-esbuild-supabase'

const topTray = mainTray(route, themeMidnight)

let activePage: StarryUIPage | undefined
let activePageRoute: string

const pageCache = new Map<string, StarryUIPage>()

function loadPage(path: string, id: string, theme: StarryUITheme) {
 switch (id) {
  case 'about':
   return topTray.withBreadcrumb(path, about(theme))
  case 'components':
   return topTray.withBreadcrumb(path, components(theme))
  case 'themes':
   return topTray.withBreadcrumb(path, themes(theme))
  case 'tutorials':
   return topTray.withBreadcrumb(path, tutorials(theme))
  case 'tutorials/2023/09/23/esbuild-supabase':
   return topTray.withBreadcrumb(path, tutorial_09_23_esbuild_supabase(theme), [
    {
     title: 'Tutorials',
     url: '/#/tutorials',
    },
   ])
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
   activePageRoute = location.hash
   break
  case '#/about':
  case '#/components':
  case '#/themes':
  case '#/tutorials':
  case '#/tutorials/2023/09/23/esbuild-supabase':
   activePage = getPage(
    location.hash,
    location.hash.substring(2),
    topTray.activeTheme
   )
   activePageRoute = location.hash
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

route()
addEventListener('hashchange', route)
