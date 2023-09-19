import { StarryUITheme } from '@starryui/theme'

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
  themef: '#ffffff',
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
     overflowX: 'hidden',
     overflowY: 'auto',
     padding: 'var(--dimension0)',
    },
    '&, input, textarea, select': {
     color: 'var(--themef)',
     fontFamily: 'sans-serif',
     fontSize: '16px',
    },
   },
  ],
  button: [
   {
    '': {
     backgroundColor: 'var(--theme0)',
     border: '1px solid var(--theme8)',
     color: 'var(--themef)',
     cursor: 'pointer',
     padding: 'var(--dimension1)',
     minHeight: 'var(--dimension4)',
     minWidth: 'var(--dimension4)',
    },
    '&:hover': {
     backgroundColor: 'var(--theme2)',
    },
    '&:active': {
     backgroundColor: 'var(--theme0)',
    },
   },
  ],
  column: {
   display: 'flex',
   flexDirection: 'column',
   flexGrow: '1',
   overflowX: 'hidden',
   overflowY: 'auto',
  },
  frame: {
   border: '1px solid var(--theme4)',
   borderRadius: 'var(--dimension1)',
   boxSizing: 'border-box',
   height: '100%',
   width: '100%',
  },
  row: {
   display: 'flex',
   flexDirection: 'row',
   flexGrow: '1',
   overflowX: 'auto',
   overflowY: 'hidden',
  },
  tray: [
   {
    '': {
     backgroundColor: 'var(--theme1)',
     borderBottom: '1px solid var(--theme4)',
     boxSizing: 'border-box',
     overflowX: 'auto',
     overflowY: 'hidden',
     minHeight: 'var(--dimension4)',
     minWidth: 'var(--dimension4)',
    },
    '& > facet(button)': {
     backgroundColor: 'var(--theme1)',
     borderBottom: '1px solid var(--theme4)',
     borderLeft: 'none',
     borderRight: '1px solid var(--theme4)',
     borderTop: 'none',
     marginBottom: '-1px',
    },
   },
  ],
 },
}
