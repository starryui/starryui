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
 render(): void
}

export const menu = starryComponent<StarryUIMenu>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement(config?.tagName ?? 'div')
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
  function close() {
   if (!instance.isOpen) {
    console.warn('No need to close menu, it is not open')
   }
   instance.isOpen = false
   document.body.removeChild(elem)
  }
  function render() {
   config?.content?.(elem, finalTraitConfig)
  }
  const instance: StarryUIMenu = { close, element: elem, isOpen: false, render }
  return instance
 }
})

export function attachMenu(element: HTMLElement, menu: StarryUIMenu) {
 element.addEventListener('click', function () {
  if (menu.isOpen) {
   menu.close()
   return
  }
  menu.isOpen = true
  menu.element.innerHTML = ''
  menu.render()
  const box = element.getBoundingClientRect()
  document.body.appendChild(menu.element)
  Object.assign(menu.element.style, {
   left: `${Math.min(box.left, innerWidth - menu.element.clientWidth)}px`,
   maxHeight: `${innerHeight - box.bottom - 20}px`,
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
