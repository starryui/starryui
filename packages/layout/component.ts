import { StarryUIComponentDefinition } from '@starryui/starryui-docs/pages/components/component-list'
import { applyTheme } from '@starryui/theme'
import { withTextContent } from '@starryui/traits'
import { column, row } from '.'

export const columnDefinition: StarryUIComponentDefinition = {
 packageTitle: 'layout',
 title: 'column',
 example(theme) {
  const themedColumn = applyTheme(theme, column)
  return themedColumn.add(withTextContent('A column'))()
 },
}

export const rowDefinition: StarryUIComponentDefinition = {
 packageTitle: 'layout',
 title: 'row',
 example(theme) {
  const themedRow = applyTheme(theme, row)
  return themedRow.add(withTextContent('A row'))()
 },
}
