import { button } from '@starryui/button'
import { frame } from '@starryui/frame'
import { column, row } from '@starryui/layout'
import {
 applyTheme,
 attachStyle,
 attachThemeVariables,
 useThemeDimensions,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { withClick, withTextContent } from '@starryui/traits'
import { tray } from '@starryui/tray'
import { homeSlide1 } from './pages/home/slides'

attachThemeVariables(themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

const [themedButton, themedTray, themedRow, themedColumn, themedFrame] =
 applyTheme(themeMidnight, [button, tray, row, column, frame])

const topTray = themedTray()

document.body.appendChild(topTray)

const hello = themedButton.add(
 withTextContent('Hello world'),
 withClick(function () {
  console.log('clicked')
 })
)()

topTray.appendChild(hello)

const mainArea = themedRow({ style: { padding: '10px' } })

const [slide1, slide2, slide3] = [homeSlide1, homeSlide1, homeSlide1].map(
 function (x) {
  const column = themedColumn({
   style: {
    maxWidth: '480px',
    minWidth: '240px',
    padding: '10px',
    width: '100vw',
   },
  })
  const frame = themedFrame({
   style: {
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center',
    padding: '20px',
   },
  })
  column.appendChild(frame)
  if (x.imgSrc) {
   const img = document.createElement('img')
   img.src = x.imgSrc
   frame.appendChild(img)
  }
  const h1 = document.createElement('h1')
  h1.textContent = x.title
  frame.appendChild(h1)
  const h2 = document.createElement('h2')
  h2.textContent = x.subtitle
  frame.appendChild(h2)
  return { column, frame }
 }
)

mainArea.appendChild(slide1.column)
mainArea.appendChild(slide2.column)
mainArea.appendChild(slide3.column)

document.body.appendChild(mainArea)
