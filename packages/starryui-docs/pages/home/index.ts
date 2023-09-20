import { frame } from '@starryui/frame'
import { column, row } from '@starryui/layout'
import {
 applyTheme,
 attachStyle,
 attachThemeVariables,
 useThemeDimensions,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'
import { homeSlide1, homeSlide2, homeSlide3 } from './slides'

attachThemeVariables(themeMidnight.variables)
attachStyle(themeMidnight, 'body', themeMidnight.facets.body)
useThemeDimensions.tiny()

const [themedRow, themedColumn, themedFrame] = applyTheme(themeMidnight, [
 row,
 column,
 frame,
])

export function home(attachTo: HTMLElement) {
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
    tagName: 'a',
   })
   column.setAttribute('href', x.href)
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
    img.style.maxWidth = '100%'
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

 mainArea.setAttribute('starryui-reveal', 'hidden')
 attachTo.appendChild(mainArea)

 setTimeout(() => {
  mainArea.setAttribute('starryui-reveal', 'reveal')
  slide1.h1.scrollIntoView({ behavior: 'smooth' })
  slide2.h1.scrollIntoView({ behavior: 'smooth' })
  slide3.h1.scrollIntoView({ behavior: 'smooth' })
 }, 250)

 return mainArea
}
