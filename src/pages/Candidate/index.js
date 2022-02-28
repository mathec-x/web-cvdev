import React from 'react';

import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Div, Container, StyledListItem } from '../../components';
import { useSocket } from 'socket.io-hook';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ListSubheader, Typography, IconButton, ListItemSecondaryAction } from '@mui/material';
import { AddCircleIcon } from '../../components/Icons';

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

    }, [socket, params.nick]);

    return (
        <Container spacing={4}>
            <Grid item xs={12} md={3} sx={{ minHeight: '95vh', borderRight: 'thin solid #eee' }}>
                <Div show={isMyCandidate}>
                    <Typography>Meu Currículo</Typography>
                </Div>
                <Div>
                    <Avatar
                        alt={candidate.name}
                        src={candidate.image}
                        sx={{ width: 106, height: 106, mt: 2 }}
                    />
                </Div>
                <List dense subheader={<ListSubheader><Typography>Perfil</Typography></ListSubheader>}>
                    <StyledListItem button={isMyCandidate} primary='Nick' secondary={candidate.nick} />
                    <StyledListItem button={isMyCandidate} primary='Nome' secondary={candidate.name} />
                    <StyledListItem button={isMyCandidate} primary='Email' secondary={candidate.email} />
                </List>
            </Grid>
            <Grid item xs={12} md={3} sx={{ minHeight: '95vh', borderRight: 'thin solid #eee' }}>
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

export default Candidate;