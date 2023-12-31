import { StarryUIComponentDefinition } from '@starryui/traits'
import { frame } from '.'
import { withTextContent } from '@starryui/traits'
import { applyTheme } from '@starryui/theme'

export const frameDefinition: StarryUIComponentDefinition = {
 title: 'frame',
 exampleSource: `const themedFrame = applyTheme(theme, frame)
return themedFrame.add(withTextContent('A frame'))()`,
 example(theme) {
  const themedFrame = applyTheme(theme, frame)
  return themedFrame.add(withTextContent('A frame'))()
 },
}
