import { button } from '@starryui/button'
import { themeMidnight } from '@starryui/theme-midnight'
import { withClick, withTextContent } from '@starryui/traits'
import { attachStyle, withTheme } from 'packages/theme'

attachStyle('body', themeMidnight.facets.body)

const hello = button(withTheme(themeMidnight))

document.body.appendChild(
 hello.add(
  withTextContent('Hello world'),
  withClick(function () {
   console.log('clicked')
  })
 )()
)
