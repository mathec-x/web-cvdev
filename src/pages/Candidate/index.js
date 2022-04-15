import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from 'socket.io-hook';
import { Container } from '../../components';
import Perfil from './perfil';
import Skills from './skills';
import Jobs from './jobs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { ArrowBackIcon } from '../../components/Icons';

const PageCandidate = () => {
    const user = useSelector(state => state.user);

    const candidate = useSelector(state => state.candidate);
    const candidates = useSelector(state => state.candidates);
    const navigate = useNavigate();
    
    const isMyCandidate = React.useMemo(() => {
        return candidates.findIndex(e => e.uuid === candidate.uuid) !== -1;

    }, [candidate, candidates])

    const socket = useSocket();
    const params = useParams();

    React.useEffect(() => {
        socket.emit('subscribe', params.nick);
        return () => {
            socket.emit('unsubscribe', params.nick);
        }
    }, [socket, params.nick]);

    if (!candidate?.nick) {
        return (
            <Container
                justifyContent="center"
                alignItems="center"
                minHeight="calc(100vh - 74px)"
            >
                <Grid item xs={10} lg={4} p={4} boxShadow={4} bgcolor="background.paper">
                    <Grid container spacing={1}>
                        <Box p={1} display="flex">
                            <Avatar sx={{ml:1, mr:3, mt:1 }}>
                                <IconButton color='secondary' onClick={() => navigate('/')}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Avatar>
                            <Typography variant='subtitle1'>{params.nick}
                                <Typography variant='subtitle2'>Não foi localizado</Typography>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        )
    }

    return (
        <>
            <Helmet>
                <title>{params.nick}</title>
            </Helmet>
            <Container spacing={1} p={1} alignContent="flex-start">
                <Grid item xs={12} md={4} lg={3}>
                    <Perfil candidate={candidate} permission={isMyCandidate} />
                </Grid>
                <Grid item xs={12} md={8} lg={9} sx={{ minHeight: '60vh' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={6}>
                            <Skills candidate={candidate} permission={isMyCandidate} user={user} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Jobs candidate={candidate} permission={isMyCandidate} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default PageCandidate;
