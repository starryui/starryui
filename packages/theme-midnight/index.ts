import { StarryUITheme } from '@starryui/theme'
import {
 MOBILE_BREAKPOINT_PX,
 NORMAL_DELAY_MS,
 S,
} from '@starryui/traits/constants.js'

export const themeMidnight: StarryUITheme = {
 name: 'midnight',
 variables: {
  theme0: '#000000',
  theme1: '#101010',
  theme2: '#202020',
  theme3: '#303030',
  theme4: '#404040',
  theme5: '#505050',
  theme6: '#606060',
  theme7: '#707070',
  theme8: '#808080',
  themee: '#e0e0e0',
  themef: '#ffffff',
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
     borderBottom: 'none',
     borderLeft: 'none',
     borderRight: '1px solid var(--theme4)',
     borderTop: 'none',
     lineHeight: '20px',
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
  check: {
   accentColor: 'var(--themef)',
   height: 'var(--dimension3)',
   width: 'var(--dimension3)',
  },
  code: [
   {
    '': {
     backgroundColor: 'var(--theme1)',
     border: '1px solid var(--theme4)',
     boxSizing: 'border-box',
     color: 'var(--themef)',
     fontFamily: "'Source Code Pro', 'Liberation Mono', monospace",
     fontSize: '13px',
     lineHeight: '1.45',
     minHeight: '8rem',
     padding: 'var(--dimension2)',
     resize: 'vertical',
     width: '100%',
    },
   },
  ],
  dialog: [
   {
    '': {
     backgroundColor: 'var(--theme0)',
     border: '1px solid var(--theme4)',
     borderRadius: 'var(--dimension2)',
     boxSizing: 'border-box',
     color: 'var(--themef)',
     display: 'flex',
     flexDirection: 'column',
     gap: 'var(--dimension3)',
     maxHeight: '80vh',
     maxWidth: '36rem',
     minWidth: '18rem',
     overflow: 'auto',
     padding: 'var(--dimension3)',
    },
   },
  ],
  'dialog-backdrop': {
   alignItems: 'center',
   backgroundColor: 'rgba(0, 0, 0, 0.45)',
   bottom: '0',
   display: 'flex',
   justifyContent: 'center',
   left: '0',
   position: 'fixed',
   right: '0',
   top: '0',
   zIndex: '5',
  },
  field: [
   {
    '': {
     boxSizing: 'border-box',
     color: 'var(--themef)',
     font: 'inherit',
    },
    '&:is(input, textarea, select)': {
     backgroundColor: 'var(--theme1)',
     border: '1px solid var(--theme4)',
     padding: 'var(--dimension2)',
     width: '100%',
    },
    '&:is(label)': {
     display: 'flex',
     flexDirection: 'column',
     gap: 'var(--dimension1)',
     width: '100%',
    },
    '& > span': {
     fontSize: '12px',
     letterSpacing: '0.04em',
     textTransform: 'uppercase',
    },
   },
  ],
  loading: {
   color: 'var(--theme8)',
   fontSize: '13px',
   padding: 'var(--dimension2)',
  },
  notice: [
   {
    '': {
     border: '1px solid var(--theme4)',
     boxSizing: 'border-box',
     fontSize: '14px',
     padding: 'var(--dimension2) var(--dimension3)',
    },
    '&[data-tone="error"]': {
     backgroundColor: 'var(--theme2)',
     color: 'var(--themef)',
    },
    '&[data-tone="info"]': {
     backgroundColor: 'var(--theme1)',
    },
    '&[data-tone="empty"]': {
     color: 'var(--theme8)',
     textAlign: 'center',
    },
   },
  ],
  split: [
   {
    '': {
     boxSizing: 'border-box',
     display: 'flex',
     flexDirection: 'row',
     flexGrow: '1',
     minHeight: '0',
     minWidth: '0',
     overflow: 'hidden',
     width: '100%',
    },
    '&[data-direction="column"]': {
     flexDirection: 'column',
    },
    '& > [data-starryui-pane]': {
     minHeight: '0',
     minWidth: '0',
     overflow: 'auto',
    },
    '& > [data-starryui-trait="splitHandle"]': {
     backgroundColor: 'var(--theme4)',
     flexShrink: '0',
    },
    '&[data-direction="row"] > [data-starryui-trait="splitHandle"]': {
     cursor: 'col-resize',
     width: 'var(--dimension2)',
    },
    '&[data-direction="column"] > [data-starryui-trait="splitHandle"]': {
     cursor: 'row-resize',
     height: 'var(--dimension2)',
    },
   },
  ],
  table: [
   {
    '': {
     boxSizing: 'border-box',
     display: 'flex',
     flexDirection: 'column',
     minHeight: '0',
     overflow: 'auto',
     width: '100%',
    },
    '& table': {
     borderCollapse: 'collapse',
     width: '100%',
    },
    '& th, & td': {
     borderBottom: '1px solid var(--theme4)',
     fontSize: '13px',
     fontWeight: '400',
     padding: 'var(--dimension1) var(--dimension2)',
     textAlign: 'left',
     whiteSpace: 'nowrap',
    },
    '& th': {
     backgroundColor: 'var(--theme1)',
    },
    '& thead tr:first-child th': {
     position: 'sticky',
     top: '0',
     zIndex: '2',
    },
    '& [data-starryui-trait="tableHeading"]': {
     alignItems: 'center',
     display: 'flex',
     gap: 'var(--dimension1)',
     minWidth: '0',
    },
    '& [data-starryui-trait="tableHeadingLabel"]': {
     cursor: 'pointer',
     flex: '1',
     minWidth: '0',
     overflow: 'hidden',
     textOverflow: 'ellipsis',
    },
    '& [data-starryui-trait="tableFilterButton"]': {
     alignItems: 'center',
     backgroundColor: 'transparent',
     border: '1px solid transparent',
     borderRadius: 'var(--dimension1)',
     color: 'var(--theme8)',
     cursor: 'pointer',
     display: 'inline-flex',
     flexShrink: '0',
     gap: 'var(--dimension1)',
     padding: '1px var(--dimension1)',
    },
    '& [data-starryui-trait="tableFilterButton"][data-active="1"]': {
     backgroundColor: 'var(--theme3)',
     borderColor: 'var(--theme5)',
     color: 'var(--themef)',
    },
    '& [data-starryui-trait="tableFilterCount"]': {
     fontSize: '11px',
     lineHeight: '1',
    },
    '& [data-starryui-trait="tableFilters"]': {
     cursor: 'default',
     verticalAlign: 'top',
     whiteSpace: 'normal',
    },
    '& [data-starryui-trait="tableFilterList"]': {
     display: 'flex',
     flexDirection: 'column',
     gap: '2px',
     maxWidth: '9rem',
    },
    '& [data-starryui-trait="tableFilterChip"]': {
     alignItems: 'center',
     display: 'flex',
     gap: 'var(--dimension1)',
     minWidth: '0',
    },
    '& [data-starryui-trait="tableFilterChip"] span': {
     minWidth: '0',
     overflow: 'hidden',
     textOverflow: 'ellipsis',
    },
    '& [data-starryui-trait="tableFilterChip"] button': {
     backgroundColor: 'transparent',
     border: 'none',
     color: 'inherit',
     cursor: 'pointer',
     flexShrink: '0',
     lineHeight: '1',
     padding: '0',
    },
    '& tr[data-selected="1"]': {
     backgroundColor: 'var(--theme3)',
    },
    '& td input': {
     backgroundColor: 'var(--theme0)',
     border: '1px solid var(--theme4)',
     boxSizing: 'border-box',
     color: 'var(--themef)',
     font: 'inherit',
     width: '100%',
    },
    '& [data-starryui-trait="tablePager"]': {
     display: 'flex',
     gap: 'var(--dimension2)',
     padding: 'var(--dimension2)',
    },
   },
  ],
  tabs: [
   {
    '': {
     boxSizing: 'border-box',
     display: 'flex',
     flexDirection: 'column',
     flexGrow: '1',
     minHeight: '0',
     width: '100%',
    },
    '& > [data-starryui-trait="tablist"]': {
     display: 'flex',
     flexShrink: '0',
    },
    '& > [data-starryui-trait="tablist"] > button': {
     backgroundColor: 'var(--theme1)',
     border: '1px solid var(--theme4)',
     borderBottom: 'none',
     color: 'var(--themef)',
     cursor: 'pointer',
     font: 'inherit',
     padding: 'var(--dimension2) var(--dimension3)',
    },
    '& > [data-starryui-trait="tablist"] > button[aria-selected="true"]': {
     backgroundColor: 'var(--theme0)',
    },
    '& > [data-starryui-trait="tabpanel"]': {
     border: '1px solid var(--theme4)',
     flexGrow: '1',
     minHeight: '0',
     overflow: 'auto',
    },
   },
  ],
  tree: [
   {
    '': {
     boxSizing: 'border-box',
     overflow: 'auto',
     width: '100%',
    },
    '& [data-starryui-trait="treeRow"]': {
     cursor: 'pointer',
     display: 'flex',
     gap: 'var(--dimension2)',
     padding: 'var(--dimension1) var(--dimension2)',
     whiteSpace: 'nowrap',
    },
    '& [data-starryui-trait="treeRow"]:hover': {
     backgroundColor: 'var(--theme2)',
    },
    '& [data-starryui-trait="treeRow"][data-selected="1"]': {
     backgroundColor: 'var(--theme3)',
    },
   },
  ],
 },
}
