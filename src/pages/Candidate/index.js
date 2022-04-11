import React from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '../../components';
import { useSocket } from 'socket.io-hook';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Perfil from './perfil';
import Skills from './skills';
import Jobs from './jobs';

const PageCandidate = () => {
    const user = useSelector(state => state.user);
    const candidate = useSelector(state => state.candidate);
    const candidates = useSelector(state => state.candidates);

    const isMyCandidate = React.useMemo(() => {
        return candidates.findIndex(e => e.uuid === candidate.uuid) !== -1;

    }, [candidate, candidates])

    const socket = useSocket();
    const params = useParams();

    React.useEffect(() => {
        document.title = `${params.nick} - web cvdev`;
        socket.emit('subscribe', params.nick);
        return () => {
            socket.emit('unsubscribe', params.nick);
        }
    }, [socket, params.nick]);

    if (!candidate.nick) {
        return null;
    }

    return (
        <Container spacing={1} p={1} alignContent="flex-start">
            <Grid item xs={12} md={3}>
                <Perfil candidate={candidate} permission={isMyCandidate} />
            </Grid>
            <Grid item xs={12} md={9} sx={{ minHeight: '60vh' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Skills candidate={candidate} permission={isMyCandidate} user={user} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Jobs candidate={candidate} permission={isMyCandidate} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PageCandidate;
