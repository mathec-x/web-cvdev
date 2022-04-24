import React from 'react';
import { useSelector } from 'react-redux';
import { usePwa } from 'react-pwa-app';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';
import Tooltip from '@mui/material/Tooltip';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
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
import useAuth from '../../hooks/useAuth';
import AppLoading from '../AppLoading';
import useShare from '../../hooks/useShare';


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

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={() => navigate({ hash: '' })}
      onOpen={() => navigate({ hash: 'menu' })}
      ModalProps={{ keepMounted: false }}
      sx={{
        '& .MuiPaper-root .MuiList-root': { height: '100vh', p: 2, minWidth: 300 },
      }}
    >
      {!!isLoading && <AppLoading />}
      <List
        dense
        component="div"
      >
        <ListSubheader component="div">Site</ListSubheader>
        <StyledListItem button
          primary="Home"
          onClick={() => navigate('/home')}
          icon={<Avatar variant='rounded'  ><HomeIcon /></Avatar>}
        />
        {!!user.token &&
          <>
            <ListSubheader component="div">Curriculos</ListSubheader>
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
            <StyledListItem button
              primary="Criar Dev Currículo"
              onClick={() => {
                navigate('/register')
              }}
              icon={<Avatar variant='rounded'  ><AddCircleOutlinedIcon /></Avatar>}
            />
          </>
        }
        <ListSubheader component="div">Geral</ListSubheader>
        {Boolean(candidate?.nick) && (
          <StyledListItem button
            primary="Imprimir"
            onClick={() => {
              navigate('/candidate/' + candidate.nick)
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
      <StyledListItem
        sx={{
          mt: 'auto'
        }}
        button
        secondary="Relatar Bugs"
        primary="Crie uma issue para nós"
        onClick={() => window.open('https://github.com/mathec-x/web-cvdev/issues', '_blank')}
      />
    </SwipeableDrawer>
  );
};

export default React.memo(AppMenu);
