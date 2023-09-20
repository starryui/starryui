## About

StarryUI is a component library for web browsers, written in [TypeScript](https://www.typescriptlang.org/).

## Usage

This example demonstrates how to import a component ('frame'), attach a theme to it, create an instance of the component, and render it by adding the new element to the document body.

```ts
import { frame } from '@starryui/frame'
import {
 StarryUITheme,
 applyTheme,
 attachThemeVariables,
} from '@starryui/theme'
import { themeMidnight } from '@starryui/theme-midnight'

function myApp(theme: StarryUITheme): HTMLElement {
 const themedFrame = applyTheme(frame)
 const main: HTMLElement = themedFrame()
 attachThemeVariables(main, theme.variables)
 return main
}

document.body.appendChild(myApp(themeMidnight))
```
