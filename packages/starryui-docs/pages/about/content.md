## About

StarryUI is a component library for web browsers, written in [TypeScript](https://www.typescriptlang.org/).

## Installation

You'll want to install the set of base packages, the theme(s) you'd like to use, and any component packages.

```shell
npm install --save @starryui/theme @starryui/traits @starryui/theme-midnight
```

The full list of packages is available at [StarryUI on NPM](https://www.npmjs.com/org/starryui).

## Usage

This example demonstrates how to import a component ('frame' in this case, which is a simple component that has a border around itself), attach a theme to it, create an instance of the component, and append it to the document's body element.

```ts
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

document.body.appendChild(myApp(themeMidnight))
```

<div class="example0" />
