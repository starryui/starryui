import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export interface DialogConfig extends StarryUITraitConfig {
 title?: string
 onClose?(): void
}

export interface StarryUIDialog {
 element: HTMLElement
 panel: HTMLElement
 isOpen: boolean
 open(): void
 close(): void
}

export const dialog = starryComponent<StarryUIDialog, DialogConfig>(function (
 traits: StarryUITrait[]
) {
 return function (config?: DialogConfig) {
  const backdrop = document.createElement('div')
  const panel = document.createElement('div')
  panel.tabIndex = -1
  const themeTraits = traits.filter((trait) => trait.type === 'theme')
  applyTraits(backdrop, themeTraits, { themeFacet: 'dialog-backdrop' })
  applyTraits(panel, traits, Object.assign({}, { themeFacet: 'dialog' }, config))
  if (config?.title) {
   const heading = document.createElement('h2')
   heading.textContent = config.title
   panel.insertBefore(heading, panel.firstChild)
  }
  backdrop.appendChild(panel)
  let isOpen = false
  function onKey(event: KeyboardEvent) {
   if (event.key === 'Escape') {
    close()
   }
  }
  function close() {
   if (!isOpen) {
    return
   }
   isOpen = false
   document.removeEventListener('keydown', onKey)
   backdrop.remove()
   config?.onClose?.()
  }
  function open() {
   if (isOpen) {
    return
   }
   isOpen = true
   document.body.appendChild(backdrop)
   document.addEventListener('keydown', onKey)
   panel.focus()
  }
  backdrop.addEventListener('click', (event) => {
   if (event.target === backdrop) {
    close()
   }
  })
  const instance: StarryUIDialog = {
   close,
   element: backdrop,
   get isOpen() {
    return isOpen
   },
   open,
   panel,
  }
  return instance
 }
})
