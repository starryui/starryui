import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition, withPlaceholder } from '@starryui/traits'
import { field, input } from '.'

export const fieldDefinition: StarryUIComponentDefinition = {
 title: 'field',
 exampleSource: `const themedField = applyTheme(theme, field)
const themedInput = applyTheme(theme, input)
return themedField({
 label: 'Name',
 content(container) {
  container.appendChild(themedInput.add(withPlaceholder('Ada'))())
 },
})`,
 example(theme) {
  const themedField = applyTheme(theme, field)
  const themedInput = applyTheme(theme, input)
  return themedField({
   label: 'Name',
   content(container) {
    container.appendChild(themedInput.add(withPlaceholder('Ada'))())
   },
  })
 },
}
