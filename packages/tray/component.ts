import { StarryUIComponentDefinition } from '@starryui/starryui-docs/pages/components/component-list'
import { applyTheme } from '@starryui/theme'
import { withTextContent } from '@starryui/traits'
import { tray } from '.'

export const trayDefinition: StarryUIComponentDefinition = {
 title: 'tray',
 example(theme) {
  const themedTray = applyTheme(theme, tray)
  return themedTray.add(withTextContent('A tray'))()
 },
}
