import { StarryUITheme, attachThemeFacet } from '@starryui/theme'
import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export const defaultTrayConfig: StarryUITraitConfig = { themeFacet: 'tray' }

export const tray = starryComponent<HTMLDivElement>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement('div')
  applyTraits(elem, traits, Object.assign({}, defaultTrayConfig, config))
  return elem
 }
})

export function traySpacer(theme: StarryUITheme) {
 const elem = document.createElement('div')
 attachThemeFacet(elem, theme, 'tray-spacer')
 return elem
}
