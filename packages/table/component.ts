import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { table } from '.'

export const tableDefinition: StarryUIComponentDefinition = {
 title: 'table',
 exampleSource: `const themedTable = applyTheme(theme, table)
return themedTable({
 columns: [
  { name: 'id', type: 'INTEGER' },
  { name: 'name', type: 'TEXT' },
 ],
 rows: [[1, 'Ada'], [2, 'Grace']],
 sort: [{ column: 'id', direction: 'asc' }],
})`,
 example(theme) {
  const themedTable = applyTheme(theme, table)
  return themedTable({
   columns: [
    { name: 'id', type: 'INTEGER' },
    { name: 'name', type: 'TEXT' },
   ],
   rows: [
    [1, 'Ada'],
    [2, 'Grace'],
   ],
   sort: [{ column: 'id', direction: 'asc' }],
  })
 },
}
