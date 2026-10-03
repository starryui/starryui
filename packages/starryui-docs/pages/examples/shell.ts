import { button } from '@starryui/button'
import { column, row } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'
import { withClick, withTextContent } from '@starryui/traits'
import { readStored, writeStored } from './storage'

export interface ExampleController<T> {
 commit(recipe: (current: T) => T, repaint?: boolean): void
 current(): T
}

export function exampleDemo<T>(
 theme: StarryUITheme,
 options: {
  parse(value: unknown): T | undefined
  render(controller: ExampleController<T>): HTMLElement
  seed(): T
  storageKey: string
  subtitle: string
  title: string
 }
): StarryUIPage {
 const themedButton = applyTheme(theme, button)
 const themedColumn = applyTheme(theme, column)
 const themedPage = applyTheme(theme, page)
 const themedRow = applyTheme(theme, row)
 return themedPage({
  title: options.title,
  content(container, config) {
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(container, theme.variables)
   let state = readStored(options.storageKey, options.seed, options.parse)
   const topArea = themedColumn({
    style: {
     borderBottom: '1px solid var(--theme2)',
     flexGrow: '0',
     gap: 'var(--dimension2)',
     minHeight: '128px',
     padding: 'var(--dimension3) var(--dimension4)',
    },
    themeFacets: ['document', 'opaque'],
   })
   const header = document.createElement('h2')
   header.textContent = options.title
   const intro = document.createElement('p')
   intro.textContent = options.subtitle
   const actions = themedRow({
    style: { flexGrow: '0', gap: 'var(--dimension2)' },
   })
   actions.appendChild(
    themedButton.add(withTextContent('Examples'))({
     href: '/#/examples',
     tagName: 'a',
    })
   )
   const body = document.createElement('div')
   const controller: ExampleController<T> = {
    commit(recipe, repaint = false) {
     state = recipe(state)
     writeStored(options.storageKey, state)
     if (repaint) {
      paint()
     }
    },
    current() {
     return state
    },
   }
   function paint() {
    body.replaceChildren(options.render(controller))
   }
   function reset() {
    state = options.seed()
    writeStored(options.storageKey, state)
    paint()
   }
   actions.appendChild(
    themedButton.add(withTextContent('Reset data'), withClick(reset))()
   )
   topArea.append(header, intro, actions)
   container.appendChild(topArea)
   const mainArea = themedColumn({
    style: { padding: 'var(--dimension3) var(--dimension4)' },
    themeFacets: ['document', 'opaque'],
   })
   paint()
   mainArea.appendChild(body)
   container.appendChild(mainArea)

   config?.startUpTasks?.initial?.push?.(function () {
    if (themeVariablesStyle) {
     document.head.appendChild(themeVariablesStyle)
    }
   })

   config?.cleanUpTasks?.final?.push(function () {
    if (themeVariablesStyle) {
     document.head.removeChild(themeVariablesStyle)
    }
   })
  },
 })
}
