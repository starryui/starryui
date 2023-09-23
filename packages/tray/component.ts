import { StarryUIComponentDefinition } from '@starryui/traits'
import { applyTheme } from '@starryui/theme'
import { withTextContent } from '@starryui/traits'
import { tray } from '.'

export const trayDefinition: StarryUIComponentDefinition = {
 title: 'tray',
 exampleSource: `const themedTray = applyTheme(theme, tray)
return themedTray.add(withTextContent('A tray'))()`,
 example(theme) {
  const themedTray = applyTheme(theme, tray)
  return themedTray.add(withTextContent('A tray'))()
 },
}
