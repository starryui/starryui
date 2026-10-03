import { button } from '@starryui/button'
import { checkbox, input } from '@starryui/field'
import { column, row } from '@starryui/layout'
import { notice } from '@starryui/notice'
import { StarryUIPage } from '@starryui/page'
import { StarryUITheme, applyTheme } from '@starryui/theme'
import {
 withClick,
 withOnInput,
 withPlaceholder,
 withTextContent,
 withValue,
} from '@starryui/traits'
import { exampleLinks } from './catalog'
import { ExampleController, exampleDemo } from './shell'
import { isRecord, nextId } from './storage'

interface Todo {
 done: boolean
 id: string
 text: string
}

const link = exampleLinks.todo

function seedTodos(): Todo[] {
 return [
  { done: true, id: '1', text: 'Read the component gallery' },
  { done: false, id: '2', text: 'Try a theme' },
  { done: false, id: '3', text: 'Build a small page' },
 ]
}

function parseTodos(value: unknown): Todo[] | undefined {
 if (!Array.isArray(value)) {
  return
 }
 const todos: Todo[] = []
 for (const item of value) {
  if (!isRecord(item)) {
   return
  }
  if (typeof item.id !== 'string' || typeof item.text !== 'string') {
   return
  }
  if (typeof item.done !== 'boolean') {
   return
  }
  todos.push({ done: item.done, id: item.id, text: item.text })
 }
 return todos
}

function todoList(
 theme: StarryUITheme,
 controller: ExampleController<Todo[]>
) {
 const themedButton = applyTheme(theme, button)
 const themedCheckbox = applyTheme(theme, checkbox)
 const themedColumn = applyTheme(theme, column)
 const themedInput = applyTheme(theme, input)
 const themedNotice = applyTheme(theme, notice)
 const themedRow = applyTheme(theme, row)
 const todos = controller.current()
 const list = themedColumn({
  style: { gap: 'var(--dimension3)', maxWidth: '720px' },
 })
 if (todos.length === 0) {
  list.appendChild(themedNotice({ text: 'No tasks yet.', tone: 'empty' }))
 }
 for (const todo of todos) {
  const line = themedRow({
   style: { alignItems: 'center', flexGrow: '0', gap: 'var(--dimension2)' },
  })
  line.appendChild(
   themedCheckbox.add(
    withValue(todo.done ? 'true' : 'false'),
    withOnInput(function (value) {
     const done = value === 'true'
     controller.commit(function (current) {
      return current.map(function (item) {
       if (item.id !== todo.id) {
        return item
       }
       return { done, id: item.id, text: item.text }
      })
     })
    })
   )()
  )
  line.appendChild(
   themedInput.add(
    withValue(todo.text),
    withOnInput(function (value) {
     controller.commit(function (current) {
      return current.map(function (item) {
       if (item.id !== todo.id) {
        return item
       }
       return { done: item.done, id: item.id, text: value }
      })
     })
    })
   )({ style: { flex: '1 1 auto' } })
  )
  line.appendChild(
   themedButton.add(
    withTextContent('Remove'),
    withClick(function () {
     controller.commit(function (current) {
      return current.filter(function (item) {
       return item.id !== todo.id
      })
     }, true)
    })
   )()
  )
  list.appendChild(line)
 }
 const draft = themedInput.add(withPlaceholder('New task'))({
  style: { flex: '1 1 auto' },
 })
 const addRow = themedRow({
  style: { alignItems: 'center', flexGrow: '0', gap: 'var(--dimension2)' },
 })
 addRow.append(
  draft,
  themedButton.add(
   withTextContent('Add'),
   withClick(function () {
    const text = draft.value.trim()
    if (!text) {
     return
    }
    controller.commit(function (current) {
     return current.concat({ done: false, id: nextId(current), text })
    }, true)
   })
  )()
 )
 list.appendChild(addRow)
 return list
}

export function todoExample(theme: StarryUITheme): StarryUIPage {
 return exampleDemo(theme, {
  parse: parseTodos,
  render(controller) {
   return todoList(theme, controller)
  },
  seed: seedTodos,
  storageKey: link.storageKey,
  subtitle: link.subtitle,
  title: link.title,
 })
}
