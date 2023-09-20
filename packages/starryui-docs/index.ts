import { button, withButtonImage } from '@starryui/button'
import {
 StarryUITheme,
 applyTheme,
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

let uniqueClassName = 0
attachThemeVariables('body', themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

const [themedButton, themedTray] = applyTheme(themeMidnight, [button, tray])

const topTray = themedTray({
 style: {
  zIndex: '1',
 },
})
const trayThemeClass = `scope-${uniqueClassName++}`
topTray.classList.add(trayThemeClass)
attachThemeVariables(`.${trayThemeClass}`, themeMidnight.variables)

document.body.appendChild(topTray)

const hello = themedButton.add(
 withButtonImage('/pages/home/starryui.png'),
 withTextContent('StarryUI')
)({ tagName: 'a' })
hello.setAttribute('href', '/#')
topTray.appendChild(hello)

let activePage: ApplicationPage | undefined

const pageCache = new Map<string, ApplicationPage>()

function loadPage(id: string, theme: StarryUITheme) {
 switch (id) {
  case 'about':
   return about(theme)
  case 'home':
   return home(theme)
  default:
   throw new Error(`Page '${id}' not found`)
 }
}

function getPage(id: string, theme: StarryUITheme) {
 const cacheId = `<theme:${theme.name}><page:${id}>`
 if (pageCache.has(cacheId)) {
  return pageCache.get(cacheId)
 }
 const page = loadPage(id, theme)
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
  activePage.element.setAttribute('starryui-reveal', 'hidden')
  await activePage.onUnload?.(false)
  await new Promise((r) => setTimeout(r, NORMAL_DELAY))
  document.body.removeChild(activePage.element)
  await activePage.onUnload?.(true)
  activePage = undefined
 }
 switch (location.hash) {
  case '':
  case '#':
   activePage = getPage('home', activeTheme)
   break
  case '#/about':
   activePage = getPage('about', activeTheme)
   break
 }
 if (activePage) {
  // routing occurred
  await activePage.onLoad?.(false)
  activePage.element.setAttribute('starryui-reveal', 'hidden') // todo can move to onLoad
  document.body.appendChild(activePage.element)
  await new Promise((r) => setTimeout(r, NORMAL_DELAY))
  activePage.element.setAttribute('starryui-reveal', 'reveal') // todo can move to onLoad
  await activePage.onLoad?.(true)
 } else {
  console.warn(`Path ${location.hash} did not have an associated page`)
 }
}

route()
addEventListener('hashchange', route)
