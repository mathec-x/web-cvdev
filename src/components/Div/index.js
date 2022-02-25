import React from 'react';
import Box from '@mui/material/Box';

/** @type { React.FC<import('@mui/material/Box').BoxProps> } */
const Div = (props) => {
    return (
        <Box    
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            {...props}
        />
    )
}

export default Div;