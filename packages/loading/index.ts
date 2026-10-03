import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export const defaultLoadingConfig: StarryUITraitConfig = {
 themeFacet: 'loading',
}

export const loading = starryComponent<HTMLElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement('div')
  elem.setAttribute('role', 'status')
  applyTraits(elem, traits, Object.assign({}, defaultLoadingConfig, config))
  return elem
 }
})
