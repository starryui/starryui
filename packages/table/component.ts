import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { TableColumn, TableFilter, TableFilterOp, TableSort, table } from '.'

const storageKey = 'starryui.docs.table'

const columns: TableColumn[] = [
 { name: 'id', type: 'INTEGER' },
 { name: 'name', type: 'TEXT' },
 { name: 'score', type: 'INTEGER' },
]

const seedRows: unknown[][] = [
 [1, 'Ada', 42],
 [2, 'Grace', 91],
 [3, 'Katherine', 67],
 [4, 'Margaret', 38],
 [5, 'Dorothy', 74],
]

const columnNames = new Set(columns.map((column) => column.name))
const filterOps: TableFilterOp[] = [
 'contains',
 'eq',
 'neq',
 'gt',
 'lt',
 'empty',
]

interface DocsTableState {
 filters: TableFilter[]
 sort: TableSort[]
}

function defaultState(): DocsTableState {
 return {
  filters: [],
  sort: [{ column: 'id', direction: 'asc' }],
 }
}

function isRecord(value: unknown): value is Record<string, unknown> {
 return Boolean(value) && typeof value === 'object'
}

function isFilterOp(value: string): value is TableFilterOp {
 return (filterOps as string[]).includes(value)
}

function readFilter(value: unknown): TableFilter | undefined {
 if (!isRecord(value)) {
  return
 }
 if (typeof value.column !== 'string' || !columnNames.has(value.column)) {
  return
 }
 if (typeof value.op !== 'string' || !isFilterOp(value.op)) {
  return
 }
 if (value.value != null && typeof value.value !== 'string') {
  return
 }
 if (value.join != null && value.join !== 'and' && value.join !== 'or') {
  return
 }
 const filter: TableFilter = { column: value.column, op: value.op }
 if (typeof value.value === 'string') {
  filter.value = value.value
 }
 if (value.join === 'and' || value.join === 'or') {
  filter.join = value.join
 }
 return filter
}

function readSort(value: unknown): TableSort[] {
 if (!Array.isArray(value)) {
  return []
 }
 return value.flatMap((item) => {
  if (!isRecord(item)) {
   return []
  }
  if (typeof item.column !== 'string' || !columnNames.has(item.column)) {
   return []
  }
  if (item.direction !== 'asc' && item.direction !== 'desc') {
   return []
  }
  return [{ column: item.column, direction: item.direction }]
 })
}

function readState(): DocsTableState {
 const fallback = defaultState()
 try {
  const raw = localStorage.getItem(storageKey)
  if (!raw) {
   return fallback
  }
  const parsed = JSON.parse(raw) as unknown
  if (!isRecord(parsed)) {
   return fallback
  }
  const filters = Array.isArray(parsed.filters)
   ? parsed.filters.flatMap((item) => {
      const filter = readFilter(item)
      return filter ? [filter] : []
     })
   : fallback.filters
  const sort = readSort(parsed.sort)
  return {
   filters,
   sort: sort.length > 0 ? sort : fallback.sort,
  }
 } catch {
  return fallback
 }
}

function writeState(state: DocsTableState) {
 try {
  localStorage.setItem(storageKey, JSON.stringify(state))
 } catch {
  // Keep the in-memory table when storage is unavailable.
 }
}

function cellText(value: unknown) {
 if (value == null) {
  return ''
 }
 return String(value)
}

function matchesFilter(value: unknown, filter: TableFilter) {
 const text = cellText(value)
 const expected = filter.value ?? ''
 switch (filter.op) {
  case 'contains':
   return text.toLowerCase().includes(expected.toLowerCase())
  case 'eq':
   return text === expected
  case 'neq':
   return text !== expected
  case 'gt':
   return Number(text) > Number(expected)
  case 'lt':
   return Number(text) < Number(expected)
  case 'empty':
   return text === ''
  default:
   return true
 }
}

function matchesColumn(value: unknown, group: TableFilter[]) {
 let matched = matchesFilter(value, group[0])
 for (let index = 1; index < group.length; index += 1) {
  const next = matchesFilter(value, group[index])
  matched = group[index].join === 'or' ? matched || next : matched && next
 }
 return matched
}

function compareCells(left: unknown, right: unknown) {
 const a = cellText(left)
 const b = cellText(right)
 const aNumber = Number(a)
 const bNumber = Number(b)
 if (
  a !== '' &&
  b !== '' &&
  Number.isFinite(aNumber) &&
  Number.isFinite(bNumber)
 ) {
  return aNumber - bNumber
 }
 return a.localeCompare(b)
}

function visibleRows(state: DocsTableState) {
 const groups = new Map<string, TableFilter[]>()
 for (const filter of state.filters) {
  const group = groups.get(filter.column)
  if (group) {
   group.push(filter)
  } else {
   groups.set(filter.column, [filter])
  }
 }
 const filtered = seedRows.filter((row) => {
  for (const [column, group] of groups) {
   const index = columns.findIndex((item) => item.name === column)
   if (index < 0) {
    continue
   }
   if (!matchesColumn(row[index], group)) {
    return false
   }
  }
  return true
 })
 const active = state.sort[0]
 if (!active) {
  return filtered
 }
 const index = columns.findIndex((item) => item.name === active.column)
 if (index < 0) {
  return filtered
 }
 const direction = active.direction === 'desc' ? -1 : 1
 return filtered
  .slice()
  .sort((left, right) => compareCells(left[index], right[index]) * direction)
}

export const tableDefinition: StarryUIComponentDefinition = {
 title: 'table',
 exampleSource: `const themedTable = applyTheme(theme, table)
const host = document.createElement('div')
let state = load() // localStorage key: starryui.docs.table
function render() {
 host.replaceChildren(themedTable({
  columns: [
   { name: 'id', type: 'INTEGER' },
   { name: 'name', type: 'TEXT' },
   { name: 'score', type: 'INTEGER' },
  ],
  rows: visibleRows(state),
  sort: state.sort,
  filters: state.filters,
  onFilter(filters) {
   state = { ...state, filters }
   save(state)
   render()
  },
  onSort(sort) {
   state = { ...state, sort }
   save(state)
   render()
  },
 }))
}
render()
return host`,
 example(theme) {
  const themedTable = applyTheme(theme, table)
  const host = document.createElement('div')
  let state = readState()
  function render() {
   host.replaceChildren(
    themedTable({
     columns,
     rows: visibleRows(state),
     sort: state.sort,
     filters: state.filters,
     onFilter(filters) {
      state = { ...state, filters }
      writeState(state)
      render()
     },
     onSort(sort) {
      state = { ...state, sort }
      writeState(state)
      render()
     },
    }),
   )
  }
  render()
  return host
 },
}
