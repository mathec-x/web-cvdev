import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InputField from 'react-mui-input-field';
import Emblem from '../../components/Emblem';
import { Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StackIconButton = ({ button, ...props }) => {
    return (
        <div style={{margin: '0 auto'}}>
            {!!button ? <IconButton {...props}  /> : props.children }
        </div>
    )
}

const Home = () => {
    const navigate = useNavigate()
    const { isLoading, login } = useAuth();
    const user = useSelector(state => state.user);
    const candidate = useSelector(state => state.candidate);

    const handleSearch = React.useCallback((value) => {
        navigate(`/candidate/${value}`);

    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Container
                justifyContent="center"
                alignItems="center"
                height="100%"
                minHeight="calc(100vh - 64px)"
                sx={{
                    '@media (min-device-width: 933px)': {
                        backgroundImage: 'url(/assets/background.png)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }
                }}
            >
                <Grid item xs={10} sm={6} lg={4} p={4} boxShadow={4} bgcolor="background.paper">
                    <Emblem mb={4} />
                    <Stack mb={6}>
                        <StackIconButton
                            button={!!candidate?.image}
                            onClick={() => handleSearch(candidate.nick)}
                        >
                            <Avatar
                                src={!!candidate?.image ? candidate.image : '/icons/maskable_icon_x192.png'}
                                alt='home'
                                sx={{
                                    bgcolor: 'primary.main',
                                    width: 160,
                                    height: 160,
                                    boxShadow: 10,
                                    m: 'auto'
                                }}
                            />
                        </StackIconButton>
                    </Stack>
                    <Stack mb={1}>
                        <InputField
                            value={candidate?.nick||'@'}
                            allowNull
                            fullWidth
                            match={/@/}
                            transform={x => x.startsWith('@') ? x : `@${x}`}
                            type="text"
                            autoComplete='off'
                            label="Nickname"
                            variant='standard'
                            placeholder='localizar um perfil...'
                            errorText="Usuários públicos inicia com @"
                            helperText="Encontre pelo nickname aqui ..."
                            onSubmit={handleSearch}
                        />
                    </Stack>
                    <Stack width="auto">
                        {!user.token && <Button sx={{ ml: 'auto' }} disabled={isLoading} onClick={login}>Criar o meu</Button>}
                    </Stack>
                </Grid>
            </Container>
        </>
    )
}

export default Home;