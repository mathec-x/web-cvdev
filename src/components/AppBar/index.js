import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { usePwa } from 'react-pwa-app';
import { useNavigate } from 'react-router-dom';
import Vertical from '../Vertical';
import HideOnScroll from '../HideOnScroll';
import useMobileDetection from '../../hooks/useMobileDetection';
import { InstallDesktopIcon, InstallMobileIcon, LoginIcon, LogoutIcon, MenuIcon } from '../Icons';
import { connect } from 'react-redux';
import AppLoading from '../AppLoading';
import useAuth from '../../hooks/useAuth';

/**
 * @typedef {import('@types/web/models').User} User
 * @typedef {import('@types/web/models').Candidate} Candidate
 */

/**
 * 
 * @param {{user:User, candidate: Candidate}} props 
 */
const AppBar = ({ user, candidate }) => {
    const pwa = usePwa();
    const navigate = useNavigate();
    const ismobile = useMobileDetection();

    const { isLoading, login, logout} = useAuth();

    return (<>
        {!!isLoading && <AppLoading />}
        <HideOnScroll>
            <MuiAppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Stack direction="row" minWidth={100} alignItems={"center"} spacing={2}>
                        <IconButton onClick={() => navigate({ hash: 'menu' })} edge="start" color="inherit" aria-label="close">
                            <MenuIcon />
                        </IconButton>
                        {document.title}
                    </Stack>
                    <Stack direction="row" divider={<Vertical />}>
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

export default connect(({ user, candidate }) => ({ user, candidate }))(AppBar);