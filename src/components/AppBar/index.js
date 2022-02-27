import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { usePwa } from 'react-pwa-app';
import { useNavigate } from 'react-router-dom';
import Vertical from '../Vertical';
import HideOnScroll from '../HideOnScroll';
import useMobileDetection from '../../hooks/useMobileDetection';
import { AccountCircleIcon, InstallDesktopIcon, InstallMobileIcon, MenuIcon } from '../Icons';
import { useSelector } from 'react-redux';
import User from '../../services/User';

const AppBar = () => {
    const pwa = usePwa();
    const navigate = useNavigate();
    const ismobile = useMobileDetection();
    const user = useSelector(state => state.user);

    const handleLogin = () => {
        window.Prompt("Cadastre ou acesse o sistema aqui", [
            { label: 'Email', name: 'login' },
            { label: 'Senha', name: 'password', type: 'password' }
        ])
        .then(async (data) => {
            const response = await User.login(data);
            if(!response.ok){
                return window.Alert('Falha ao autenticar')
            } else {
                navigate({hash: 'menu'})
            }
        })
        .catch(() => console.log('Cancel login'))
    }

    return (
        <HideOnScroll>
            <MuiAppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Stack direction="row" minWidth={200} alignItems={"center"} spacing={2}>
                        <IconButton onClick={() => navigate({ hash: 'menu' })} edge="start" color="inherit" aria-label="close">
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" divider={<Vertical />}>
                        {Boolean(pwa.supports && pwa.isInstalled !== 'standalone') &&
                            <IconButton onClick={() => pwa.install()} color="inherit" aria-label="install-pwa">
                                {ismobile ? <InstallMobileIcon /> : <InstallDesktopIcon />}
                            </IconButton>
                        }
                        {!!user.token
                            ? <IconButton onClick={handleLogin} color="inherit" aria-label="do-login"><AccountCircleIcon /></IconButton>
                            : <Button onClick={handleLogin} color="inherit" aria-label="do-login">Login/Cadastro</Button>
                        }
                    </Stack>
                </Toolbar>
            </MuiAppBar>
        </HideOnScroll>
    );
};

export default AppBar;