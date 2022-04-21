import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSocket } from 'socket.io-hook';
import { Container } from '../../components';
import Perfil from './perfil';
import Skills from './skills';
import Jobs from './jobs';
import Grid from '@mui/material/Grid';
import Education from './Education';
import Language from './language';
import Skeleton from './skeleton';
import NotFound from './notfound';

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
        socket.emit('subscribe', params.nick);

        return () => {
            socket.emit('unsubscribe', params.nick);
        }
    }, [socket, params.nick, user]);


    if (!candidate?.nick && !candidate?.notFound) {
        return <Skeleton />
    }

    if (candidate?.notFound) {
        return <NotFound params={params} />
    }

    return (
        <>
            <Helmet>
                <title>{params.nick}</title>
            </Helmet>
            <Container spacing={1} p={1} alignContent="flex-start">
                <Grid item xs={12} sm={4} lg={3}>
                    <Perfil candidate={candidate} permission={isMyCandidate} />
                </Grid>
                <Grid item xs={12} sm={8} lg={9} sx={{ minHeight: '60vh' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={12} position="relative">
                            <Skills candidate={candidate} permission={isMyCandidate} user={user} />
                        </Grid>
                        <Grid item xs={12} lg={6} position="relative">
                            <Language candidate={candidate} permission={isMyCandidate} user={user} />
                            <Education candidate={candidate} permission={isMyCandidate} user={user} />
                        </Grid>
                        <Grid item xs={12} lg={6} position="relative" m={0}>
                            <div className='pagebreak' />
                            <Jobs candidate={candidate} permission={isMyCandidate} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default PageCandidate;
