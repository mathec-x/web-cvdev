import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import AppLoading from '../components/AppLoading';
// import useMediaQuery from '@mui/material/useMediaQuery';

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
      }
    },
    components: {
      // MuiCssBaseline: {},
      MuiAvatar: {
        styleOverrides: {
          root: {
            background: primary
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

const Themed = ({ children: Children }) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const candidates = useSelector((state) => state.candidates);

  const current = React.useMemo(() => {
    const selected = candidates.find(e => e.uuid === sessionStorage.getItem('subscription'));
    return selected ? selected.theme : { primary: '#4581F6', secondary: blue[50] }

  }, [candidates])

  const theme = getTheme(current.primary, current.secondary);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!theme && <AppLoading />}
      {Children}
    </ThemeProvider>
  )
}

export default React.memo(Themed);