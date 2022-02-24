import React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const Vertical = styled((props) => (<Divider flexItem orientation="vertical" {...props} />))(
    ({ theme }) => ({
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    }));

export default Vertical;