import { StarryUIComponent, StarryUITraitConfig } from '@starryui/traits'

export interface StarryUIThemeVariables {
 [key: string]: string
}

export interface CompoundCSSStyleDeclaration {
 [key: string]: Partial<CSSStyleDeclaration> | [CompoundCSSStyleDeclaration]
}

export interface StarryUITheme {
 facets: CompoundCSSStyleDeclaration
 name: string
 variables?: StarryUIThemeVariables
}

export interface StarryUIThemeTrait {
 type: 'theme'
 theme: StarryUITheme
}

export function withTheme(theme: StarryUITheme): StarryUIThemeTrait {
 return {
  theme,
  type: 'theme',
 }
}

export type StarryUIThemeFacet =
 | 'button'
 | 'check'
 | 'code'
 | 'column'
 | 'dialog'
 | 'dialog-backdrop'
 | 'document'
 | 'field'
 | 'frame'
 | 'link-frame'
 | 'loading'
 | 'menu'
 | 'notice'
 | 'opaque-alt'
 | 'opaque'
 | 'row'
 | 'split'
 | 'table'
 | 'tabs'
 | 'tray'
 | 'tray-spacer'
 | 'tree'

let uniqueId = 0

export function attachThemeVariables(
 selector: string | HTMLElement,
 variables?: StarryUIThemeVariables
): HTMLStyleElement | undefined {
 if (typeof selector !== 'string') {
  const uniqueClassName = `scope-${uniqueId++}`
  selector.classList.add(uniqueClassName)
  selector = `.${uniqueClassName}`
 }
 if (variables) {
  return attachStyleText(`${selector} {
${Object.entries(variables)
 .map(function ([name, value]) {
  return ` --${name}: ${value};`
 })
 .join('\n')}
}`)
 }
}

export function attachStyleText(text: string) {
 const styleElement = document.createElement('style')
 styleElement.textContent = text
 document.head.appendChild(styleElement)
 return styleElement
}

export function cssRuleText(
 selector: string,
 styles: Partial<CSSStyleDeclaration>
): string {
 return `${selector} {
  ${Object.entries(styles)
   .map(([property, value]) => {
    const cssProperty = property.replace(/[A-Z]/g, (x) => `-${x.toLowerCase()}`)
    return `${cssProperty}: ${value};`
   })
   .join('\n')}
 }`
}

export function compoundRuleText(
 theme: StarryUITheme,
 selector: string,
 styles: [CompoundCSSStyleDeclaration]
): string {
 return styles
  .map((style) =>
   Object.entries(style)
    .map(function ([key, value]) {
     let postfix = ''
     let prefix = ''
     if (key.startsWith('@media')) {
      if (!key.includes('&')) {
       throw new Error(`selector should include '&': '${key}'`)
      }
      const selfPosition = key.indexOf('&')
      const media = key.substring(0, selfPosition)
      key = key.substring(selfPosition)
      prefix += `${media} {\n`
      postfix += '\n}'
     }
     const finalSelector =
      key === ''
       ? selector
       : key
          .replace(/&/g, selector)
          .replace(/facet\(([^\)]*)\)/g, (_, a) => `.theme-${theme.name}-${a}`)
     if (Array.isArray(value)) {
      return prefix + compoundRuleText(theme, finalSelector, value) + postfix
     } else {
      return prefix + cssRuleText(finalSelector, value) + postfix
     }
    })
    .join('\n')
  )
  .join('\n')
}

export function attachStyle(
 theme: StarryUITheme,
 selector: string,
 styles: Partial<CSSStyleDeclaration> | [CompoundCSSStyleDeclaration]
) {
 if (Array.isArray(styles)) {
  return attachStyleText(compoundRuleText(theme, selector, styles))
 }
 return attachStyleText(cssRuleText(selector, styles))
}

const ThemeFacetMap = new Map<string, HTMLStyleElement | undefined>()

export function attachThemeFacet(
 element: HTMLElement,
 theme: StarryUITheme,
 facet: StarryUIThemeFacet
) {
 const className = `theme-${theme.name}-${facet}`
 if (!ThemeFacetMap.has(className)) {
  ThemeFacetMap.set(className, attachThemeFacetStyle(theme, facet))
 }
 element.classList.add(className)
}

export function attachThemeFacetStyle(
 theme: StarryUITheme,
 facet: StarryUIThemeFacet
) {
 if (facet in theme.facets) {
  return attachStyle(
   theme,
   `.theme-${theme.name}-${facet}`,
   theme.facets[facet]
  )
 }
 console.warn(
  new Error(`theme '${theme.name}' does not contain facet: '${facet}'`)
 )
}

export function applyTheme<T, C extends StarryUITraitConfig>(
 theme: StarryUITheme,
 component: StarryUIComponent<T, C>
): StarryUIComponent<T, C> {
 return component.add(withTheme(theme))
}

export function applyThemeMultiple<
 C extends readonly StarryUIComponent<unknown, StarryUITraitConfig>[]
>(theme: StarryUITheme, components: C): { [K in keyof C]: C[K] } {
 return components.map((component) => component.add(withTheme(theme))) as {
  [K in keyof C]: C[K]
 }
}

export function createRootCSSVariables(source: { [key: string]: string }) {
 return `:root {
 ${Object.entries(source)
  .map(function ([name, value]) {
   return `--${name}: ${value};`
  })
  .join('\n ')}
}`
}

export type ThemeDensity = 'compact' | 'comfortable'

export const themeDensityVariables: Record<ThemeDensity, StarryUIThemeVariables> = {
 compact: {
  dimension0: '0',
  dimension1: '2px',
  dimension2: '7px',
  dimension3: '16px',
  dimension4: '32px',
  dimensionRow: '28px',
 },
 comfortable: {
  dimension0: '0',
  dimension1: '4px',
  dimension2: '10px',
  dimension3: '20px',
  dimension4: '40px',
  dimensionRow: '36px',
 },
}

let densityStyleElement: HTMLStyleElement | undefined

export function applyThemeDensity(density: ThemeDensity) {
 const text = createRootCSSVariables(themeDensityVariables[density])
 if (!densityStyleElement) {
  densityStyleElement = attachStyleText(text)
  return densityStyleElement
 }
 densityStyleElement.textContent = text
 return densityStyleElement
}

export const useThemeDimensions = {
 zero() {
  return attachStyleText(
   createRootCSSVariables({
    dimension0: '0',
    dimension1: '0',
    dimension2: '0',
    dimension3: '0',
    dimension4: '0',
    dimensionRow: '0',
   })
  )
 },
 tiny() {
  return applyThemeDensity('compact')
 },
}
