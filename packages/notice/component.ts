import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { notice } from '.'

export const noticeDefinition: StarryUIComponentDefinition = {
 title: 'notice',
 exampleSource: `const themedNotice = applyTheme(theme, notice)
return themedNotice({
 tone: 'empty',
 text: 'No primary key, this grid is read-only',
})`,
 example(theme) {
  const themedNotice = applyTheme(theme, notice)
  return themedNotice({
   tone: 'empty',
   text: 'No primary key, this grid is read-only',
  })
 },
}
