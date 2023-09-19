import { button, withButtonImage } from '@starryui/button'
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
import { homeSlide1, homeSlide2, homeSlide3 } from './pages/home/slides'

attachThemeVariables(themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

const [themedButton, themedTray, themedRow, themedColumn, themedFrame] =
 applyTheme(themeMidnight, [button, tray, row, column, frame])

const topTray = themedTray()

document.body.appendChild(topTray)

const hello = themedButton.add(
 withButtonImage('/pages/home/starryui.png'),
 withTextContent('StarryUI'),
 withClick(function () {
  console.log('clicked')
 })
)()

topTray.appendChild(hello)

const mainArea = themedRow({ style: { padding: '10px' } })

const [slide1, slide2, slide3] = [homeSlide1, homeSlide2, homeSlide3].map(
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
    alignContent: 'safe center',
    justifyItems: 'center',
    padding: '20px',
   },
  })
  const content = document.createElement('div')
  content.style.height = 'fit-content'
  column.appendChild(frame)
  frame.appendChild(content)
  if (x.imgSrc) {
   const img = document.createElement('img')
   img.style.width = '256px'
   img.style.imageRendering = 'pixelated'
   img.src = x.imgSrc
   content.appendChild(img)
  }
  const h1 = document.createElement('h1')
  h1.textContent = x.title
  content.appendChild(h1)
  const h2 = document.createElement('h2')
  h2.textContent = x.subtitle
  content.appendChild(h2)
  return { column, content, frame, h1, h2 }
 }
)

mainArea.appendChild(slide1.column)
mainArea.appendChild(slide2.column)
mainArea.appendChild(slide3.column)

document.body.appendChild(mainArea)

setTimeout(() => {
 slide1.h1.scrollIntoView({ behavior: 'smooth' })
 slide2.h1.scrollIntoView({ behavior: 'smooth' })
 slide3.h1.scrollIntoView({ behavior: 'smooth' })
}, 250)
