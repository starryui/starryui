import { button } from '@starryui/button'
import { field, input } from '@starryui/field'
import { frame } from '@starryui/frame'
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

interface Contact {
 email: string
 id: string
 name: string
 phone: string
}

const link = exampleLinks.contacts

function seedContacts(): Contact[] {
 return [
  {
   email: 'ada@example.com',
   id: '1',
   name: 'Ada Lovelace',
   phone: '555-0101',
  },
  {
   email: 'grace@example.com',
   id: '2',
   name: 'Grace Hopper',
   phone: '555-0191',
  },
  {
   email: 'katherine@example.com',
   id: '3',
   name: 'Katherine Johnson',
   phone: '555-0142',
  },
 ]
}

function parseContacts(value: unknown): Contact[] | undefined {
 if (!Array.isArray(value)) {
  return
 }
 const contacts: Contact[] = []
 for (const item of value) {
  if (!isRecord(item)) {
   return
  }
  if (
   typeof item.id !== 'string' ||
   typeof item.name !== 'string' ||
   typeof item.email !== 'string' ||
   typeof item.phone !== 'string'
  ) {
   return
  }
  contacts.push({
   email: item.email,
   id: item.id,
   name: item.name,
   phone: item.phone,
  })
 }
 return contacts
}

function textField(
 theme: StarryUITheme,
 label: string,
 value: string,
 placeholder: string,
 onInput: (value: string) => void
) {
 const themedField = applyTheme(theme, field)
 const themedInput = applyTheme(theme, input)
 return themedField({
  label,
  content(container) {
   container.appendChild(
    themedInput.add(
     withPlaceholder(placeholder),
     withValue(value),
     withOnInput(onInput)
    )()
   )
  },
 })
}

function contactCards(
 theme: StarryUITheme,
 controller: ExampleController<Contact[]>
) {
 const themedButton = applyTheme(theme, button)
 const themedColumn = applyTheme(theme, column)
 const themedFrame = applyTheme(theme, frame)
 const themedNotice = applyTheme(theme, notice)
 const themedRow = applyTheme(theme, row)
 const contacts = controller.current()
 const list = themedColumn({
  style: { gap: 'var(--dimension3)', maxWidth: '720px' },
 })
 if (contacts.length === 0) {
  list.appendChild(themedNotice({ text: 'No contacts yet.', tone: 'empty' }))
 }
 for (const contact of contacts) {
  const card = themedFrame({
   style: {
    display: 'grid',
    gap: 'var(--dimension2)',
    padding: 'var(--dimension3)',
   },
  })
  function patch(part: Partial<Contact>) {
   controller.commit(function (current) {
    return current.map(function (item) {
     if (item.id !== contact.id) {
      return item
     }
     return {
      email: item.email,
      id: item.id,
      name: item.name,
      phone: item.phone,
      ...part,
     }
    })
   })
  }
  card.append(
   textField(theme, 'Name', contact.name, 'Name', function (value) {
    patch({ name: value })
   }),
   textField(theme, 'Email', contact.email, 'Email', function (value) {
    patch({ email: value })
   }),
   textField(theme, 'Phone', contact.phone, 'Phone', function (value) {
    patch({ phone: value })
   }),
   themedButton.add(
    withTextContent('Remove'),
    withClick(function () {
     controller.commit(function (current) {
      return current.filter(function (item) {
       return item.id !== contact.id
      })
     }, true)
    })
   )()
  )
  list.appendChild(card)
 }
 const draftName = applyTheme(theme, input).add(withPlaceholder('Name'))()
 const draftEmail = applyTheme(theme, input).add(withPlaceholder('Email'))()
 const draftPhone = applyTheme(theme, input).add(withPlaceholder('Phone'))()
 const addRow = themedRow({
  style: { alignItems: 'center', flexGrow: '0', gap: 'var(--dimension2)' },
 })
 addRow.append(
  draftName,
  draftEmail,
  draftPhone,
  themedButton.add(
   withTextContent('Add'),
   withClick(function () {
    const name = draftName.value.trim()
    const email = draftEmail.value.trim()
    const phone = draftPhone.value.trim()
    if (!name && !email && !phone) {
     return
    }
    controller.commit(function (current) {
     return current.concat({
      email,
      id: nextId(current),
      name: name || 'New contact',
      phone,
     })
    }, true)
   })
  )()
 )
 list.appendChild(addRow)
 return list
}

export function contactsExample(theme: StarryUITheme): StarryUIPage {
 return exampleDemo(theme, {
  parse: parseContacts,
  render(controller) {
   return contactCards(theme, controller)
  },
  seed: seedContacts,
  storageKey: link.storageKey,
  subtitle: link.subtitle,
  title: link.title,
 })
}
