import React from 'react';

import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { Div, Container } from '../../components';
import { useSocket } from 'socket.io-hook';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ListSubheader, IconButton, ListItemSecondaryAction } from '@mui/material';
import { AddCircleIcon } from '../../components/Icons';
import Perfil from './perfil';


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

    return (
        <Container spacing={2} p={2}>
            <Grid item xs={12} md={3} sx={{ minHeight: '88vh', borderRight: 'thin solid #eee' }}>
                <Perfil candidate={candidate} permission={isMyCandidate} />
            </Grid>
            <Grid item xs={12} md={3} sx={{ borderRight: 'thin solid #eee' }}>
                <List dense subheader={(
                    <ListSubheader>
                        Skills
                        <ListItemSecondaryAction>
                            <Div show={isMyCandidate}>
                                <IconButton>
                                    <AddCircleIcon color="primary" fontSize='large' />
                                </IconButton>
                            </Div>
                        </ListItemSecondaryAction>
                    </ListSubheader>
                )}>
                </List>
            </Grid>
            <Grid item xs={12} md={6}>
                <List dense>
                    <ListSubheader>
                        Skills
                    </ListSubheader>
                </List>
            </Grid>
        </Container>
    )
}

export default PageCandidate;