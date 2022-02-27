import React from 'react';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import localforage from 'localforage';
import { usePwa } from 'react-pwa-app';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AddCircleOutlinedIcon,
  GetAppIcon,
  ExitToAppIcon,
  AccountCircleIcon
} from '../../components/Icons'
import StyledListItem from '../StyledListItem';
import { useSelector } from 'react-redux';
import Candidate from '../../services/Candidate';

function testUrl(str) {
  return !!(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g).test(str);
}

const AppMenu = () => {
  const pwa = usePwa();
  const location = useLocation();
  const { user, candidates } = useSelector(state => state);
  const navigate = useNavigate();

  const { isOpen, tab } = React.useMemo(() => {
    const tag = location.hash.includes('#menu');
    const tabName = location.hash.substring(location.hash.indexOf('#menu/') + 6);
    return {
      isOpen: tag,
      tab: tabName,
    };
  }, [location.hash]);


  const handleCreate = () => {
    const initialnickname = '@' + user.email.substring(0, user.email.indexOf('@'));

    window.Prompt('Preencha as informações primárias', [
      { label: 'Nome Completo', name: 'name', type: 'text', method: x => x.Capitalize(), error: x => !x.TestName() },
      { label: 'Nickname', name: 'nick', type: 'text', initialValue: initialnickname, error: x => !x.startsWith('@') },
      { label: 'Email de contato', name: 'email', type: 'email', initialValue: user.email, error: x => !x.TestMail() },
      { label: 'Url da imagem de perfil', name: 'image', type: 'text', initialValue: 'http://', error: x => !testUrl(x) },

    ]).then(async (data) => {
      const res = await Candidate.create(data);
      if (!res.ok) {
        window.Alert('Falha ao cadastrar');
      }
    })
  }

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={() => navigate({ hash: '' })}
      onOpen={() => navigate({ hash: 'menu' })}
      ModalProps={{ keepMounted: false }}
      sx={{
        '& .MuiPaper-root .MuiList-root': { height: '100vh', padding: 2, minWidth: 300 },
      }}
    >
      <List dense>
        {!!user.token &&
          <>
            <ListSubheader>Curriculos</ListSubheader>
            {candidates.map(candidate => (
              <StyledListItem
                button
                key={candidate.uuid}
                primary={candidate.nick}
                secondary={candidate.name}
                onClick={() => navigate(`candidate/${candidate.nick}`)}
                icon={<Avatar src={candidate.image} color="primary" />}
              />
            ))}
            {candidates.length === 0 &&
              <StyledListItem button
                primary="Criar Dev Currículo"
                onClick={handleCreate}
                icon={<AddCircleOutlinedIcon color="primary" />}
              />
            }
          </>
        }
        <ListSubheader>Geral</ListSubheader>
        {Boolean(pwa.supports && pwa.isInstalled !== 'standalone') && (
          <StyledListItem button
            primary="App Mobile/Desktop"
            onClick={() => pwa.install()}
            icon={<GetAppIcon color="primary" />}
          />
        )}
        <StyledListItem
          icon={<ExitToAppIcon color="primary" />}
          button
          primary="Logout"
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            localforage.clear().then(() => {
              navigate({ hash: '' });
              window.location.reload();
            });
          }}
        />
      </List>
    </SwipeableDrawer>
  );
};

export default AppMenu;
