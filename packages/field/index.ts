import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export interface FieldConfig extends StarryUITraitConfig {
 label?: string
}

export const defaultFieldConfig: StarryUITraitConfig = {
 themeFacet: 'field',
}

export const field = starryComponent<HTMLLabelElement, FieldConfig>(function (
 traits: StarryUITrait[]
) {
 return function (config?: FieldConfig) {
  const elem = document.createElement('label')
  applyTraits(elem, traits, Object.assign({}, defaultFieldConfig, config))
  if (config?.label) {
   const caption = document.createElement('span')
   caption.textContent = config.label
   elem.insertBefore(caption, elem.firstChild)
  }
  return elem
 }
})

export const input = starryComponent<HTMLInputElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement('input')
  elem.type = 'text'
  applyTraits(elem, traits, Object.assign({}, defaultFieldConfig, config))
  return elem
 }
})

export const textarea = starryComponent<HTMLTextAreaElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement('textarea')
  applyTraits(elem, traits, Object.assign({}, defaultFieldConfig, config))
  return elem
 }
})

export const codefield = starryComponent<HTMLTextAreaElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement('textarea')
  elem.spellcheck = false
  applyTraits(elem, traits, Object.assign({}, { themeFacet: 'code' }, config))
  return elem
 }
})

export const checkbox = starryComponent<HTMLInputElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement('input')
  elem.type = 'checkbox'
  applyTraits(elem, traits, Object.assign({}, { themeFacet: 'check' }, config))
  return elem
 }
})
