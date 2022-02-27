import React from 'react';
import Box from '@mui/material/Box';

/** @type { React.FC<import('@mui/material/Box').BoxProps & { show?: Boolean }> } */
const Div = ({ show = true, ...props }) => {

    if (show !== true) {
        return null
    }

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