import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { usePwa } from 'react-pwa-app';
import { useNavigate } from 'react-router-dom';
import Vertical from '../Vertical';
import HideOnScroll from '../HideOnScroll';
import useMobileDetection from '../../hooks/useMobileDetection';
import { InstallDesktopIcon, InstallMobileIcon, MenuIcon } from '../Icons';

const AppBar = () => {
    const pwa = usePwa();
    const navigate = useNavigate();
    const ismobile = useMobileDetection();

    return (
        <HideOnScroll>
            <MuiAppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Stack direction="row" minWidth={200} alignItems={"center"} spacing={2}>
                        <IconButton onClick={() => navigate({hash: 'menu'})} edge="start" color="inherit" aria-label="close">
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" divider={<Vertical />}>
                        {Boolean(pwa.supports && pwa.isInstalled !== 'standalone') &&
                            <IconButton onClick={pwa.install} color="inherit" aria-label="install-pwa">
                                {ismobile ? <InstallMobileIcon /> : <InstallDesktopIcon /> }
                            </IconButton>
                        }
                    </Stack>
                </Toolbar>
            </MuiAppBar>
        </HideOnScroll>
    );
};

export default AppBar;