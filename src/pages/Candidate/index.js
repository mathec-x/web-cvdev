import React from 'react';

import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Div, Container, StyledListItem} from '../../components';
import { useSocket } from 'socket.io-hook';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Candidate = () => {

    const canditate = useSelector(state => state.candidate );
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
                <Div>
                    <Avatar
                        alt={canditate.name}
                        src={canditate.image}
                        sx={{ width: 106, height: 106 }}
                    />
                </Div>
                <List>
                    <StyledListItem
                        primary='Nome'
                        secondary={canditate.name}
                    />
                </List>
            </Grid>
            <Grid item xs={12} md={9} className='test-red'>
                teste
            </Grid>
        </Container>
    )
}

export default Candidate;