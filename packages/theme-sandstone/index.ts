import {
 MOBILE_BREAKPOINT_PX,
 NORMAL_DELAY_MS,
 S,
} from '@starryui/starryui-docs/constants'
import { StarryUITheme } from '@starryui/theme'

export const themeSandstone: StarryUITheme = {
 name: 'sandstone',
 variables: {
  'theme-4': '#000000',
  'theme-3': '#101000',
  'theme-2': '#202000',
  'theme-1': '#303000',
  theme0: '#404000',
  theme1: '#606000',
  theme2: '#707000',
  theme3: '#808000',
  theme4: '#909000',
  theme5: '#a0a000',
  theme6: '#b0b000',
  theme7: '#c0c000',
  theme8: '#d0d000',
  themee: '#e0e0e0',
  themef: '#ffff00',
 },
 facets: {
  body: [
   {
    '': {
     backgroundColor: 'var(--theme0)',
     display: 'flex',
     flexDirection: 'column',
     margin: 'var(--dimension0)',
     minHeight: '100vh',
     maxHeight: '100vh',
     overflow: 'hidden',
     padding: 'var(--dimension0)',
    },
    '&, input, textarea, select, a': {
     color: 'var(--themef)',
     fontFamily: 'sans-serif',
     fontSize: '15px',
     lineHeight: '1.65',
    },
    '*::selection': {
     backgroundColor: 'var(--theme8)',
     color: 'var(--theme0)',
    },
    a: [
     {
      '&': {
       textDecoration: 'none',
       transition: `${NORMAL_DELAY_MS / S}s ease background-color`,
      },
      '&:hover': {
       backgroundColor: 'var(--theme3)',
      },
      '&:active': {
       backgroundColor: 'var(--theme0)',
      },
     },
    ],
    h1: {
     fontSize: '24px',
     margin: 'var(--dimension2) 0',
    },
    h2: {
     fontSize: '20px',
     margin: 'var(--dimension2) 0',
    },
    h3: {
     fontSize: '18px',
     margin: 'var(--dimension2) 0',
    },
    h4: {
     fontSize: '16px',
     margin: 'var(--dimension2) 0',
    },
    h5: {
     fontSize: '14px',
     margin: 'var(--dimension2) 0',
    },
    h6: {
     fontSize: '12px',
     margin: 'var(--dimension2) 0',
    },
    '*[data-starryui-reveal]': {
     opacity: '0',
     transform: 'scaleY(0.975) translateY(-2.5%)',
     transformOrigin: 'top left',
     transition: `${NORMAL_DELAY_MS / S}s ease-out opacity, ${
      NORMAL_DELAY_MS / S
     }s ease-out transform`,
    },
    '*[data-starryui-reveal="reveal"]': {
     opacity: '1',
     transform: 'scaleY(1) translateY(0)',
    },
   },
  ],
  button: [
   {
    '': {
     backgroundColor: 'var(--theme0)',
     border: '1px solid var(--theme8)',
     boxSizing: 'border-box',
     color: 'var(--themef)',
     cursor: 'pointer',
     display: 'inline-flex',
     flexDirection: 'row',
     fontSize: '14px',
     height: 'var(--dimension4)',
     lineHeight: '14px',
     maxHeight: 'var(--dimension4)',
     minWidth: 'var(--dimension4)',
     padding: 'var(--dimension2)',
     whiteSpace: 'nowrap',
    },
    '&:hover': {
     backgroundColor: 'var(--theme3)',
    },
    '&:active': {
     backgroundColor: 'var(--theme0)',
    },
    '& div[data-starryui-trait="buttonImage"]': {
     backgroundSize: '100%',
     height: 'var(--dimension3)',
     imageRendering: 'pixelated',
     marginRight: 'var(--dimension2)',
     width: 'var(--dimension3)',
    },
   },
  ],
  column: {
   boxSizing: 'border-box',
   display: 'flex',
   flexDirection: 'column',
   flexGrow: '1',
   flexShrink: '1',
   overflowX: 'hidden',
   overflowY: 'auto',
   width: '100%',
  },
  document: [
   {
    '& a': {
     borderBottom: 'var(--dimension1) solid var(--theme8)',
     paddingBottom: 'var(--dimension1)',
     transition: `${NORMAL_DELAY_MS / S}s ease border-bottom`,
    },
    '& a:hover': {
     borderBottom: 'var(--dimension1) solid var(--themef)',
    },
    '& pre': {
     backgroundColor: 'var(--theme-1)',
     fontFamily: "'Source Code Pro', 'Liberation Mono', monospace",
     fontSize: '13px',
     lineHeight: '2',
     margin: '0',
     padding: 'var(--dimension2)',
     whiteSpace: 'break-spaces',
    },
   },
  ],
  frame: {
   border: '1px solid var(--theme2)',
   borderRadius: 'var(--dimension2)',
   boxSizing: 'border-box',
   height: '100%',
   overflowX: 'hidden',
   overflowY: 'auto',
   width: '100%',
  },
  'link-frame': [
   {
    '& h1 span': {
     borderBottom: 'var(--dimension1) solid transparent',
     paddingBottom: 'var(--dimension1)',
     transition: `${NORMAL_DELAY_MS / S}s ease border-bottom`,
    },
    '&:hover h1 span': {
     borderBottom: 'var(--dimension1) solid var(--themef)',
    },
   },
  ],
  menu: [
   {
    '': {
     backgroundColor: 'var(--theme0)',
     border: '1px solid var(--theme4)',
     borderRadius: 'var(--dimension2)',
     fontSize: '14px',
     overflowX: 'hidden',
     overflowY: 'auto',
     position: 'absolute',
     zIndex: '2',
    },
    '& > div': {
     cursor: 'pointer',
     padding: 'var(--dimension1) var(--dimension2)',
    },
    '& > div:hover': {
     backgroundColor: 'var(--theme3)',
    },
   },
  ],
  opaque: {
   backgroundColor: 'var(--theme0)',
   color: 'var(--themef)',
  },
  'opaque-alt': {
   backgroundColor: 'var(--theme-2)',
  },
  row: [
   {
    '': {
     boxSizing: 'border-box',
     display: 'flex',
     flexDirection: 'row',
     flexGrow: '1',
     flexShrink: '0',
     overflowX: 'auto',
     overflowY: 'hidden',
    },
    '& > facet(column)': {
     minWidth: '256px',
    },
    [`@media screen and (max-width: ${MOBILE_BREAKPOINT_PX}px) &`]: {
     flexDirection: 'column',
    },
   },
  ],
  tray: [
   {
    '': {
     backgroundColor: 'var(--theme1)',
     borderBottom: '1px solid var(--theme4)',
     boxSizing: 'border-box',
     display: 'flex',
     flexDirection: 'row',
     flexShrink: '0',
     overflowX: 'auto',
     overflowY: 'hidden',
     minHeight: 'var(--dimension4)',
     minWidth: 'var(--dimension4)',
    },
    '& facet(button)': {
     backgroundColor: 'var(--theme1)',
     borderBottom: '1px solid var(--theme4)',
     borderLeft: 'none',
     borderRight: '1px solid var(--theme4)',
     borderTop: 'none',
     marginBottom: '-1px',
    },
    '& facet(button):last-child': {
     borderRight: 'none',
    },
   },
  ],
  'tray-spacer': [
   {
    '': {
     flexGrow: '1',
    },
    '& + facet(button)': {
     borderLeft: '1px solid var(--theme4)',
    },
   },
  ],
 },
}
