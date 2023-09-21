import { frame } from '@starryui/frame'
import { column, row } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import { NORMAL_DELAY } from '@starryui/starryui-docs/constants'
import {
 StarryUITheme,
 applyTheme,
 applyThemeMultiple,
 attachThemeFacet,
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
    style: { gap: '10px', padding: '10px' },
    themeFacets: ['opaque'],
   })
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(mainArea, theme.variables)

   const [slide1, slide2, slide3] = [homeSlide1, homeSlide2, homeSlide3].map(
    function (x) {
     const link = themedColumn({
      href: x.href,
      tagName: 'a',
     })
     attachThemeFacet(link, theme, 'link-frame')
     const frame = themedFrame({
      style: {
       display: 'grid',
       alignContent: 'safe center',
       justifyItems: 'center',
       padding: '20px',
      },
     })
     const content = document.createElement('div')
     attachThemeFacet(content, theme, 'column')
     Object.assign(content.style, {
      height: 'fit-content',
     })
     link.appendChild(frame)
     frame.appendChild(content)
     if (x.imgSrc) {
      const img = document.createElement('img')
      Object.assign(img.style, {
       imageRendering: 'pixelated',
       margin: '0 auto var(--dimension4)',
       maxWidth: '100%',
       width: '128px',
      })
      img.src = x.imgSrc
      content.appendChild(img)
     }
     const h1 = document.createElement('h1')
     const h1text = document.createElement('span')
     h1text.textContent = x.title
     h1.appendChild(h1text)
     content.appendChild(h1)
     const h4 = document.createElement('h4')
     h4.textContent = x.subtitle
     content.appendChild(h4)
     return { column: link, content, frame, h1, h4 }
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
