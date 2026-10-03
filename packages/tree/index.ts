import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export interface TreeNode {
 id: string
 label: string
 children?: TreeNode[]
 expanded?: boolean
}

export interface TreeConfig extends StarryUITraitConfig {
 nodes?: TreeNode[]
 selectedId?: string
 onSelect?(id: string): void
 onToggle?(id: string, expanded: boolean): void
}

export const tree = starryComponent<HTMLElement, TreeConfig>(function (
 traits: StarryUITrait[]
) {
 return function (config?: TreeConfig) {
  const elem = document.createElement('div')
  applyTraits(elem, traits, Object.assign({}, { themeFacet: 'tree' }, config, {
   content: undefined,
  }))
  const expanded = new Set<string>()
  function collect(nodes: TreeNode[]) {
   for (const node of nodes) {
    if (node.expanded) {
     expanded.add(node.id)
    }
    if (node.children) {
     collect(node.children)
    }
   }
  }
  collect(config?.nodes ?? [])
  let selected = config?.selectedId
  function render() {
   elem.replaceChildren()
   paint(config?.nodes ?? [], 0)
   config?.content?.(elem, config)
  }
  function paint(nodes: TreeNode[], depth: number) {
   for (const node of nodes) {
    const row = document.createElement('div')
    row.setAttribute('data-starryui-trait', 'treeRow')
    row.style.paddingLeft = `calc(var(--dimension3) * ${depth})`
    if (node.id === selected) {
     row.setAttribute('data-selected', '1')
    }
    const marker = document.createElement('span')
    const hasChildren = Boolean(node.children?.length)
    marker.textContent = hasChildren ? (expanded.has(node.id) ? '▾' : '▸') : '·'
    marker.addEventListener('click', (event) => {
     event.stopPropagation()
     if (!hasChildren) {
      return
     }
     if (expanded.has(node.id)) {
      expanded.delete(node.id)
     } else {
      expanded.add(node.id)
     }
     config?.onToggle?.(node.id, expanded.has(node.id))
     render()
    })
    const label = document.createElement('span')
    label.textContent = node.label
    row.append(marker, label)
    row.addEventListener('click', () => {
     selected = node.id
     config?.onSelect?.(node.id)
     render()
    })
    elem.appendChild(row)
    if (hasChildren && expanded.has(node.id)) {
     paint(node.children ?? [], depth + 1)
    }
   }
  }
  render()
  return elem
 }
})
