export interface ExampleLink {
 href: string
 storageKey: string
 subtitle: string
 title: string
}

export const exampleLinks: Record<string, ExampleLink> = {
 todo: {
  href: '/#/examples/todo',
  storageKey: 'starryui.docs.example.todo',
  subtitle: 'Check off tasks and add new ones.',
  title: 'Todo list',
 },
 contacts: {
  href: '/#/examples/contacts',
  storageKey: 'starryui.docs.example.contacts',
  subtitle: 'Keep names, email, and phone numbers.',
  title: 'Contacts',
 },
 notes: {
  href: '/#/examples/notes',
  storageKey: 'starryui.docs.example.notes',
  subtitle: 'Write short notes and keep them here.',
  title: 'Notes',
 },
 settings: {
  href: '/#/examples/settings',
  storageKey: 'starryui.docs.example.settings',
  subtitle: 'A form for the preferences you choose.',
  title: 'Settings',
 },
 inventory: {
  href: '/#/examples/inventory',
  storageKey: 'starryui.docs.example.inventory',
  subtitle: 'Edit a table of items, quantities, and places.',
  title: 'Inventory',
 },
}

export const exampleLinkList: ExampleLink[] = [
 exampleLinks.todo,
 exampleLinks.contacts,
 exampleLinks.notes,
 exampleLinks.settings,
 exampleLinks.inventory,
]
