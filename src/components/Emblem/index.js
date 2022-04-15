import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * @param {import('@mui/material').BoxProps} props 
 */
export default function Emblem(props) {
    return (
        <Box textAlign="left" {...props}>
            <Typography
                variant='h2'
                fontSize={15}
                letterSpacing={-3}
            >{'WEB'}</Typography>
            <Typography
                variant='h1'
                fontWeight={600}
                fontSize={28}
                letterSpacing={-1}
            >{'CVDEV'}</Typography>
            <Typography
                variant='h2'
                fontSize={18}
                fontStyle="initial"
                letterSpacing={-2}
            >{'de dev pra dev'}</Typography>
        </Box>
    )
}