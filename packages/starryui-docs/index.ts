import { button, withButtonImage } from '@starryui/button'
import {
 applyTheme,
 attachStyle,
 attachThemeVariables,
 useThemeDimensions,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { withTextContent } from '@starryui/traits'
import { tray } from '@starryui/tray'
import { home } from './pages/home'

attachThemeVariables(themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

const [themedButton, themedTray] = applyTheme(themeMidnight, [button, tray])

const topTray = themedTray({
 style: {
  zIndex: '1',
 },
})

document.body.appendChild(topTray)

const hello = themedButton.add(
 withButtonImage('/pages/home/starryui.png'),
 withTextContent('StarryUI')
)({ tagName: 'a' })
hello.setAttribute('href', '/#')
topTray.appendChild(hello)

let lastPage: HTMLElement | undefined

async function route() {
 if (lastPage) {
  lastPage.setAttribute('starryui-reveal', 'hidden')
  await new Promise((r) => setTimeout(r, 500))
  document.body.removeChild(lastPage)
  lastPage = undefined
 }
 switch (location.hash) {
  case '':
  case '#':
   lastPage = home(document.body)
   break
 }
}

route()
addEventListener('hashchange', route)
