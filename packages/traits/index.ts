import { StarryUIThemeTrait, attachThemeFacetStyle } from '@starryui/theme'

export interface StarryUITextContentTrait {
 type: 'textContent'
 textContent: string
}

export interface StarryMouseEventListenerTrait<
 T extends keyof HTMLElementEventMap
> {
 type: 'mouseEvent'
 mouseEvent: T
 handler(event: HTMLElementEventMap[T]): void
}

export function withClick(
 handler: (event: MouseEvent) => void
): StarryMouseEventListenerTrait<'click'> {
 return {
  type: 'mouseEvent',
  mouseEvent: 'click',
  handler,
 }
}

export function withTextContent(value: string): StarryUITextContentTrait {
 return {
  type: 'textContent',
  textContent: value,
 }
}

export type StarryUITrait =
 | StarryMouseEventListenerTrait<any>
 | StarryUITextContentTrait
 | StarryUIThemeTrait

export interface StarryUITraitConfig {
 themeFacet?: string
}

const ThemeFacetMap = new Map<string, HTMLStyleElement>()

export function applyTraits(
 elem: HTMLElement,
 traits: StarryUITrait[],
 traitConfig: StarryUITraitConfig
) {
 for (const trait of traits) {
  switch (trait.type) {
   case 'mouseEvent':
    elem.addEventListener(trait.mouseEvent, trait.handler)
    break
   case 'textContent':
    elem.textContent = trait.textContent
    break
   case 'theme':
    if (!traitConfig.themeFacet) {
     console.warn('Using theme trait without themeFacet specified')
     break
    }
    const className = `${trait.theme.name}-${traitConfig.themeFacet}`
    if (!ThemeFacetMap.has(className)) {
     ThemeFacetMap.set(
      className,
      attachThemeFacetStyle(trait.theme, traitConfig.themeFacet)
     )
    }
    elem.classList.add(className)
    break
  }
 }
}

export type StarryTraitAssembler<T> = (traitConfig?: StarryUITraitConfig) => T

export interface StarryUIComponent<T> extends StarryTraitAssembler<T> {
 add(...addTraits: StarryUITrait[]): StarryUIComponent<T>
 remove(...removeTraits: StarryUITrait[]): StarryUIComponent<T>
 extend(props: {
  add?: StarryUITrait[]
  remove?: StarryUITrait[]
 }): StarryUIComponent<T>
}

export function starryComponent<T>(
 builder: (traits: StarryUITrait[]) => StarryTraitAssembler<T>
): (...traits: StarryUITrait[]) => StarryUIComponent<T> {
 const wrap = function (...traits: StarryUITrait[]): StarryUIComponent<T> {
  const component = builder(traits) as StarryUIComponent<T>

  component.add = (...addTraits: StarryUITrait[]): StarryUIComponent<T> =>
   wrap(...mergeTraits(traits, undefined, addTraits))

  component.remove = (...removeTraits: StarryUITrait[]): StarryUIComponent<T> =>
   wrap(...mergeTraits(traits, removeTraits))

  component.extend = (props: {
   add?: StarryUITrait[]
   remove?: StarryUITrait[]
  }): StarryUIComponent<T> =>
   wrap(...mergeTraits(traits, props.remove, props.add))

  return component
 }
 return wrap
}

export function mergeTraits(
 traits: StarryUITrait[],
 remove?: StarryUITrait[],
 add?: StarryUITrait[]
) {
 if (remove) {
  traits = traits.filter((trait) => !remove.includes(trait))
 }
 if (add) {
  traits = traits.concat(add.filter((trait) => !traits.includes(trait)))
 }
 return traits
}