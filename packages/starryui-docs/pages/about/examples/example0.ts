import { frame } from '@starryui/frame'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'

function myApp(theme: StarryUITheme): HTMLElement {
 const themedFrame = applyTheme(themeMidnight, frame)
 const main: HTMLElement = themedFrame({
  style: {
   padding: '10px',
  },
 })
 main.textContent = "I'm a frame!"
 attachThemeVariables(main, theme.variables)
 return main
}

export function example0() {
 return myApp(themeMidnight)
}
