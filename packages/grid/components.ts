import { StarryUIComponentDefinition } from '@starryui/traits'
import { grid } from '.'
import { withTextContent } from '@starryui/traits'
import { applyTheme } from '@starryui/theme'

export const buttonDefinition: StarryUIComponentDefinition = {
 title: 'grid',
 exampleSource: `const themedGrid = applyTheme(theme, grid)
return themedGrid.add(withTextContent('A grid'))()`,
 example(theme) {
  const themedGrid = applyTheme(theme, grid)
  return themedGrid.add(withTextContent('A grid'))()
 },
}
