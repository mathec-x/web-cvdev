import React from 'react';
import Helmet from 'react-helmet';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import InputField from 'react-mui-input-field';
import Button from '@mui/material/Button';
import Container from '../../components/Container';
import Emblem from '../../components/Emblem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Candidate from '../../services/Candidate';
import StackIconButton from '../../components/StackIconButton';

const Home = () => {
    const navigate = useNavigate()
    const [exists, setExists] = React.useState(true);

    const candidate = useSelector(state => state.candidate);

    const handleSubmit = React.useCallback(async (value) => {

        const res = await Candidate.search({ nick: value });

        if (res.status === 200) {
            setExists(true);
            return navigate(`/candidate/${value}`);
        }

        return setExists(false)
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
                            onClick={() => handleSubmit(candidate.nick)}
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
                            fullWidth
                            value={candidate?.nick || '@'}
                            error={!exists}
                            onFocus={(e) => e.target.select()}
                            transform={x => x.startsWith('@') ? x : `@${x}`}
                            type="text"
                            autoComplete='off'
                            label="Nickname"
                            variant='standard'
                            placeholder='Encontre pelo nickname aqui'
                            errorText="Perfil não localizado"
                            helperText={exists ? "Localizar um perfil pelo nickname" : "Perfil não localizado"}
                            onSubmit={handleSubmit}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="space-around" mt={4}>
                        <Button
                            onClick={() => navigate('/candidate/@joanadoe')}>
                            Ver Exemplo
                        </Button>
                        <Button
                            variant='contained'
                            onClick={() => navigate('/register')}>
                            Criar o meu
                        </Button>
                    </Stack>
                </Grid>
            </Container>
        </>
    )
}

export default Home;