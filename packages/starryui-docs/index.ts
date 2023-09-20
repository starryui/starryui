import { button, withButtonImage } from '@starryui/button'
import { row } from '@starryui/layout'
import {
 StarryUITheme,
 applyThemeMultiple,
 attachStyle,
 attachThemeVariables,
 useThemeDimensions,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { themeSandstone } from '@starryui/theme-sandstone'
import { withTextContent } from '@starryui/traits'
import { tray } from '@starryui/tray'
import { NORMAL_DELAY } from './constants'
import { about } from './pages/about'
import { home } from './pages/home'
import { ApplicationPage } from './pages/types'

attachThemeVariables('body', themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

const [themedButton, themedRow, themedTray] = applyThemeMultiple(
 themeMidnight,
 [button, row, tray]
)

const topTray = themedTray({
 style: {
  zIndex: '1',
 },
})
attachThemeVariables(topTray, themeMidnight.variables)
document.body.appendChild(topTray)

topTray.appendChild(
 themedButton.add(
  withButtonImage('/pages/home/starryui.png'),
  withTextContent('StarryUI')
 )({ href: '/#', tagName: 'a' })
)

const breadcrumbs = themedRow()
topTray.appendChild(breadcrumbs)

function withBreadcrumb(path: string, page: ApplicationPage): ApplicationPage {
 const crumb = themedButton.add(withTextContent(page.title))({
  href: path,
  tagName: 'a',
 })
 page.startUpTasks.initial.push(function () {
  crumb.setAttribute('data-starryui-reveal', 'hidden')
  breadcrumbs.appendChild(crumb)
 })
 page.startUpTasks.final.push(function () {
  crumb.setAttribute('data-starryui-reveal', 'reveal')
 })
 page.cleanUpTasks.initial.push(function () {
  crumb.setAttribute('data-starryui-reveal', 'hidden')
 })
 page.cleanUpTasks.final.push(function () {
  breadcrumbs.removeChild(crumb)
 })
 return page
}

let activePage: ApplicationPage | undefined
const pageCache = new Map<string, ApplicationPage>()

function loadPage(path: string, id: string, theme: StarryUITheme) {
 switch (id) {
  case 'about':
   return withBreadcrumb(path, about(theme))
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

const themeNameStorageKey = 'theme'
const storedThemeName = localStorage.getItem(themeNameStorageKey)
let allThemes = [themeMidnight, themeSandstone]
let activeTheme =
 allThemes.find((x) => x.name === storedThemeName) ?? themeMidnight

const themeSwitcher = document.createElement('div')
Object.assign(themeSwitcher.style, {
 backgroundColor: '#202020',
 borderRadius: '4px',
 color: '#808080',
 cursor: 'pointer',
 fontSize: '14px',
 padding: '2px 4px',
 position: 'fixed',
 right: '3px',
 top: '3px',
 zIndex: '2',
})
themeSwitcher.textContent = activeTheme.name
themeSwitcher.addEventListener('click', () => {
 const currentIndex = allThemes.indexOf(activeTheme)
 const nextIndex = (currentIndex + 1) % allThemes.length
 activeTheme = allThemes[nextIndex]
 themeSwitcher.textContent = activeTheme.name
 localStorage.setItem(themeNameStorageKey, activeTheme.name)
 route()
})
document.body.appendChild(themeSwitcher)

async function route() {
 if (activePage) {
  activePage.element.setAttribute('data-starryui-reveal', 'hidden')
  await activePage.onUnload?.(false)
  await new Promise((r) => setTimeout(r, NORMAL_DELAY))
  document.body.removeChild(activePage.element)
  await activePage.onUnload?.(true)
  activePage = undefined
 }
 switch (location.hash) {
  case '':
  case '#':
   activePage = getPage(location.hash, 'home', activeTheme)
   break
  case '#/about':
   activePage = getPage(location.hash, 'about', activeTheme)
   break
 }
 if (activePage) {
  // routing occurred
  await activePage.onLoad?.(false)
  activePage.element.setAttribute('data-starryui-reveal', 'hidden') // todo can move to onLoad
  document.body.appendChild(activePage.element)
  await new Promise((r) => setTimeout(r, NORMAL_DELAY))
  activePage.element.setAttribute('data-starryui-reveal', 'reveal') // todo can move to onLoad
  await activePage.onLoad?.(true)
 } else {
  console.warn(`Path ${location.hash} did not have an associated page`)
 }
}

route()
addEventListener('hashchange', route)
