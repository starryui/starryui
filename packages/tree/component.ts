import { applyTheme } from '@starryui/theme'
import { StarryUIComponentDefinition } from '@starryui/traits'
import { tree } from '.'

export const treeDefinition: StarryUIComponentDefinition = {
 title: 'tree',
 exampleSource: `const themedTree = applyTheme(theme, tree)
return themedTree({
 nodes: [
  {
   id: 'customers',
   label: 'customers',
   expanded: true,
   children: [{ id: 'customers.id', label: 'id' }],
  },
 ],
})`,
 example(theme) {
  const themedTree = applyTheme(theme, tree)
  return themedTree({
   nodes: [
    {
     id: 'customers',
     label: 'customers',
     expanded: true,
     children: [{ id: 'customers.id', label: 'id' }],
    },
   ],
  })
 },
}
