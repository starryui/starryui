import { button, withButtonImage } from '@starryui/button'
import { row } from '@starryui/layout'
import { StarryUIPage } from '@starryui/page'
import {
 StarryUITheme,
 applyThemeMultiple,
 attachStyle,
 attachThemeFacet,
 attachThemeVariables,
 useThemeDimensions,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { themeSandstone } from '@starryui/theme-sandstone'
import { withTextContent } from '@starryui/traits'
import { tray, traySpacer } from '@starryui/tray'

attachThemeVariables('body', themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

export function mainTray(route: () => void, theme: StarryUITheme) {
 const [themedButton, themedRow, themedTray] = applyThemeMultiple(theme, [
  button,
  row,
  tray,
 ])

 const container = themedTray({
  style: {
   zIndex: '1',
  },
 })
 attachThemeVariables(container, themeMidnight.variables)
 document.body.appendChild(container)

 container.appendChild(
  themedButton.add(
   withButtonImage('/pages/home/starryui.png'),
   withTextContent('StarryUI')
  )({ href: '/#', tagName: 'a' })
 )
 const breadcrumbs = themedRow()
 container.appendChild(breadcrumbs)
 container.appendChild(traySpacer(themeMidnight))

 const themeNameStorageKey = 'theme'
 const storedThemeName = localStorage.getItem(themeNameStorageKey)
 let allThemes = [themeMidnight, themeSandstone]
 let activeTheme =
  allThemes.find((x) => x.name === storedThemeName) ?? themeMidnight

 const themeSwitcher = document.createElement('div')

 attachThemeFacet(themeSwitcher, themeMidnight, 'button')
 themeSwitcher.textContent = activeTheme.name
 themeSwitcher.addEventListener('click', () => {
  const currentIndex = allThemes.indexOf(activeTheme)
  const nextIndex = (currentIndex + 1) % allThemes.length
  activeTheme = allThemes[nextIndex]
  themeSwitcher.textContent = activeTheme.name
  localStorage.setItem(themeNameStorageKey, activeTheme.name)
  route()
 })

 container.appendChild(themeSwitcher)

 function withBreadcrumb(path: string, page: StarryUIPage): StarryUIPage {
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

 return {
  container,
  get activeTheme() {
   return activeTheme
  },
  withBreadcrumb,
 }
}
