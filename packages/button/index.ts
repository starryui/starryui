import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export const defaultButtonConfig: StarryUITraitConfig = { themeFacet: 'button' }

export const button = starryComponent<HTMLElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement(config?.tagName ?? 'button')
  applyTraits(elem, traits, Object.assign({}, defaultButtonConfig, config))
  return elem
 }
})

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
