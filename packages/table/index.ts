import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export interface TableColumn {
 name: string
 type?: string
 width?: number
}

export interface TableSort {
 column: string
 direction: 'asc' | 'desc'
}

export type TableFilterOp = 'eq' | 'neq' | 'contains' | 'gt' | 'lt' | 'empty'

export interface TableFilter {
 column: string
 op: TableFilterOp
 value?: string
}

export interface TableConfig extends StarryUITraitConfig {
 columns?: TableColumn[]
 rows?: unknown[][]
 sort?: TableSort[]
 filters?: TableFilter[]
 selectedIndex?: number
 page?: number
 pageSize?: number
 total?: number
 editable?: boolean
 onSort?(sort: TableSort[]): void
 onFilter?(filters: TableFilter[]): void
 onSelectRow?(index: number): void
 onPage?(page: number): void
 onCellEdit?(row: number, column: string, value: string): void
}

const filterOps: TableFilterOp[] = ['contains', 'eq', 'neq', 'gt', 'lt', 'empty']

export const table = starryComponent<HTMLElement, TableConfig>(function (
 traits: StarryUITrait[]
) {
 return function (config?: TableConfig) {
  const elem = document.createElement('div')
  applyTraits(elem, traits, Object.assign({}, { themeFacet: 'table' }, config, {
   content: undefined,
  }))
  const columns = config?.columns ?? []
  const rows = config?.rows ?? []
  const sort = config?.sort ?? []
  const grid = document.createElement('table')
  const head = document.createElement('thead')
  const headRow = document.createElement('tr')
  const filterRow = document.createElement('tr')
  const body = document.createElement('tbody')
  for (const column of columns) {
   const cell = document.createElement('th')
   if (column.width) {
    cell.style.width = `${column.width}px`
   }
   const active = sort.find((item) => item.column === column.name)
   const mark = active ? (active.direction === 'asc' ? ' ↑' : ' ↓') : ''
   cell.textContent = `${column.name}${column.type ? ` ${column.type}` : ''}${mark}`
   cell.addEventListener('click', () => {
    const next: TableSort[] = active
     ? [{ column: column.name, direction: active.direction === 'asc' ? 'desc' : 'asc' }]
     : [{ column: column.name, direction: 'asc' }]
    config?.onSort?.(next)
   })
   headRow.appendChild(cell)
   filterRow.appendChild(filterCell(column, config))
  }
  head.append(headRow, filterRow)
  rows.forEach((row, rowIndex) => {
   const tr = document.createElement('tr')
   if (config?.selectedIndex === rowIndex) {
    tr.setAttribute('data-selected', '1')
   }
   columns.forEach((column, columnIndex) => {
    const td = document.createElement('td')
    const text = cellText(row[columnIndex])
    td.textContent = text
    td.addEventListener('dblclick', () => {
     if (!config?.editable || !config.onCellEdit) {
      return
     }
     editCell(td, text, (value) => {
      config.onCellEdit?.(rowIndex, column.name, value)
     })
    })
    tr.appendChild(td)
   })
   tr.addEventListener('click', () => {
    for (const other of body.querySelectorAll('tr')) {
     other.removeAttribute('data-selected')
    }
    tr.setAttribute('data-selected', '1')
    config?.onSelectRow?.(rowIndex)
   })
   body.appendChild(tr)
  })
  if (rows.length === 0) {
   const tr = document.createElement('tr')
   const td = document.createElement('td')
   td.colSpan = Math.max(columns.length, 1)
   td.textContent = 'No rows'
   tr.appendChild(td)
   body.appendChild(tr)
  }
  grid.append(head, body)
  elem.appendChild(grid)
  if (config?.onPage) {
   elem.appendChild(pager(config))
  }
  config?.content?.(elem, config)
  return elem
 }
})

function cellText(value: unknown) {
 if (value == null) {
  return ''
 }
 return String(value)
}

function filterCell(column: TableColumn, config?: TableConfig) {
 const cell = document.createElement('th')
 const existing = config?.filters?.find((item) => item.column === column.name)
 const op = document.createElement('select')
 for (const name of filterOps) {
  const option = document.createElement('option')
  option.value = name
  option.textContent = name
  op.appendChild(option)
 }
 op.value = existing?.op ?? 'contains'
 const value = document.createElement('input')
 value.value = existing?.value ?? ''
 function emit() {
  const filters: TableFilter[] = []
  const row = cell.parentElement
  if (!row) {
   return
  }
  const heads = row.children
  const columns = config?.columns ?? []
  for (let index = 0; index < columns.length; index += 1) {
   const box = heads[index]
   const selected = box?.querySelector('select')
   const input = box?.querySelector('input')
   if (!selected || !input) {
    continue
   }
   const operation = selected.value as TableFilterOp
   if (operation === 'empty' || input.value !== '') {
    filters.push({
     column: columns[index].name,
     op: operation,
     value: input.value,
    })
   }
  }
  config?.onFilter?.(filters)
 }
 op.addEventListener('change', emit)
 value.addEventListener('change', emit)
 cell.append(op, value)
 return cell
}

function editCell(
 cell: HTMLTableCellElement,
 original: string,
 commit: (value: string) => void
) {
 const editor = document.createElement('input')
 editor.value = original
 let done = false
 function finish(save: boolean) {
  if (done) {
   return
  }
  done = true
  if (save) {
   commit(editor.value)
  }
  cell.textContent = save ? editor.value : original
 }
 editor.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
   event.preventDefault()
   finish(true)
  }
  if (event.key === 'Escape') {
   event.preventDefault()
   finish(false)
  }
 })
 editor.addEventListener('blur', () => finish(true))
 cell.replaceChildren(editor)
 editor.focus()
}

function pager(config: TableConfig) {
 const bar = document.createElement('div')
 bar.setAttribute('data-starryui-trait', 'tablePager')
 const page = config.page ?? 0
 const previous = document.createElement('button')
 previous.type = 'button'
 previous.textContent = 'Previous'
 previous.disabled = page <= 0
 previous.addEventListener('click', () => config.onPage?.(page - 1))
 const label = document.createElement('span')
 label.textContent = `Page ${page + 1}`
 const next = document.createElement('button')
 next.type = 'button'
 next.textContent = 'Next'
 const pageSize = config.pageSize ?? config.rows?.length ?? 0
 const atEnd =
  config.total != null
   ? (page + 1) * pageSize >= config.total
   : (config.rows?.length ?? 0) < pageSize
 next.disabled = atEnd
 next.addEventListener('click', () => config.onPage?.(page + 1))
 bar.append(previous, label, next)
 return bar
}
