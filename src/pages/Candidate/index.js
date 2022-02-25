import React from 'react';
import x from './user';

import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Div, Container, StyledListItem} from '../../components';


const Candidate = () => {
    const [user, setUser] = React.useState(x);

    return (
        <Container className='test-blue' spacing={4} p={2}>
            <Grid item xs={12} md={3} className='test-blue'>
                <Div>
                    <Avatar
                        alt={user.name}
                        src={user.image}
                        sx={{ width: 106, height: 106 }}
                    />
                </Div>
                <List>
                    <StyledListItem
                        primary='Nome'
                        secondary={user.name}
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