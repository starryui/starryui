import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { split } from '.'

export const splitDefinition: StarryUIComponentDefinition = {
 title: 'split',
 exampleSource: `const themedSplit = applyTheme(theme, split)
const instance = themedSplit({ direction: 'row', ratio: 0.35 })
instance.start.textContent = 'Schema'
instance.end.textContent = 'Rows'
return instance.element`,
 example(theme) {
  const themedSplit = applyTheme(theme, split)
  const instance = themedSplit({ direction: 'row', ratio: 0.35 })
  instance.start.textContent = 'Schema'
  instance.end.textContent = 'Rows'
  instance.element.style.height = '160px'
  return instance.element
 },
}
