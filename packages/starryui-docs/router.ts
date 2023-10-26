import { StarryUIPage } from '@starryui/page'
import { StarryUITheme } from '@starryui/theme'
import { NORMAL_DELAY_MS } from '@starryui/traits/constants.js'
import { MainTrayControl } from './main-tray'
import { about } from './pages/about'
import { component } from './pages/component'
import { components } from './pages/components'
import { componentList } from './pages/components/component-list'
import { home } from './pages/home'
import { themes } from './pages/themes'
import { tutorials } from './pages/tutorials'
import { tutorial_09_23_esbuild_supabase } from './pages/tutorials/2023/tutorial-09-23-esbuild-supabase'

export function router(topTray: MainTrayControl) {
 let activePage: StarryUIPage | undefined

 const pageCache = new Map<string, StarryUIPage>()

 function loadPage(
  path: string,
  id: string,
  theme: StarryUITheme,
  param: string
 ) {
  switch (id) {
   case 'about':
    return topTray.withBreadcrumb(path, about(theme))
   case 'component':
    const matchingComponent = componentList.find((x) => x.title === param)
    if (!matchingComponent) {
     throw new Error(`Page ${path} component ${param} not found`)
    }
    return topTray.withBreadcrumb(path, component(theme, matchingComponent), [
     {
      title: 'Components',
      url: '/#/components',
     },
    ])
   case 'components':
    return topTray.withBreadcrumb(path, components(theme))
   case 'themes':
    return topTray.withBreadcrumb(path, themes(theme))
   case 'tutorials':
    return topTray.withBreadcrumb(path, tutorials(theme))
   case 'tutorials/2023/09/23/esbuild-supabase':
    return topTray.withBreadcrumb(
     path,
     tutorial_09_23_esbuild_supabase(theme),
     [
      {
       title: 'Tutorials',
       url: '/#/tutorials',
      },
     ]
    )
   case 'home':
    return home(theme)
   default:
    throw new Error(`Page '${id}' not found`)
  }
 }

 function getPage(
  path: string,
  id: string,
  theme: StarryUITheme,
  param: string
 ) {
  const cacheId = `<theme:${theme.name}><page:${id}><${param}>`
  if (pageCache.has(cacheId)) {
   return pageCache.get(cacheId)
  }
  const page = loadPage(path, id, theme, param)
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
  if (location.hash.match(/#\/components\/[^\/+]/)) {
   activePage = getPage(
    location.hash,
    'component',
    topTray.activeTheme,
    location.hash.substring(13)
   )
  } else {
   switch (location.hash) {
    case '':
    case '#':
     activePage = getPage(location.hash, 'home', topTray.activeTheme, '')
     break
    case '#/about':
    case '#/components':
    case '#/themes':
    case '#/tutorials':
    case '#/tutorials/2023/09/23/esbuild-supabase':
     activePage = getPage(
      location.hash,
      location.hash.substring(2),
      topTray.activeTheme,
      ''
     )
     break
   }
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

 return route
}
