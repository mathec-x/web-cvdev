import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import purple from '@mui/material/colors/purple';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

import { useSelector } from 'react-redux';
import AppLoading from '../components/AppLoading';

export function getTheme(primary, secondary, prefersDarkMode = false) {
  return createTheme({
    palette: prefersDarkMode ? {
      mode: 'dark',
    } : {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
    },
    components: {
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: secondary,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            paddingBlockEnd: 0,
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  });
}

const Themed = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const candidates = useSelector((state) => state.candidates);

  const current = React.useMemo(() => {
      const selected = candidates.find( e => e.uuid === sessionStorage.getItem('subscription'));
      return selected ? selected.theme : { primary: purple['900'], secondary: purple['50'] }

    }, [candidates])

  const theme = getTheme(current.primary, current.secondary, prefersDarkMode);

  return (
    <>
    <CssBaseline />
      {theme 
        ? <ThemeProvider theme={theme} {...props} /> 
        : <AppLoading />
      }
    </>
  )
}

export default React.memo(Themed);