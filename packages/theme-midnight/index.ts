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
  body: {
   backgroundColor: 'var(--theme0)',
   margin: 'var(--dimension0)',
   padding: 'var(--dimension0)',
  },
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
