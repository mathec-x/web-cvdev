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

    const candidate = useSelector(state => state.candidate);
    const candidates = useSelector(state => state.candidates);


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

    if (!candidate.nick) {
        return null;
    }

    return (
        <Container spacing={1} p={2}>
            <Grid item xs={12} md={2} sx={{ minHeight: '88vh' }}>
                <Perfil candidate={candidate} permission={isMyCandidate} />
            </Grid>
            <Grid item xs={12} md={2}>
                Mais opções
            </Grid>
            <Grid item xs={12} md={3}>
                <Skills candidate={candidate} permission={isMyCandidate} />
            </Grid>
            <Grid item xs={12} md={5}>
                <Jobs candidate={candidate} permission={isMyCandidate} />
            </Grid>
        </Container>
    )
}

export default PageCandidate;