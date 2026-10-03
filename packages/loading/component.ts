import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition, withTextContent } from '@starryui/traits'
import { loading } from '.'

export const loadingDefinition: StarryUIComponentDefinition = {
 title: 'loading',
 exampleSource: `const themedLoading = applyTheme(theme, loading)
return themedLoading.add(withTextContent('Loading'))()`,
 example(theme) {
  const themedLoading = applyTheme(theme, loading)
  return themedLoading.add(withTextContent('Loading'))()
 },
}
