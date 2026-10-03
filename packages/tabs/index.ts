import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export interface TabItem {
 id: string
 title: string
}

export interface TabsConfig extends StarryUITraitConfig {
 items?: TabItem[]
 active?: string
 onSelect?(id: string): void
}

export interface StarryUITabs {
 element: HTMLElement
 panel: HTMLElement
 active: string
 setActive(id: string): void
}

export const tabs = starryComponent<StarryUITabs, TabsConfig>(function (
 traits: StarryUITrait[]
) {
 return function (config?: TabsConfig) {
  const elem = document.createElement('div')
  applyTraits(elem, traits, Object.assign({}, { themeFacet: 'tabs' }, config, {
   content: undefined,
  }))
  const list = document.createElement('div')
  list.setAttribute('role', 'tablist')
  list.setAttribute('data-starryui-trait', 'tablist')
  const panel = document.createElement('div')
  panel.setAttribute('role', 'tabpanel')
  panel.setAttribute('data-starryui-trait', 'tabpanel')
  elem.append(list, panel)
  config?.content?.(panel, config)
  const items = config?.items ?? []
  let active = config?.active ?? items[0]?.id ?? ''
  const buttons = new Map<string, HTMLButtonElement>()
  function paint() {
   for (const [id, button] of buttons) {
    button.setAttribute('aria-selected', id === active ? 'true' : 'false')
   }
  }
  function setActive(id: string) {
   active = id
   instance.active = id
   paint()
   config?.onSelect?.(id)
  }
  for (const item of items) {
   const button = document.createElement('button')
   button.type = 'button'
   button.textContent = item.title
   button.setAttribute('role', 'tab')
   button.addEventListener('click', () => setActive(item.id))
   buttons.set(item.id, button)
   list.appendChild(button)
  }
  const instance: StarryUITabs = {
   active,
   element: elem,
   panel,
   setActive,
  }
  paint()
  return instance
 }
})
