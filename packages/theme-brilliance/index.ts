import { StarryUITheme } from '@starryui/theme'
import {
 MOBILE_BREAKPOINT_PX,
 NORMAL_DELAY_MS,
 S,
} from '@starryui/traits/constants.js'

export const themeBrilliance: StarryUITheme = {
 name: 'brilliance',
 variables: {
  theme0: '#ffffff',
  theme1: '#f8f8f8',
  theme2: '#f0f0f0',
  theme3: '#d0d0d0',
  theme4: '#a0a0a0',
  theme5: '#808080',
  theme6: '#606060',
  theme7: '#404040',
  theme8: '#303030',
  themee: '#202020',
  themef: '#000000',
 },
 facets: {
  body: [
   {
    '': {
     backgroundColor: 'var(--theme0)',
     display: 'flex',
     flexDirection: 'column',
     height: '100dvh',
     margin: 'var(--dimension0)',
     maxHeight: '100dvh',
     minHeight: '100dvh',
     overflow: 'hidden',
     padding: 'var(--dimension0)',
    },
    '&, input, textarea, select': {
     color: 'var(--themef)',
     fontFamily: 'sans-serif',
     fontSize: '15px',
     lineHeight: '1.65',
    },
    '*::selection': {
     backgroundColor: 'var(--themef)',
     color: 'var(--theme0)',
    },
    a: [
     {
      '&': {
       color: 'inherit',
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
     margin: 'var(--dimension3) 0 var(--dimension2)',
    },
    h2: {
     fontSize: '20px',
     margin: 'var(--dimension3) 0 var(--dimension2)',
    },
    h3: {
     fontSize: '18px',
     margin: 'var(--dimension3) 0 var(--dimension2)',
    },
    h4: {
     fontSize: '16px',
     margin: 'var(--dimension3) 0 var(--dimension2)',
    },
    h5: {
     fontSize: '14px',
     margin: 'var(--dimension3) 0 var(--dimension2)',
    },
    h6: {
     fontSize: '12px',
     margin: 'var(--dimension3) 0 var(--dimension2)',
    },
    p: {
     margin: 'var(--dimension3) 0 var(--dimension2)',
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
     flexShrink: '0',
     fontSize: '14px',
     height: 'var(--dimension4)',
     lineHeight: '16px',
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
   position: 'relative',
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
    '& hr': {
     margin: 'var(--dimension4) 0 var(--dimension2)',
     width: '100%',
    },
    '& code': {
     backgroundColor: 'var(--theme2)',
     fontFamily: "'Source Code Pro', 'Liberation Mono', monospace",
     padding: 'var(--dimension1) var(--dimension2)',
    },
    '& pre': {
     backgroundColor: 'var(--theme2)',
     fontSize: '11px',
     lineHeight: '2',
     margin: '0',
     padding: 'var(--dimension2)',
     whiteSpace: 'break-spaces',
    },
    '& pre > code': {
     padding: '0',
    },
   },
  ],
  frame: {
   border: '1px solid var(--theme4)',
   borderRadius: 'var(--dimension2)',
   boxSizing: 'border-box',
   height: '100%',
   overflowX: 'hidden',
   overflowY: 'auto',
   position: 'relative',
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
     boxShadow: '0 0 var(--dimension4) var(--theme8)',
     boxSizing: 'border-box',
     fontSize: '14px',
     minHeight: '27px',
     minWidth: '27px',
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
   backgroundColor: 'var(--theme2)',
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
     position: 'relative',
    },
    '& > facet(column)': {
     minWidth: '256px',
    },
    [`@media screen and (max-width: ${MOBILE_BREAKPOINT_PX}px) &[data-responsive="1"]`]:
     {
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
    '& > facet(button):last-child': {
     borderRight: 'none',
    },
   },
  ],
  'tray-spacer': [
   {
    '': {
     flexGrow: '1',
     minWidth: 'var(--dimension2)',
    },
    '& + facet(button)': {
     borderLeft: '1px solid var(--theme4)',
    },
   },
  ],
 },
}
