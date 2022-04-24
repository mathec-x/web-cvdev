import React from 'react';
import IconButton from '@mui/material/IconButton';
const StackIconButton = ({ button, ...props }) => {
    return (
        <div style={{ margin: '0 auto' }}>
            {!!button ? <IconButton {...props} /> : props.children}
        </div>
    )
}

export default StackIconButton;