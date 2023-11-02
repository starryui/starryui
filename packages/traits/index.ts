import {
 attachThemeFacet,
 StarryUITheme,
 StarryUIThemeFacet,
 StarryUIThemeTrait,
} from '@starryui/theme'

export type StarryUITask = () => void | Promise<void>

export interface StarryUITaskSchedule {
 initial: StarryUITask[]
 final: StarryUITask[]
}

export interface StarryUIButtonImageTrait {
 type: 'buttonImage'
 image: string
}

export interface StarryUITextContentTrait {
 type: 'textContent'
 textContent: string
}

export interface StarryUIOnSelectTrait {
 type: 'onSelect'
 onSelect(value: string | undefined): void
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
 | StarryUIButtonImageTrait
 | StarryUITextContentTrait
 | StarryUIThemeTrait
 | StarryUIOnSelectTrait
 | StarryUICellRenderTrait
 | StarryUICellDimensionsTrait

export interface StarryUITraitConfig {
 content?: (container: HTMLElement, traitConfig?: StarryUITraitConfig) => void
 href?: string
 startUpTasks?: StarryUITaskSchedule
 cleanUpTasks?: StarryUITaskSchedule
 style?: Partial<CSSStyleDeclaration>
 tagName?: string
 themeFacet?: StarryUIThemeFacet
 themeFacets?: StarryUIThemeFacet[]
 title?: string
}

export function applyTraits(
 elem: HTMLElement,
 traits: StarryUITrait[],
 traitConfig: StarryUITraitConfig
) {
 if (traitConfig.content) {
  traitConfig.content(elem, traitConfig)
 }
 if (traitConfig.href) {
  elem.setAttribute('href', traitConfig.href)
 }
 if (traitConfig.style) {
  Object.assign(elem.style, traitConfig.style)
 }
 for (const trait of traits) {
  switch (trait.type) {
   case 'mouseEvent':
    elem.addEventListener(trait.mouseEvent, trait.handler)
    break
   case 'buttonImage':
    const image = document.createElement('div')
    image.setAttribute('data-starryui-trait', 'buttonImage')
    image.style.backgroundImage = `url(${JSON.stringify(trait.image)})`
    elem.appendChild(image)
    break
   case 'textContent':
    elem.appendChild(document.createTextNode(trait.textContent))
    break
   case 'theme':
    if (!traitConfig.themeFacet) {
     console.warn(
      `Using theme '${trait.theme.name}' trait without themeFacet specified`
     )
     break
    }
    attachThemeFacet(elem, trait.theme, traitConfig.themeFacet)
    if (traitConfig.themeFacets) {
     for (const facet of traitConfig.themeFacets) {
      attachThemeFacet(elem, trait.theme, facet)
     }
    }
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
): StarryUIComponent<T> {
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
 return wrap()
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

export interface StarryUIComponentDefinition {
 packageTitle?: string
 title: string
 exampleSource?: string
 example(theme: StarryUITheme): HTMLElement
}

export interface StarryUICellDimensionsTrait {
 type: 'cellDimensions'
 height: number
 width: number
}

export interface StarryUICellRenderTrait {
 type: 'cellRender'
 cellRender: (x: number, y: number) => HTMLElement
}

export function withCellDimensions(
 height: number,
 width: number
): StarryUICellDimensionsTrait {
 return {
  type: 'cellDimensions',
  height,
  width,
 }
}

export function withCellRender(
 cellRender: (x: number, y: number) => HTMLElement
): StarryUICellRenderTrait {
 return {
  type: 'cellRender',
  cellRender,
 }
}
