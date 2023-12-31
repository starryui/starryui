import { StarryUIComponentDefinition } from '@starryui/traits'
import { applyTheme } from '@starryui/theme'
import { withTextContent } from '@starryui/traits'
import { column, row } from '.'

export const columnDefinition: StarryUIComponentDefinition = {
 packageTitle: 'layout',
 title: 'column',
 exampleSource: `const themedColumn = applyTheme(theme, column)
return themedColumn.add(withTextContent('A column'))()`,
 example(theme) {
  const themedColumn = applyTheme(theme, column)
  return themedColumn.add(withTextContent('A column'))()
 },
}

export const rowDefinition: StarryUIComponentDefinition = {
 packageTitle: 'layout',
 title: 'row',
 exampleSource: `const themedRow = applyTheme(theme, row)
return themedRow.add(withTextContent('A row'))()`,
 example(theme) {
  const themedRow = applyTheme(theme, row)
  return themedRow.add(withTextContent('A row'))()
 },
}
