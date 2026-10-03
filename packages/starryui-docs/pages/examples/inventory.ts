import { button } from '@starryui/button'
import { column, row } from '@starryui/layout'
import { StarryUIPage } from '@starryui/page'
import { TableColumn, table } from '@starryui/table'
import { StarryUITheme, applyTheme } from '@starryui/theme'
import { withClick, withTextContent } from '@starryui/traits'
import { exampleLinks } from './catalog'
import { ExampleController, exampleDemo } from './shell'

const link = exampleLinks.inventory

const columns: TableColumn[] = [
 { name: 'item', type: 'TEXT' },
 { name: 'qty', type: 'INTEGER' },
 { name: 'location', type: 'TEXT' },
]

function seedInventory(): string[][] {
 return [
  ['Notebook', '12', 'Shelf A'],
  ['Pencil', '40', 'Bin 2'],
  ['Frame', '7', 'Shelf C'],
  ['Tray', '3', 'Closet'],
 ]
}

function parseInventory(value: unknown): string[][] | undefined {
 if (!Array.isArray(value)) {
  return
 }
 const rows: string[][] = []
 for (const row of value) {
  if (!Array.isArray(row) || row.length !== columns.length) {
   return
  }
  const cells: string[] = []
  for (const cell of row) {
   if (typeof cell !== 'string') {
    return
   }
   cells.push(cell)
  }
  rows.push(cells)
 }
 return rows
}

function inventoryTable(
 theme: StarryUITheme,
 controller: ExampleController<string[][]>,
 selected: { index: number }
) {
 const themedButton = applyTheme(theme, button)
 const themedColumn = applyTheme(theme, column)
 const themedRow = applyTheme(theme, row)
 const themedTable = applyTheme(theme, table)
 const rows = controller.current().map(function (row) {
  return row.slice()
 })
 if (selected.index >= rows.length) {
  selected.index = rows.length - 1
 }
 const layout = themedColumn({
  style: { gap: 'var(--dimension3)', maxWidth: '860px' },
 })
 const actions = themedRow({
  style: { flexGrow: '0', gap: 'var(--dimension2)' },
 })
 actions.append(
  themedButton.add(
   withTextContent('Add item'),
   withClick(function () {
    controller.commit(function (current) {
     selected.index = current.length
     return current.concat([['New item', '1', 'Shelf']])
    }, true)
   })
  )(),
  themedButton.add(
   withTextContent('Remove item'),
   withClick(function () {
    const index = selected.index
    if (index < 0) {
     return
    }
    controller.commit(function (current) {
     if (index >= current.length) {
      return current
     }
     const next = current.filter(function (_row, rowIndex) {
      return rowIndex !== index
     })
     selected.index = Math.min(index, next.length - 1)
     return next
    }, true)
   })
  )()
 )
 layout.appendChild(actions)
 layout.appendChild(
  themedTable({
   columns,
   editable: true,
   onCellEdit(rowIndex, columnName, value) {
    const columnIndex = columns.findIndex(function (column) {
     return column.name === columnName
    })
    if (columnIndex < 0) {
     return
    }
    controller.commit(function (current) {
     return current.map(function (row, index) {
      if (index !== rowIndex) {
       return row
      }
      const next = row.slice()
      next[columnIndex] = value
      return next
     })
    }, true)
   },
   onSelectRow(index) {
    selected.index = index
   },
   rows,
   selectedIndex: selected.index >= 0 ? selected.index : undefined,
  })
 )
 return layout
}

export function inventoryExample(theme: StarryUITheme): StarryUIPage {
 const selected = { index: 0 }
 return exampleDemo(theme, {
  parse: parseInventory,
  render(controller) {
   return inventoryTable(theme, controller, selected)
  },
  seed: seedInventory,
  storageKey: link.storageKey,
  subtitle: link.subtitle,
  title: link.title,
 })
}
