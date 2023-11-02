import {
 StarryUICellDimensionsTrait,
 StarryUICellRenderTrait,
 StarryUIComponent,
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export const defaultConfigConfig: StarryUITraitConfig = { themeFacet: 'grid' }

const defaultCellDimensionsTrait: StarryUICellDimensionsTrait = {
 type: 'cellDimensions',
 height: 120,
 width: 120,
}
const defaultCellRenderTrait: StarryUICellRenderTrait = {
 type: 'cellRender',
 cellRender(x, y) {
  const info = document.createElement('span')
  info.textContent = `${x}, ${y}`
  return info
 },
}

export const grid = starryComponent<HTMLElement>(function (
 traits: StarryUITrait[]
) {
 const { height, width } =
  traits.find((x) => x.type === 'cellDimensions') ?? defaultCellDimensionsTrait

 const { cellRender } =
  traits.find((x) => x.type === 'cellRender') ?? defaultCellRenderTrait

 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement(config?.tagName ?? 'div')
  applyTraits(elem, traits, Object.assign({}, defaultConfigConfig, config))

  const gridElement = createGrid({
   cellHeight: height,
   cellWidth: width,
   renderCell: cellRender,
  }).container

  elem.appendChild(gridElement)

  return elem
 }
})

interface CreateGridParams {
 cellWidth: number
 cellHeight: number
 renderCell(x: number, y: number): HTMLElement
}

export function createGrid({ cellHeight, cellWidth, renderCell }: CreateGridParams) {
 const container = document.createElement('div')
 container.style.position = 'relative'
 let maxX = 0
 let maxY = 0

 const calculateMaxCoordinates = function () {
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight

  maxX = Math.floor(containerWidth / cellWidth) - 1
  maxY = Math.floor(containerHeight / cellHeight) - 1
 }

 const renderAllCells = function () {
  for (let y = 0; y <= maxY; y++) {
   for (let x = 0; x <= maxX; x++) {
    const cell = renderCell(x, y)
    cell.style.position = 'absolute'
    cell.style.width = cellWidth + 'px'
    cell.style.height = cellHeight + 'px'
    cell.style.left = x * cellWidth + 'px'
    cell.style.top = y * cellHeight + 'px'
    container.appendChild(cell)
   }
  }
 }

 calculateMaxCoordinates()
 renderAllCells()

 return {
  container,
 }
}

export function ObserveGrid(element: HTMLElement) {
 var resizeObs = new ResizeObserver((entries) => {
  for (let entry of entries) {
   const cr = entry.contentRect

   console.log(`Grid size: ${cr.width}px x ${cr.height}px`)
   console.log(`Grid padding: ${cr.top}px ; ${cr.left}px`)
  }
 })

 resizeObs.observe(element)
}

