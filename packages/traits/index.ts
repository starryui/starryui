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

export interface StarryUIValueTrait {
 type: 'value'
 value: string
}

export interface StarryUIPlaceholderTrait {
 type: 'placeholder'
 placeholder: string
}

export interface StarryUIDisabledTrait {
 type: 'disabled'
 disabled: boolean
}

export interface StarryUIOnInputTrait {
 type: 'onInput'
 onInput(value: string): void
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

export function withValue(value: string): StarryUIValueTrait {
 return {
  type: 'value',
  value,
 }
}

export function withPlaceholder(placeholder: string): StarryUIPlaceholderTrait {
 return {
  type: 'placeholder',
  placeholder,
 }
}

export function withDisabled(disabled = true): StarryUIDisabledTrait {
 return {
  type: 'disabled',
  disabled,
 }
}

export function withOnInput(
 onInput: (value: string) => void
): StarryUIOnInputTrait {
 return {
  type: 'onInput',
  onInput,
 }
}

export type StarryUITrait =
 | StarryMouseEventListenerTrait<any>
 | StarryUIButtonImageTrait
 | StarryUITextContentTrait
 | StarryUIThemeTrait
 | StarryUIOnSelectTrait
 | StarryUIValueTrait
 | StarryUIPlaceholderTrait
 | StarryUIDisabledTrait
 | StarryUIOnInputTrait

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
   case 'value':
    applyValue(elem, trait.value)
    break
   case 'placeholder':
    if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
     elem.placeholder = trait.placeholder
    }
    break
   case 'disabled':
    if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement || elem instanceof HTMLButtonElement) {
     elem.disabled = trait.disabled
    }
    break
   case 'onInput':
    elem.addEventListener('input', () => {
     trait.onInput(readControlValue(elem))
    })
    break
  }
 }
}

function applyValue(elem: HTMLElement, value: string) {
 if (elem instanceof HTMLInputElement && elem.type === 'checkbox') {
  elem.checked = value === 'true'
  return
 }
 if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
  elem.value = value
 }
}

function readControlValue(elem: HTMLElement) {
 if (elem instanceof HTMLInputElement && elem.type === 'checkbox') {
  return elem.checked ? 'true' : 'false'
 }
 if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
  return elem.value
 }
 return ''
}

export type StarryTraitAssembler<
 T,
 C extends StarryUITraitConfig = StarryUITraitConfig
> = (traitConfig?: C) => T

export interface StarryUIComponent<
 T,
 C extends StarryUITraitConfig = StarryUITraitConfig
> extends StarryTraitAssembler<T, C> {
 add(...addTraits: StarryUITrait[]): StarryUIComponent<T, C>
 remove(...removeTraits: StarryUITrait[]): StarryUIComponent<T, C>
 extend(props: {
  add?: StarryUITrait[]
  remove?: StarryUITrait[]
 }): StarryUIComponent<T, C>
}

export function starryComponent<
 T,
 C extends StarryUITraitConfig = StarryUITraitConfig
>(
 builder: (traits: StarryUITrait[]) => StarryTraitAssembler<T, C>
): StarryUIComponent<T, C> {
 const wrap = function (...traits: StarryUITrait[]): StarryUIComponent<T, C> {
  const component = builder(traits) as StarryUIComponent<T, C>

  component.add = (...addTraits: StarryUITrait[]): StarryUIComponent<T, C> =>
   wrap(...mergeTraits(traits, undefined, addTraits))

  component.remove = (
   ...removeTraits: StarryUITrait[]
  ): StarryUIComponent<T, C> => wrap(...mergeTraits(traits, removeTraits))

  component.extend = (props: {
   add?: StarryUITrait[]
   remove?: StarryUITrait[]
  }): StarryUIComponent<T, C> =>
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
