import { frame } from '@starryui/frame'
import { column, row } from '@starryui/layout'
import { StarryUIPage, page } from '@starryui/page'
import {
 StarryUITheme,
 applyTheme,
 applyThemeMultiple,
 attachThemeFacet,
 attachThemeVariables,
} from '@starryui/theme'
import { NORMAL_DELAY_MS } from '@starryui/traits/constants.js'
import { homeSlide1, homeSlide2, homeSlide3, homeSlide4 } from './slides'

export function home(theme: StarryUITheme): StarryUIPage {
 const themedPage = applyTheme(theme, page)
 return themedPage({
  title: 'Home',
  content(container, config) {
   const themeVariablesStyle: HTMLStyleElement | undefined =
    attachThemeVariables(container, theme.variables)
   const [themedRow, themedColumn, themedFrame] = applyThemeMultiple(theme, [
    row,
    column,
    frame,
   ])
   const topArea = themedRow({
    style: {
     alignItems: 'center',
     borderBottom: '1px solid var(--theme2)',
     flexGrow: '0',
     gap: '20px',
     minHeight: '128px',
     justifyContent: 'space-evenly',
     padding: 'var(--dimension3) var(--dimension4)',
    },
    themeFacets: ['document', 'opaque'],
   })
   topArea.setAttribute('data-responsive', '1')
   const header = document.createElement('h2')
   header.textContent = 'HTML + TypeScript Component Library'
   const para0 = document.createElement('p')
   para0.textContent =
    'StarryUI is a flexible and themeable component system for TypeScript and the web.'
   const para1 = document.createElement('p')
   para1.innerHTML =
    'Find the source code on <a href="https://github.com/starryui/starryui" target="_blank">GitHub</a> and the published packages on <a href="https://www.npmjs.com/org/starryui" target="_blank">NPM</a>.'
   topArea.appendChild(header)
   topArea.appendChild(para0)
   topArea.appendChild(para1)
   container.appendChild(topArea)
   const mainArea = themedRow({
    style: { gap: '10px', padding: '10px' },
    themeFacets: ['opaque'],
   })

   const [slide1, slide2, slide3, slide4] = [
    homeSlide1,
    homeSlide2,
    homeSlide3,
    homeSlide4,
   ].map(function (x) {
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
   })

   mainArea.appendChild(slide1.column)
   mainArea.appendChild(slide2.column)
   mainArea.appendChild(slide3.column)
   mainArea.appendChild(slide4.column)

   setTimeout(() => {
    slide1.h1.scrollIntoView({ behavior: 'smooth' })
    slide2.h1.scrollIntoView({ behavior: 'smooth' })
    slide3.h1.scrollIntoView({ behavior: 'smooth' })
   }, 2 * NORMAL_DELAY_MS)

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
