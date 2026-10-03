import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { dialog } from '.'

export const dialogDefinition: StarryUIComponentDefinition = {
 title: 'dialog',
 exampleSource: `const themedDialog = applyTheme(theme, dialog)
const instance = themedDialog({
 title: 'New database',
 content(panel) {
  panel.append('Choose a name, then create a local SQLite file.')
 },
})
trigger.addEventListener('click', () => instance.open())`,
 example(theme) {
  const themedDialog = applyTheme(theme, dialog)
  const instance = themedDialog({
   title: 'New database',
   content(panel) {
    panel.append('Choose a name, then create a local SQLite file.')
   },
  })
  const trigger = document.createElement('button')
  trigger.type = 'button'
  trigger.textContent = 'Open dialog'
  trigger.addEventListener('click', () => instance.open())
  return trigger
 },
}
