import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { ArrowBackIcon } from '../../components/Icons';
import { Container } from '../../components';

const NotFound = ({params}) => {
    const navigate = useNavigate();

    return (
        <Container
            justifyContent="center"
            alignItems="center"
            minHeight="calc(100vh - 74px)"
        >
            <Grid item xs={10} lg={4} p={4} boxShadow={4} bgcolor="background.paper">
                <Grid container spacing={1}>
                    <Box p={1} display="flex">
                        <Avatar sx={{ ml: 1, mr: 3, mt: 1 }}>
                            <IconButton color='secondary' onClick={() => navigate('/home')}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Avatar>
                        <div>
                            <Typography variant='subtitle1'>{params.nick}</Typography>
                            <Typography variant='subtitle2'>Não foi localizado</Typography>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    )
};

export default NotFound;