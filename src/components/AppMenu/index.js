import React from 'react';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';
import Tooltip from '@mui/material/Tooltip';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { usePwa } from 'react-pwa-app';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AddCircleOutlinedIcon,
  GetAppIcon,
  HomeIcon,
  InfoIcon,
  LoginIcon,
  LogoutIcon,
  PrintIcon,
  ShareIcon
} from '../../components/Icons'
import StyledListItem from '../StyledListItem';
import { useSelector } from 'react-redux';
import Candidate from '../../services/Candidate';
import useAuth from '../../hooks/useAuth';
import AppLoading from '../AppLoading';
import useShare from '../../hooks/useShare';

function testUrl(str) {
  return !!(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g).test(str);
}

const AppMenu = () => {
  const pwa = usePwa();
  const location = useLocation();
  const navigate = useNavigate();
  const { share, canShare } = useShare();
  const { logout, login, isLoading } = useAuth();
  const [user, candidates, candidate] = useSelector(state => [state.user, state.candidates, state.candidate]);

  const { isOpen } = React.useMemo(() => {
    const tag = location.hash.includes('#menu');
    const tabName = location.hash.substring(location.hash.indexOf('#menu/') + 6);
    return {
      isOpen: tag,
      tab: tabName,
    };
  }, [location.hash]);

  const data_share = React.useMemo(() => {
    if (candidate && canShare)
      return {
        title: candidate.nick,
        text: candidate.name,
        url: [window.location.origin, "candidate", candidate.nick].join('/')
      };

    return null;
  }, [canShare, candidate])

  const handleCreate = () => {
    const initialnickname = '@' + user.email.substring(0, user.email.indexOf('@'));

    window.Prompt('Preencha as informações primárias', [
      { label: 'Nome Completo', name: 'name', type: 'text', method: x => x.Capitalize(), error: x => !x.TestName() },
      { label: 'Nickname', name: 'nick', type: 'text', initialValue: initialnickname, error: x => !x.startsWith('@') },
      { label: 'Email de contato', name: 'email', type: 'email', initialValue: user.email, error: x => !x.TestMail() },
      { label: 'Url da imagem de perfil', name: 'image', type: 'text', initialValue: 'http://', error: x => !testUrl(x) },

    ]).then(async (data) => {
      const res = await Candidate.create(data);
      if (res.status !== 201) {
        window.Alert('Falha ao cadastrar');
      } else {
        window.Alert('Cadastrado com sucesso');
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
      {!!isLoading && <AppLoading />}
      <List dense>
        <StyledListItem button
          primary="Home"
          onClick={() => navigate('/') }
          icon={<Avatar variant='rounded'  ><HomeIcon /></Avatar>}
        />
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
                icon={<Avatar variant='rounded' src={candidate.image} />}
                actions={!candidate.nick.startsWith('@') &&
                  <Tooltip title="Este perfil é privado, porque não inicia com '@'">
                    <InfoIcon />
                  </Tooltip>
                }
              />
            ))}
            {/* {candidates.length === 0 && */}
            <StyledListItem button
              primary="Criar Dev Currículo"
              onClick={handleCreate}
              icon={<Avatar variant='rounded'  ><AddCircleOutlinedIcon /></Avatar>}
            />
            {/* } */}
          </>
        }
        <ListSubheader>Geral</ListSubheader>
        {Boolean(candidate?.nick) && (
          <StyledListItem button
            primary="Imprimir"
            onClick={() => {
              navigate('/candidate/'+candidate.nick)
              setTimeout(window.print, 355)
            }}
            icon={<Avatar variant='rounded'  ><PrintIcon /></Avatar>}
          />
        )}
        {Boolean(data_share) && (
          <StyledListItem button
            primary="Compartilhar"
            onClick={() => share(data_share)}
            icon={<Avatar variant='rounded'  ><ShareIcon /></Avatar>}
          />
        )}
        {Boolean(pwa.supports && pwa.isInstalled !== 'standalone') && (
          <StyledListItem button
            primary="App Mobile/Desktop"
            onClick={() => pwa.install()}
            icon={<Avatar variant='rounded'  ><GetAppIcon /></Avatar>}
          />
        )}

        <StyledListItem
          icon={
            <Avatar variant='rounded' >
              {!!user.token ? <LogoutIcon /> : <LoginIcon />}
            </Avatar>}
          button
          primary={!!user.token ? "Logout" : "Login"}
          onClick={!!user.token ? logout : login}
        />
      </List>
    </SwipeableDrawer>
  );
};

export default React.memo(AppMenu);
