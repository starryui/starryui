import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export type NoticeTone = 'info' | 'error' | 'empty'

export interface NoticeConfig extends StarryUITraitConfig {
 tone?: NoticeTone
 text?: string
}

export const notice = starryComponent<HTMLElement, NoticeConfig>(function (
 traits: StarryUITrait[]
) {
 return function (config?: NoticeConfig) {
  const elem = document.createElement('div')
  elem.setAttribute('data-tone', config?.tone ?? 'info')
  applyTraits(elem, traits, Object.assign({}, { themeFacet: 'notice' }, config))
  if (config?.text) {
   elem.appendChild(document.createTextNode(config.text))
  }
  return elem
 }
})
