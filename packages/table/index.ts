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

export type TableFilterJoin = 'and' | 'or'

export interface TableFilter {
 column: string
 op: TableFilterOp
 value?: string
 join?: TableFilterJoin
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
 archived?: boolean[]
 onSort?(sort: TableSort[]): void
 onFilter?(filters: TableFilter[]): void
 onSelectRow?(index: number): void
 onPage?(page: number): void
 onCellEdit?(row: number, column: string, value: string): void
}

const filterOps: TableFilterOp[] = ['contains', 'eq', 'neq', 'gt', 'lt', 'empty']

const filterOpLabels: Record<TableFilterOp, string> = {
 contains: 'contains',
 eq: '=',
 neq: '≠',
 gt: '>',
 lt: '<',
 empty: 'empty',
}

interface DraftFilter {
 op: TableFilterOp
 value: string
 join: TableFilterJoin
}

let closeFilterModal: (() => void) | null = null

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
   const mark = active ? (active.direction === 'asc' ? '↑' : '↓') : ''
   const heading = document.createElement('div')
   heading.setAttribute('data-starryui-trait', 'tableHeading')
   const label = document.createElement('span')
   label.setAttribute('data-starryui-trait', 'tableHeadingLabel')
   const name = document.createElement('span')
   name.textContent = column.name
   label.appendChild(name)
   if (column.type) {
    const type = document.createElement('span')
    type.setAttribute('data-starryui-trait', 'tableHeadingType')
    type.textContent = column.type
    label.appendChild(type)
   }
   if (mark) {
    label.appendChild(document.createTextNode(mark))
   }
   label.addEventListener('click', () => {
    const next: TableSort[] = active
     ? [{ column: column.name, direction: active.direction === 'asc' ? 'desc' : 'asc' }]
     : [{ column: column.name, direction: 'asc' }]
    config?.onSort?.(next)
   })
   const filters = columnFilters(config, column.name)
   heading.append(label, filterButton(column, filters, traits, config))
   cell.appendChild(heading)
   headRow.appendChild(cell)
   filterRow.appendChild(filterSummaryCell(column, filters, config))
  }
  const showingFilters = columns.some((column) => columnFilters(config, column.name).length > 0)
  head.append(headRow)
  if (showingFilters) {
   head.appendChild(filterRow)
  }
  rows.forEach((row, rowIndex) => {
   const tr = document.createElement('tr')
   if (config?.selectedIndex === rowIndex) {
    tr.setAttribute('data-selected', '1')
   }
   if (config?.archived?.[rowIndex]) {
    tr.setAttribute('data-archived', '1')
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
   td.textContent = columns.length === 0 ? 'No columns' : 'No rows'
   tr.appendChild(td)
   body.appendChild(tr)
  }
  if (columns.length > 0) {
   grid.appendChild(head)
  }
  grid.appendChild(body)
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

function columnFilters(config: TableConfig | undefined, column: string) {
 return (config?.filters ?? []).filter((item) => item.column === column)
}

function filterSummary(filter: { op: TableFilterOp; value?: string }) {
 if (filter.op === 'empty') {
  return 'empty'
 }
 return `${filterOpLabels[filter.op]} ${filter.value ?? ''}`
}

function opMenuLabel(op: TableFilterOp) {
 if (op === 'eq') {
  return 'equals (=)'
 }
 if (op === 'neq') {
  return 'not equals (≠)'
 }
 if (op === 'gt') {
  return 'greater than (>)'
 }
 if (op === 'lt') {
  return 'less than (<)'
 }
 return op
}

function buildColumnFilters(column: string, drafts: DraftFilter[]) {
 const filters: TableFilter[] = []
 for (const draft of drafts) {
  if (draft.op !== 'empty' && draft.value === '') {
   continue
  }
  const filter: TableFilter = {
   column,
   op: draft.op,
   value: draft.value,
  }
  if (filters.length > 0) {
   filter.join = draft.join === 'or' ? 'or' : 'and'
  }
  filters.push(filter)
 }
 return filters
}

function emitColumnFilters(
 config: TableConfig | undefined,
 column: string,
 drafts: DraftFilter[]
) {
 const built = buildColumnFilters(column, drafts)
 const filters: TableFilter[] = []
 let inserted = false
 for (const item of config?.filters ?? []) {
  if (item.column !== column) {
   filters.push(item)
   continue
  }
  if (!inserted) {
   filters.push(...built)
   inserted = true
  }
 }
 if (!inserted) {
  filters.push(...built)
 }
 config?.onFilter?.(filters)
}

function filterButton(
 column: TableColumn,
 filters: TableFilter[],
 traits: StarryUITrait[],
 config?: TableConfig
) {
 const button = document.createElement('button')
 button.type = 'button'
 button.setAttribute('data-starryui-trait', 'tableFilterButton')
 if (filters.length > 0) {
  button.setAttribute('data-active', '1')
 }
 const countLabel = filters.length === 1 ? '1 filter' : `${filters.length} filters`
 button.setAttribute(
  'aria-label',
  filters.length ? `Filter ${column.name}, ${countLabel}` : `Filter ${column.name}`
 )
 button.appendChild(filterIcon())
 if (filters.length > 0) {
  const count = document.createElement('span')
  count.setAttribute('data-starryui-trait', 'tableFilterCount')
  count.textContent = String(filters.length)
  button.appendChild(count)
 }
 button.addEventListener('click', (event) => {
  event.stopPropagation()
  openFilterModal(column, filters, traits, config)
 })
 return button
}

function filterIcon() {
 const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
 svg.setAttribute('viewBox', '0 0 16 16')
 svg.setAttribute('width', '14')
 svg.setAttribute('height', '14')
 svg.setAttribute('aria-hidden', 'true')
 const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
 path.setAttribute('fill', 'currentColor')
 path.setAttribute('d', 'M1.5 2h13l-5 6.1V13l-3 1.5V8.1L1.5 2z')
 svg.appendChild(path)
 return svg
}

function filterSummaryCell(
 column: TableColumn,
 filters: TableFilter[],
 config?: TableConfig
) {
 const cell = document.createElement('th')
 cell.setAttribute('data-starryui-trait', 'tableFilters')
 if (filters.length === 0) {
  return cell
 }
 const list = document.createElement('div')
 list.setAttribute('data-starryui-trait', 'tableFilterList')
 filters.forEach((filter, index) => {
  const chip = document.createElement('div')
  chip.setAttribute('data-starryui-trait', 'tableFilterChip')
  const text = document.createElement('span')
  const prefix = index > 0 ? `${filter.join === 'or' ? 'OR' : 'AND'} ` : ''
  text.textContent = `${prefix}${filterSummary(filter)}`
  const remove = document.createElement('button')
  remove.type = 'button'
  remove.textContent = '×'
  remove.setAttribute('aria-label', `Remove ${filterSummary(filter)}`)
  remove.addEventListener('click', (event) => {
   event.stopPropagation()
   const next = filters
    .filter((_, itemIndex) => itemIndex !== index)
    .map((item) => ({
     op: item.op,
     value: item.value ?? '',
     join: item.join === 'or' ? 'or' as const : 'and' as const,
    }))
   emitColumnFilters(config, column.name, next)
  })
  chip.append(text, remove)
  list.appendChild(chip)
 })
 cell.appendChild(list)
 return cell
}

function openFilterModal(
 column: TableColumn,
 filters: TableFilter[],
 traits: StarryUITrait[],
 config?: TableConfig
) {
 closeFilterModal?.()
 const drafts: DraftFilter[] = filters.map((item) => ({
  op: item.op,
  value: item.value ?? '',
  join: item.join === 'or' ? 'or' : 'and',
 }))
 if (drafts.length === 0) {
  drafts.push({ op: 'contains', value: '', join: 'and' })
 }
 const backdrop = document.createElement('div')
 const panel = document.createElement('div')
 panel.tabIndex = -1
 const themeOnly = traits.filter((trait) => trait.type === 'theme')
 applyTraits(backdrop, themeOnly, { themeFacet: 'dialog-backdrop' })
 applyTraits(panel, traits, { themeFacet: 'dialog' })
 const heading = document.createElement('h2')
 heading.textContent = `Filter ${column.name}`
 const list = document.createElement('div')
 list.style.display = 'flex'
 list.style.flexDirection = 'column'
 list.style.gap = 'var(--dimension2)'
 const add = modalButton(traits, 'Add filter', () => {
  drafts.push({ op: 'contains', value: '', join: 'and' })
  renderDrafts()
 })
 add.style.alignSelf = 'flex-start'
 const footer = document.createElement('div')
 footer.style.display = 'flex'
 footer.style.justifyContent = 'flex-end'
 footer.style.gap = 'var(--dimension2)'
 const clear = modalButton(traits, 'Clear', () => {
  finish(() => emitColumnFilters(config, column.name, []))
 })
 const apply = modalButton(traits, 'Apply', () => {
  finish(() => emitColumnFilters(config, column.name, drafts))
 })
 footer.append(clear, apply)
 panel.append(heading, list, add, footer)
 backdrop.appendChild(panel)
 function renderDrafts() {
  list.replaceChildren()
  drafts.forEach((draft, index) => {
   list.appendChild(draftRow(draft, index, drafts, traits, renderDrafts))
  })
 }
 function finish(commit?: () => void) {
  if (closeFilterModal !== close) {
   return
  }
  closeFilterModal = null
  document.removeEventListener('keydown', onKey)
  backdrop.remove()
  commit?.()
 }
 function close() {
  finish()
 }
 function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
   event.preventDefault()
   close()
  }
 }
 closeFilterModal = close
 backdrop.addEventListener('click', (event) => {
  if (event.target === backdrop) {
   close()
  }
 })
 document.body.appendChild(backdrop)
 document.addEventListener('keydown', onKey)
 renderDrafts()
 panel.focus()
}

function draftRow(
 draft: DraftFilter,
 index: number,
 drafts: DraftFilter[],
 traits: StarryUITrait[],
 rerender: () => void
) {
 const row = document.createElement('div')
 row.style.display = 'flex'
 row.style.alignItems = 'center'
 row.style.gap = 'var(--dimension2)'
 if (index > 0) {
  const join = document.createElement('select')
  styleControl(join, traits)
  join.style.flex = '0 0 5.5rem'
  join.setAttribute('aria-label', 'Join')
  for (const name of ['and', 'or'] as const) {
   const option = document.createElement('option')
   option.value = name
   option.textContent = name.toUpperCase()
   join.appendChild(option)
  }
  join.value = draft.join
  join.addEventListener('change', () => {
   draft.join = join.value === 'or' ? 'or' : 'and'
  })
  row.appendChild(join)
 }
 const op = document.createElement('select')
 styleControl(op, traits)
 op.style.flex = '0 0 9.5rem'
 op.setAttribute('aria-label', 'Operator')
 for (const name of filterOps) {
  const option = document.createElement('option')
  option.value = name
  option.textContent = opMenuLabel(name)
  op.appendChild(option)
 }
 op.value = draft.op
 const value = document.createElement('input')
 value.type = 'text'
 styleControl(value, traits)
 value.style.flex = '1 1 auto'
 value.placeholder = 'Value'
 value.value = draft.value
 value.disabled = draft.op === 'empty'
 value.addEventListener('input', () => {
  draft.value = value.value
 })
 op.addEventListener('change', () => {
  draft.op = op.value as TableFilterOp
  value.disabled = draft.op === 'empty'
  if (draft.op === 'empty') {
   draft.value = ''
   value.value = ''
  }
 })
 const remove = modalButton(traits, '×', () => {
  drafts.splice(index, 1)
  if (drafts.length === 0) {
   drafts.push({ op: 'contains', value: '', join: 'and' })
  }
  rerender()
 })
 remove.setAttribute('aria-label', 'Remove filter')
 remove.style.flex = '0 0 auto'
 remove.style.display = 'flex'
 remove.style.alignItems = 'center'
 remove.style.justifyContent = 'center'
 remove.style.width = 'var(--dimension4)'
 remove.style.height = 'var(--dimension4)'
 remove.style.minWidth = 'var(--dimension4)'
 remove.style.lineHeight = '1'
 remove.style.padding = '0'
 row.append(op, value, remove)
 return row
}

function styleControl(elem: HTMLElement, traits: StarryUITrait[]) {
 applyTraits(elem, traits, { themeFacet: 'field' })
 elem.style.width = 'auto'
 elem.style.minWidth = '0'
}

function modalButton(
 traits: StarryUITrait[],
 label: string,
 onClick: () => void
) {
 const button = document.createElement('button')
 button.type = 'button'
 button.textContent = label
 applyTraits(button, traits, { themeFacet: 'button' })
 button.addEventListener('click', onClick)
 return button
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
