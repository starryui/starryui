import { StarryUIComponentDefinition } from '@starryui/starryui-docs/pages/components/component-list'
import { button } from '.'
import { withTextContent } from '@starryui/traits'
import { applyTheme } from '@starryui/theme'

export const buttonDefinition: StarryUIComponentDefinition = {
 title: 'button',
 exampleSource: `const themedButton = applyTheme(theme, button)
return themedButton.add(withTextContent('A button'))()`,
 example(theme) {
  const themedButton = applyTheme(theme, button)
  return themedButton.add(withTextContent('A button'))()
 },
}
