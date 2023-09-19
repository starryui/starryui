import { button } from '@starryui/button'
import { tray } from '@starryui/tray'
import {
 applyTheme,
 attachStyle,
 attachThemeVariables,
 useThemeDimensions,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { withClick, withTextContent } from '@starryui/traits'

attachThemeVariables(themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

const [themedButton, themedTray] = applyTheme(themeMidnight, [button, tray])

const topTray = themedTray()

document.body.appendChild(topTray)

const hello = themedButton.add(
 withTextContent('Hello world'),
 withClick(function () {
  console.log('clicked')
 })
)()

topTray.appendChild(hello)
