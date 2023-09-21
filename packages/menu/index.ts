import { NORMAL_DELAY_MS } from '@starryui/starryui-docs/constants'
import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export const defaultMenuConfig: StarryUITraitConfig = {
 themeFacet: 'menu',
}

export interface StarryUIMenu {
 element: HTMLElement
 isOpen: boolean
 close(): void
 open(): void
 render(): void
}

export const menu = starryComponent<StarryUIMenu>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement(config?.tagName ?? 'div')
  elem.setAttribute('data-starryui-reveal', 'hidden')
  const finalTraitConfig = Object.assign({}, defaultMenuConfig, config)
  applyTraits(elem, traits, finalTraitConfig)
  const selectTrait = traits.find((x) => x.type === 'onSelect')
  if (selectTrait?.type === 'onSelect') {
   elem.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).hasAttribute('data-value')) {
     close()
     selectTrait.onSelect(
      (event.target as HTMLElement).getAttribute('data-value') ?? undefined
     )
    }
   })
  }
  let openCloseTimeout: NodeJS.Timeout
  function close() {
   if (!instance.isOpen) {
    console.warn('No need to close menu, it is not open')
   }
   instance.isOpen = false
   elem.setAttribute('data-starryui-reveal', 'hidden')
   clearTimeout(openCloseTimeout)
   openCloseTimeout = setTimeout(() => {
    document.body.removeChild(elem)
   }, NORMAL_DELAY_MS)
  }
  function open() {
   instance.isOpen = true
   elem.innerHTML = ''
   render()
   document.body.appendChild(elem)
   clearTimeout(openCloseTimeout)
   openCloseTimeout = setTimeout(() => {
    elem.setAttribute('data-starryui-reveal', 'reveal')
   }, 0)
  }
  function render() {
   config?.content?.(elem, finalTraitConfig)
  }
  const instance: StarryUIMenu = {
   close,
   element: elem,
   isOpen: false,
   open,
   render,
  }
  return instance
 }
})

export function attachMenu(element: HTMLElement, menu: StarryUIMenu) {
 element.addEventListener('click', function () {
  if (menu.isOpen) {
   menu.close()
   return
  }
  menu.open()
  const box = element.getBoundingClientRect()
  Object.assign(menu.element.style, {
   left: `${Math.min(box.left, innerWidth - menu.element.clientWidth)}px`,
   maxHeight: `${innerHeight - box.bottom - 20}px`,
   minWidth: `${Math.max(box.width, 27)}px`,
   top: `${box.bottom - 1}px`,
  })
 })
}

export interface StarryUIButtonImageTrait {
 type: 'buttonImage'
 image: string
}

export function withButtonImage(image: string): StarryUITrait {
 return {
  type: 'buttonImage',
  image,
 }
}
