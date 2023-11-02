import { StarryUIComponentDefinition } from '@starryui/traits'
import { grid } from '.'
import { withCellDimensions } from '@starryui/traits'
import { applyTheme } from '@starryui/theme'

export const gridDefinition: StarryUIComponentDefinition = {
 title: 'grid',
 exampleSource: `const themedGrid = applyTheme(theme, grid)
return themedGrid.add(withCellDimensions(20, 20))()`,
 example(theme) {
  const themedGrid = applyTheme(theme, grid)

  return themedGrid.add(withCellDimensions(20, 20))()
 },
}
