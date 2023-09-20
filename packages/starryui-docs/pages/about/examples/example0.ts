import { frame } from '@starryui/frame'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'

function myApp(theme: StarryUITheme): HTMLElement {
 const themedFrame = applyTheme(themeMidnight, frame)
 const main: HTMLElement = themedFrame()
 attachThemeVariables(main, theme.variables)
 return main
}

export function example0() {
 return myApp(themeMidnight)
}
