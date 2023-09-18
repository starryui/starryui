export interface StarryUITheme {
 name: string
 facets: { [key: string]: Partial<CSSStyleDeclaration> }
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

export function attachStyle(
 selector: string,
 styles: Partial<CSSStyleDeclaration>
) {
 const styleElement = document.createElement('style')
 styleElement.textContent = `${selector} {
  ${Object.entries(styles)
   .map(([property, value]) => {
    const cssProperty = property.replace(/[A-Z]/g, (x) => `-${x.toLowerCase()}`)
    return `${cssProperty}: ${value};`
   })
   .join('\n')}
 }`
 document.head.appendChild(styleElement)
 return styleElement
}

export function attachThemeFacetStyle(theme: StarryUITheme, facet: string) {
 if (!(facet in theme.facets)) {
  throw new Error(`theme '${theme.name}' does not contain facet: '${facet}'`)
 }
 const styleElement = attachStyle(
  `.${theme.name}-${facet}`,
  theme.facets[facet]
 )
 return styleElement
}
