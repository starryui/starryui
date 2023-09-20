import { frame } from '@starryui/frame'
import { column, row } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import { NORMAL_DELAY } from '@starryui/starryui-docs/constants'
import {
 StarryUITheme,
 applyTheme,
 applyThemeMultiple,
 attachThemeVariables,
} from '@starryui/theme'
import { homeSlide1, homeSlide2, homeSlide3 } from './slides'

export function home(theme: StarryUITheme): StarryUIPage {
 const themedPage = applyTheme(theme, page)
 return themedPage({
  title: 'Home',
  content(container, config) {
   const [themedRow, themedColumn, themedFrame] = applyThemeMultiple(theme, [
    row,
    column,
    frame,
   ])
   const mainArea = themedRow({
    style: { padding: '10px' },
    themeFacets: ['opaque'],
   })
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(mainArea, theme.variables)

   const [slide1, slide2, slide3] = [homeSlide1, homeSlide2, homeSlide3].map(
    function (x) {
     const column = themedColumn({
      href: x.href,
      style: {
       maxWidth: '480px',
       minWidth: '240px',
       padding: '10px',
       width: '100vw',
      },
      tagName: 'a',
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

   setTimeout(() => {
    slide1.h1.scrollIntoView({ behavior: 'smooth' })
    slide2.h1.scrollIntoView({ behavior: 'smooth' })
    slide3.h1.scrollIntoView({ behavior: 'smooth' })
   }, 2 * NORMAL_DELAY)

   container.appendChild(mainArea)

   config?.startUpTasks?.initial?.push?.(function () {
    if (themeVariablesStyle) {
     document.head.appendChild(themeVariablesStyle)
    }
   })

   config?.cleanUpTasks?.final?.push(function () {
    if (themeVariablesStyle) {
     document.head.removeChild(themeVariablesStyle)
    }
   })
  },
 })
}
