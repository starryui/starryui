import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export interface SplitConfig extends StarryUITraitConfig {
 direction?: 'row' | 'column'
 ratio?: number
}

export interface StarryUISplit {
 element: HTMLElement
 start: HTMLElement
 end: HTMLElement
}

export const split = starryComponent<StarryUISplit, SplitConfig>(function (
 traits: StarryUITrait[]
) {
 return function (config?: SplitConfig) {
  const direction = config?.direction ?? 'row'
  const elem = document.createElement('div')
  elem.setAttribute('data-direction', direction)
  applyTraits(
   elem,
   traits,
   Object.assign({}, { themeFacet: 'split' }, config, { content: undefined })
  )
  const start = document.createElement('div')
  start.setAttribute('data-starryui-pane', 'start')
  const handle = document.createElement('div')
  handle.setAttribute('data-starryui-trait', 'splitHandle')
  const end = document.createElement('div')
  end.setAttribute('data-starryui-pane', 'end')
  function applyRatio(value: number) {
   const clamped = Math.min(0.85, Math.max(0.15, value))
   start.style.flex = `0 0 ${clamped * 100}%`
   end.style.flex = '1 1 auto'
  }
  applyRatio(config?.ratio ?? 0.5)
  function move(event: PointerEvent) {
   const rect = elem.getBoundingClientRect()
   const next =
    direction === 'column'
     ? (event.clientY - rect.top) / rect.height
     : (event.clientX - rect.left) / rect.width
   applyRatio(next)
  }
  function up(event: PointerEvent) {
   handle.removeEventListener('pointermove', move)
   handle.removeEventListener('pointerup', up)
   if (handle.hasPointerCapture(event.pointerId)) {
    handle.releasePointerCapture(event.pointerId)
   }
  }
  handle.addEventListener('pointerdown', (event) => {
   event.preventDefault()
   handle.setPointerCapture(event.pointerId)
   handle.addEventListener('pointermove', move)
   handle.addEventListener('pointerup', up)
  })
  elem.append(start, handle, end)
  config?.content?.(elem, config)
  return { element: elem, end, start }
 }
})
