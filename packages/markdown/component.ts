import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { markdown } from '.'

export const markdownDefinition: StarryUIComponentDefinition = {
 title: 'markdown',
 exampleSource: `const themedMarkdown = applyTheme(theme, markdown)
return themedMarkdown({
 source: '# Note\\n\\nA **dataset** beside the code.',
})`,
 example(theme) {
  const themedMarkdown = applyTheme(theme, markdown)
  return themedMarkdown({
   source: '# Note\n\nA **dataset** beside the code.',
  })
 },
}
