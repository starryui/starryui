import { StarryUIComponent, StarryUIComponentBuilder } from '@starryui/traits'

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
     const finalSelector =
      key === ''
       ? selector
       : key
          .replace(/&/g, selector)
          .replace(/facet\(([^\)]*)\)/g, (_, a) => `.theme-${theme.name}-${a}`)
     if (Array.isArray(value)) {
      return compoundRuleText(theme, finalSelector, value)
     } else {
      return cssRuleText(finalSelector, value)
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
 facet: string
) {
 const className = `theme-${theme.name}-${facet}`
 if (!ThemeFacetMap.has(className)) {
  ThemeFacetMap.set(className, attachThemeFacetStyle(theme, facet))
 }
 element.classList.add(className)
}

export function attachThemeFacetStyle(theme: StarryUITheme, facet: string) {
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

export function applyTheme<T extends any>(
 theme: StarryUITheme,
 components: StarryUIComponentBuilder<T>
): StarryUIComponent<T>
export function applyTheme<T extends any>(
 theme: StarryUITheme,
 components: { [K in keyof T]: StarryUIComponentBuilder<T[K]> }
): { [K in keyof T]: StarryUIComponent<T[K]> }
export function applyTheme<T extends any>(
 theme: StarryUITheme,
 components:
  | StarryUIComponentBuilder<T>
  | { [K in keyof T]: StarryUIComponentBuilder<T[K]> }
): StarryUIComponent<T> | { [K in keyof T]: StarryUIComponent<T[K]> } {
 if (Array.isArray(components)) {
  return components.map((component: StarryUIComponentBuilder<T[any]>) =>
   component(withTheme(theme))
  ) as {
   [K in keyof T]: StarryUIComponent<T[K]>
  }
 }
 return (components as StarryUIComponentBuilder<T>)(withTheme(theme))
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

export const useThemeDimensions = {
 zero() {
  return attachStyleText(
   createRootCSSVariables({
    dimension0: '0',
    dimension1: '0',
    dimension2: '0',
    dimension3: '0',
    dimension4: '0',
   })
  )
 },
 tiny() {
  return attachStyleText(
   createRootCSSVariables({
    dimension0: '0',
    dimension1: '2px',
    dimension2: '7px',
    dimension3: '16px',
    dimension4: '32px',
   })
  )
 },
}
