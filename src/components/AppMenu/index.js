import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import localforage from 'localforage';
import { usePwa } from 'react-pwa-app';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BuildIcon,
  GetAppIcon,
  ExitToAppIcon,
  AccountCircleIcon
} from '../../components/Icons'
import StyledListItem from '../StyledListItem';

const AppMenu = () => {
  const pwa = usePwa();
  const location = useLocation();
  const navigate = useNavigate();

  const { isOpen, tab } = React.useMemo(() => {
    const tag = location.hash.includes('#menu');
    const tabName = location.hash.substring(location.hash.indexOf('#menu/') + 6);
    return {
      isOpen: tag,
      tab: tabName,
    };
  }, [location.hash]);


  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={() => navigate({ hash: '' })}
      onOpen={() => navigate({ hash: 'menu' })}
      ModalProps={{
        keepMounted: false, // dont need keep mounted.
      }}
      sx={{
        '& .MuiPaper-root .MuiList-root': { height: '100vh', padding: 2 },
      }}
    >
      <List dense>

        <ListSubheader>Módulos</ListSubheader>
        <ListSubheader>Contas e Segurança</ListSubheader>
        <StyledListItem
          button
          primary="Grupos"
          onClick={() => navigate('#menu/groups')}
          icon={<AccountCircleIcon color="primary" />}
        />
        <ListSubheader>Geral</ListSubheader>
        {Boolean(pwa.supports && !pwa.isInstalled) && (
          <StyledListItem button
            primary="App Mobile/Desktop"
            onClick={pwa.install}
            icon={<GetAppIcon color="primary" />}
          />
        )}
        <StyledListItem button primary="Configurações" icon={<BuildIcon color="primary" />} />
        <StyledListItem
          icon={<ExitToAppIcon color="primary" />}
          button
          primary="Logout"
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            localforage.clear().then(() => {
              window.location.reload();
            });
          }}
        />
      </List>
    </SwipeableDrawer>
  );
};

export default AppMenu;
