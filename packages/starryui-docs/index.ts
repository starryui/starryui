import { button } from '@starryui/button'
import { attachStyle, withTheme } from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { withClick, withTextContent } from '@starryui/traits'

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
