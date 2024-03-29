import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { usePwa } from 'react-pwa-app';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Vertical from '../Vertical';
import HideOnScroll from '../HideOnScroll';
import useMobileDetection from '../../hooks/useMobileDetection';
import { InstallDesktopIcon, InstallMobileIcon, LoginIcon, LogoutIcon, MenuIcon, PrintIcon, ShareIcon } from '../Icons';
import { useSelector } from 'react-redux';
import AppLoading from '../AppLoading';
import useAuth from '../../hooks/useAuth';
import useShare from '../../hooks/useShare';

const AppBar = () => {
    const pwa = usePwa();
    const navigate = useNavigate();
    const location = useLocation();
    const ismobile = useMobileDetection();

    const user = useSelector(state => state.user);
    const candidate = useSelector(state => state.candidate);

    const { share, canShare } = useShare();
    const { isLoading, login, logout, subscriptions } = useAuth({
        onLogin: () => navigate({ hash: 'menu' })
    });

    const isCandidatePath = React.useMemo(() => {
        return location.pathname.includes(candidate.nick)

    }, [location.pathname, candidate.nick])

    const data_share = React.useMemo(() => {
        if (candidate && canShare)
            return {
                title: candidate.nick,
                text: candidate.name,
                url: [window.location.origin, "candidate", candidate.nick].join('/')
            };

        return null;
    }, [canShare, candidate])

    return (<>
        {!!isLoading && <AppLoading />}
        <HideOnScroll>
            <MuiAppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Stack direction="row" minWidth={100} alignItems={"center"} spacing={2}>
                        <IconButton onClick={() => navigate({ hash: 'menu' })} edge="start" color="inherit" aria-label="close">
                            <MenuIcon />
                        </IconButton>
                        <Link to={'/home'}>
                            {(isCandidatePath && candidate) ?
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Stack>
                                        <Typography noWrap component="span" lineHeight={1} display="block">
                                            {candidate.nick}
                                        </Typography>
                                        <Typography noWrap variant="caption">{candidate.name}</Typography>
                                    </Stack>
                                </Stack>
                                : document.title}

                        </Link>
                    </Stack>
                    <Stack direction="row" alignItems='center' spacing={1}>
                        {isCandidatePath &&
                            <>
                                {user.super &&
                                    <Chip variant='outlined' label="Super" size='small' color='secondary' />
                                }
                                <Chip variant='outlined' label={subscriptions} size='small' color='secondary' />
                                {!!data_share &&
                                    <IconButton onClick={() => share(data_share)} color="inherit" aria-label="share">
                                        <Tooltip title="Compartilhar">
                                            <ShareIcon />
                                        </Tooltip>
                                    </IconButton>
                                }
                                <IconButton onClick={() => setTimeout(window.print, 555)} color="inherit" aria-label="print">
                                    <PrintIcon />
                                </IconButton>
                            </>
                        }
                        {Boolean(pwa.supports && pwa.isInstalled !== 'standalone') &&
                            <IconButton onClick={() => pwa.install()} color="inherit" aria-label="install-pwa">
                                <Tooltip title="Instalar aplicativo">
                                    {ismobile ? <InstallMobileIcon /> : <InstallDesktopIcon />}
                                </Tooltip>
                            </IconButton>
                        }
                        {!user.token
                            ? <IconButton onClick={login} color="inherit" aria-label="do-login">
                                <Tooltip title="login">
                                    <LoginIcon />
                                </Tooltip>
                            </IconButton>
                            : <IconButton onClick={logout} color="inherit" aria-label="do-login">
                                <Tooltip title="logout">
                                    <LogoutIcon />
                                </Tooltip>
                            </IconButton>
                        }
                    </Stack>
                </Toolbar>
            </MuiAppBar>
        </HideOnScroll>
    </>
    );
};

export default React.memo(AppBar);