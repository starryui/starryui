import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export const defaultConfigConfig: StarryUITraitConfig = { themeFacet: 'column' }

export const grid = starryComponent<HTMLElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement(config?.tagName ?? 'div')
  applyTraits(elem, traits, Object.assign({}, defaultConfigConfig, config))

  return elem
 }
})

// Grid component takes arguments:
export function createGridComponent(cellWidth: number, cellHeight: number) {
 function renderCell(x: number, y: number) {
  const cell = document.createElement('div')
  cell.style.width = `${cellWidth}px`
  cell.style.height = `${cellHeight}px`
  cell.style.border = '1px solid black'
  return cell
 }

 return renderCell
}

// Grid component returns control object with properties:
export function createGridControl() {
 const container = document.createElement('div') // Container creation

 function refresh(x: number, y: number) {
  // Implement the refresh logic here
  console.log(`Refreshing grid at (${x}, ${y})`)
 }

 return {
  container,
  refresh,
 }
}

// Grid component renders a grid within the returned control.container object,
// each cell having the given cellWidth and cellHeight
export function createGrid(
 container: HTMLElement,
 props: { cellWidth: number; cellHeight: number }
) {
 const maxX = Math.floor(container.clientWidth / props.cellWidth) - 1
 const maxY = Math.floor(container.clientHeight / props.cellHeight) - 1
 const cells = []

 for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
   cells.push({ x, y })
  }
 }

 cells.forEach((cell) => {
  const cellElement = document.createElement('div')
  cellElement.style.width = `${props.cellWidth}px`
  cellElement.style.height = `${props.cellHeight}px`
  cellElement.style.border = '1px solid black'
  cellElement.style.position = 'absolute'
  cellElement.style.left = `${cell.x * props.cellWidth}px`
  cellElement.style.top = `${cell.y * props.cellHeight}px`
  container.appendChild(cellElement)
 })
}

export function createGridFromArray(rows: number, columns: number) {
 const grid = Array.from({ length: rows }, () => Array(columns).fill(0))

 function refresh(x: number, y: number) {
  if (x !== undefined && y !== undefined) {
   refreshCell(x, y)
  } else if (x !== undefined) {
   refreshColumn(x)
  } else if (y !== undefined) {
   refreshRow(y)
  } else {
   refreshAll()
  }
 }

 function refreshCell(x: number, y: number) {
  grid[x][y] += 1
  console.log(`Refreshed cell (${x}, ${y})`)
 }

 function refreshColumn(x: number) {
  for (let i = 0; i < grid.length; i++) {
   grid[i][x] += 1
  }
  console.log(`Refreshed column ${x}`)
 }

 function refreshRow(y: number) {
  for (let i = 0; i < grid[y].length; i++) {
   grid[y][i] += 1
  }
  console.log(`Refreshed row ${y}`)
 }

 function refreshAll() {
  for (let i = 0; i < grid.length; i++) {
   for (let j = 0; j < grid[i].length; j++) {
    grid[i][j] += 1
   }
  }
  console.log('Refreshed all cells')
 }

 function printGrid() {
  console.table(grid)
 }

 return {
  refresh,
  printGrid,
 }
}
