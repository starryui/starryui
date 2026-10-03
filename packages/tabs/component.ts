import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { tabs } from '.'

export const tabsDefinition: StarryUIComponentDefinition = {
 title: 'tabs',
 exampleSource: `const themedTabs = applyTheme(theme, tabs)
const instance = themedTabs({
 items: [
  { id: 'databases', title: 'Databases' },
  { id: 'notes', title: 'Notes' },
 ],
})
instance.panel.textContent = 'Databases'
return instance.element`,
 example(theme) {
  const themedTabs = applyTheme(theme, tabs)
  const instance = themedTabs({
   items: [
    { id: 'databases', title: 'Databases' },
    { id: 'notes', title: 'Notes' },
   ],
   onSelect(id) {
    instance.panel.textContent = id
   },
  })
  instance.panel.textContent = 'databases'
  return instance.element
 },
}
