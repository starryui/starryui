import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export const defaultFrameConfig: StarryUITraitConfig = { themeFacet: 'frame' }

export const frame = starryComponent<HTMLDivElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement('div')
  applyTraits(elem, traits, Object.assign({}, defaultFrameConfig, config))
  return elem
 }
})
