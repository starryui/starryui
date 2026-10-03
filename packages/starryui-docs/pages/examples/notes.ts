import { button } from '@starryui/button'
import { field, input, textarea } from '@starryui/field'
import { column, row } from '@starryui/layout'
import { notice } from '@starryui/notice'
import { StarryUIPage } from '@starryui/page'
import { StarryUITheme, applyTheme } from '@starryui/theme'
import {
 withClick,
 withOnInput,
 withTextContent,
 withValue,
} from '@starryui/traits'
import { exampleLinks } from './catalog'
import { ExampleController, exampleDemo } from './shell'
import { isRecord, nextId } from './storage'

interface Note {
 body: string
 id: string
 title: string
}

const link = exampleLinks.notes

function seedNotes(): Note[] {
 return [
  {
   body: 'This note stays in the browser.',
   id: '1',
   title: 'Welcome',
  },
  {
   body: 'StarryUI components compose into small apps.',
   id: '2',
   title: 'Library',
  },
 ]
}

function parseNotes(value: unknown): Note[] | undefined {
 if (!Array.isArray(value)) {
  return
 }
 const notes: Note[] = []
 for (const item of value) {
  if (!isRecord(item)) {
   return
  }
  if (
   typeof item.id !== 'string' ||
   typeof item.title !== 'string' ||
   typeof item.body !== 'string'
  ) {
   return
  }
  notes.push({ body: item.body, id: item.id, title: item.title })
 }
 return notes
}

function noteEditor(
 theme: StarryUITheme,
 controller: ExampleController<Note[]>,
 selectedId: { value: string }
) {
 const themedButton = applyTheme(theme, button)
 const themedColumn = applyTheme(theme, column)
 const themedField = applyTheme(theme, field)
 const themedInput = applyTheme(theme, input)
 const themedNotice = applyTheme(theme, notice)
 const themedRow = applyTheme(theme, row)
 const themedTextarea = applyTheme(theme, textarea)
 const notes = controller.current()
 if (!notes.some(function (note) { return note.id === selectedId.value })) {
  selectedId.value = notes[0]?.id ?? ''
 }
 const layout = themedRow({
  style: { alignItems: 'flex-start', gap: 'var(--dimension4)' },
 })
 const menu = themedColumn({
  style: { flexGrow: '0', gap: 'var(--dimension2)', minWidth: '180px' },
 })
 if (notes.length === 0) {
  menu.appendChild(themedNotice({ text: 'No notes yet.', tone: 'empty' }))
 }
 const selected = notes.find(function (note) {
  return note.id === selectedId.value
 })
 for (const note of notes) {
  const pick = themedButton.add(
   withTextContent(note.title || 'Untitled'),
   withClick(function () {
    selectedId.value = note.id
    controller.commit(function (current) {
     return current
    }, true)
   })
  )()
  if (note.id === selectedId.value) {
   pick.setAttribute('aria-current', 'true')
  }
  menu.appendChild(pick)
 }
 menu.appendChild(
  themedButton.add(
   withTextContent('Add note'),
   withClick(function () {
    controller.commit(function (current) {
     const id = nextId(current)
     selectedId.value = id
     return current.concat({ body: '', id, title: 'New note' })
    }, true)
   })
  )()
 )
 const editor = themedColumn({
  style: { gap: 'var(--dimension3)', maxWidth: '640px' },
 })
 if (!selected) {
  editor.appendChild(
   themedNotice({ text: 'Add a note to start writing.', tone: 'info' })
  )
 } else {
  const titleButton = menu.querySelector('[aria-current="true"]')
  editor.appendChild(
   themedField({
    label: 'Title',
    content(container) {
     container.appendChild(
      themedInput.add(
       withValue(selected.title),
       withOnInput(function (value) {
        if (titleButton) {
         titleButton.textContent = value || 'Untitled'
        }
        controller.commit(function (current) {
         return current.map(function (note) {
          if (note.id !== selected.id) {
           return note
          }
          return { body: note.body, id: note.id, title: value }
         })
        })
       })
      )()
     )
    },
   })
  )
  editor.appendChild(
   themedField({
    label: 'Body',
    content(container) {
     container.appendChild(
      themedTextarea.add(
       withValue(selected.body),
       withOnInput(function (value) {
        controller.commit(function (current) {
         return current.map(function (note) {
          if (note.id !== selected.id) {
           return note
          }
          return { body: value, id: note.id, title: note.title }
         })
        })
       })
      )({ style: { minHeight: '180px' } })
     )
    },
   })
  )
  editor.appendChild(
   themedButton.add(
    withTextContent('Remove'),
    withClick(function () {
     controller.commit(function (current) {
      return current.filter(function (note) {
       return note.id !== selected.id
      })
     }, true)
    })
   )()
  )
 }
 layout.append(menu, editor)
 return layout
}

export function notesExample(theme: StarryUITheme): StarryUIPage {
 const selectedId = { value: '' }
 return exampleDemo(theme, {
  parse: parseNotes,
  render(controller) {
   return noteEditor(theme, controller, selectedId)
  },
  seed: seedNotes,
  storageKey: link.storageKey,
  subtitle: link.subtitle,
  title: link.title,
 })
}
