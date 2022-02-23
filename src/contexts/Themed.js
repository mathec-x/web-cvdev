import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import purple from '@mui/material/colors/purple';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';

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

export default function Themed(props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const current = useSelector(
    (state) => state.themes.find(
      (t) => state.groups.some((g) => g.themeId === t.id && g.id === state.user.groupId),
    ),
  );

  const theme = getTheme(current?.primary || purple[900], current?.secondary || purple['100'], prefersDarkMode);

  return theme ? (
    <ThemeProvider theme={theme} {...props} />
  ) : null;
}
