import { checkbox, field, input, textarea } from '@starryui/field'
import { column } from '@starryui/layout'
import { StarryUIPage } from '@starryui/page'
import { StarryUITheme, applyTheme } from '@starryui/theme'
import { withOnInput, withValue } from '@starryui/traits'
import { exampleLinks } from './catalog'
import { ExampleController, exampleDemo } from './shell'
import { isRecord } from './storage'

interface Settings {
 bio: string
 displayName: string
 email: string
 newsletter: boolean
}

const link = exampleLinks.settings

function seedSettings(): Settings {
 return {
  bio: 'Notes on the analytical engine.',
  displayName: 'Ada Lovelace',
  email: 'ada@example.com',
  newsletter: true,
 }
}

function parseSettings(value: unknown): Settings | undefined {
 if (!isRecord(value)) {
  return
 }
 if (
  typeof value.bio !== 'string' ||
  typeof value.displayName !== 'string' ||
  typeof value.email !== 'string' ||
  typeof value.newsletter !== 'boolean'
 ) {
  return
 }
 return {
  bio: value.bio,
  displayName: value.displayName,
  email: value.email,
  newsletter: value.newsletter,
 }
}

function settingsForm(
 theme: StarryUITheme,
 controller: ExampleController<Settings>
) {
 const themedCheckbox = applyTheme(theme, checkbox)
 const themedColumn = applyTheme(theme, column)
 const themedField = applyTheme(theme, field)
 const themedInput = applyTheme(theme, input)
 const themedTextarea = applyTheme(theme, textarea)
 const settings = controller.current()
 const form = themedColumn({
  style: { gap: 'var(--dimension3)', maxWidth: '640px' },
 })
 const greeting = document.createElement('p')
 function signedIn(name: string) {
  greeting.textContent = name
   ? `Signed in as ${name}`
   : 'Signed in as a guest'
 }
 signedIn(settings.displayName)
 form.appendChild(greeting)
 form.appendChild(
  themedField({
   label: 'Display name',
   content(container) {
    container.appendChild(
     themedInput.add(
      withValue(settings.displayName),
      withOnInput(function (value) {
       signedIn(value)
       controller.commit(function (current) {
        return {
         bio: current.bio,
         displayName: value,
         email: current.email,
         newsletter: current.newsletter,
        }
       })
      })
     )()
    )
   },
  })
 )
 form.appendChild(
  themedField({
   label: 'Email',
   content(container) {
    container.appendChild(
     themedInput.add(
      withValue(settings.email),
      withOnInput(function (value) {
       controller.commit(function (current) {
        return {
         bio: current.bio,
         displayName: current.displayName,
         email: value,
         newsletter: current.newsletter,
        }
       })
      })
     )()
    )
   },
  })
 )
 form.appendChild(
  themedField({
   label: 'Newsletter',
   content(container) {
    container.appendChild(
     themedCheckbox.add(
      withValue(settings.newsletter ? 'true' : 'false'),
      withOnInput(function (value) {
       const newsletter = value === 'true'
       controller.commit(function (current) {
        return {
         bio: current.bio,
         displayName: current.displayName,
         email: current.email,
         newsletter,
        }
       })
      })
     )()
    )
   },
  })
 )
 form.appendChild(
  themedField({
   label: 'Bio',
   content(container) {
    container.appendChild(
     themedTextarea.add(
      withValue(settings.bio),
      withOnInput(function (value) {
       controller.commit(function (current) {
        return {
         bio: value,
         displayName: current.displayName,
         email: current.email,
         newsletter: current.newsletter,
        }
       })
      })
     )({ style: { minHeight: '140px' } })
    )
   },
  })
 )
 return form
}

export function settingsExample(theme: StarryUITheme): StarryUIPage {
 return exampleDemo(theme, {
  parse: parseSettings,
  render(controller) {
   return settingsForm(theme, controller)
  },
  seed: seedSettings,
  storageKey: link.storageKey,
  subtitle: link.subtitle,
  title: link.title,
 })
}
