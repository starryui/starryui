import { buttonDefinition } from '@starryui/button/component'
import { frameDefinition } from '@starryui/frame/component'
import { columnDefinition, rowDefinition } from '@starryui/layout/component'
import { menuDefinition } from '@starryui/menu/component'
import { pageDefinition } from '@starryui/page/component'
import { StarryUITheme } from '@starryui/theme'
import { themeDefinition } from '@starryui/theme/component'
import { traitsDefinition } from '@starryui/traits/component'
import { trayDefinition } from '@starryui/tray/component'

export interface StarryUIComponentDefinition {
 packageTitle?: string
 title: string
 exampleSource?: string
 example(theme: StarryUITheme): HTMLElement
}

export const componentList: StarryUIComponentDefinition[] = [
 buttonDefinition,
 columnDefinition,
 frameDefinition,
 menuDefinition,
 pageDefinition,
 rowDefinition,
 themeDefinition,
 traitsDefinition,
 trayDefinition,
]
