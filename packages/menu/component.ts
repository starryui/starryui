import { button } from '@starryui/button'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { applyTheme } from '@starryui/theme'
import { withTextContent } from '@starryui/traits'
import { attachMenu, menu } from '.'

export const menuDefinition: StarryUIComponentDefinition = {
 title: 'menu',
 exampleSource: `const themedMenu = applyTheme(theme, menu)
const themedButton = applyTheme(theme, button)
const exampleMenu = themedMenu.add(withTextContent('A menu'))()
const exampleMenuButton = themedButton.add(
 withTextContent('Click to reveal menu')
)()
attachMenu(exampleMenuButton, exampleMenu)
return exampleMenuButton`,
 example(theme) {
  const themedMenu = applyTheme(theme, menu)
  const themedButton = applyTheme(theme, button)
  const exampleMenu = themedMenu.add(withTextContent('A menu'))()
  const exampleMenuButton = themedButton.add(
   withTextContent('Click to reveal menu')
  )()
  attachMenu(exampleMenuButton, exampleMenu)
  return exampleMenuButton
 },
}
