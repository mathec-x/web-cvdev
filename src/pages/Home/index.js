import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import InputField from 'react-mui-input-field';
import Emblem from '../../components/Emblem';
import { Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const { isLoading, login } = useAuth();
    const user = useSelector(state => state.user);

    const handleSearch = React.useCallback((value) => {
        navigate(`/candidate/${value}`);

    }, []);

    return (
        <>
            <Helmet>
                <title>Home - web cvdev</title>
            </Helmet>
            <Container
                justifyContent="center"
                alignItems="center"
                minHeight="calc(100vh - 74px)"
            >
                <Grid item xs={10} md={4} p={4} boxShadow={4} bgcolor="background.paper">
                    <Emblem mb={8} />
                    <Stack mb={10}>
                        <Avatar
                            src='/icons/favicon-96x96.png'
                            sx={{
                                bgcolor: 'primary.main',
                                width: 160,
                                height: 160,
                                boxShadow: 10,
                                p: 4,
                                m: 'auto'
                            }}
                        />
                    </Stack>
                    <Stack mb={1}>
                        <InputField
                            allowNull
                            fullWidth
                            match={/@/}
                            transform={x => x.startsWith('@') ? x : `@${x}` }
                            type="text"
                            autoComplete='off'
                            label="Nickname"
                            variant='standard'
                            placeholder='localizar um perfil...'
                            errorText="Usuários públicos inicia com @"
                            helperText="Pesquisa feita por um usuário"
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