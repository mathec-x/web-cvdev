import React from 'react';

import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Div, Container, StyledListItem } from '../../components';
import { useSocket } from 'socket.io-hook';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ListSubheader, Typography } from '@mui/material';

const Candidate = () => {

    const candidate = useSelector(state => state.candidate);
    const candidates = useSelector(state => state.candidates);

    const isMyCandidate = React.useMemo(() => {
        return candidates.findIndex(e => e.uuid === candidate.uuid) !== -1;

    }, [candidate, candidates])

    console.log({ candidate, candidates })

    const socket = useSocket();
    const params = useParams();

    React.useEffect(() => {
        socket.emit('subscribe', params.nick);
        return () => {
            socket.emit('unsubscribe', params.nick);
        }
    }, [socket, params]);

    return (
        <Container className='test-blue' spacing={4} p={2}>
            <Grid item xs={12} md={3} className='test-blue'>
                <Div show={isMyCandidate} p={0}>
                    <Typography>Meu Currículo</Typography>
                </Div>
                <Div>
                    <Avatar
                        alt={candidate.name}
                        src={candidate.image}
                        sx={{ width: 106, height: 106, mt: 2 }}
                    />
                </Div>
                <List dense>
                    <ListSubheader>Perfil</ListSubheader>
                    <StyledListItem button={isMyCandidate} divider primary='Nick' secondary={candidate.nick} />
                    <StyledListItem button={isMyCandidate} divider primary='Nome' secondary={candidate.name} />
                    <StyledListItem button={isMyCandidate} divider primary='Email' secondary={candidate.email} />
                </List>
            </Grid>
            <Grid item xs={12} md={9} className='test-red'>
                teste
            </Grid>
        </Container>
    )
}

export default Candidate;