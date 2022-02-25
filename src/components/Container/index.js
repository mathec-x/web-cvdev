import React from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

/** @type { React.FC<import('@mui/material/Grid').GridProps> } */
const Container = (props) => {
    const theme = useTheme();
    
    const minHeight = React.useMemo(() => {
        const toolbar = theme.mixins.toolbar.minHeight;
        const spacing = theme.spacing(Number(props?.spacing || 0));
        
        return `calc(${window.innerHeight}px - ${parseInt(spacing) + toolbar}px)`;
        
    }, [theme, props.spacing])
    
    return (
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            width="auto"
            height="auto"
            boxSizing="border-box"
            minHeight={{md:minHeight}}
            {...props}
        />
    )
}

export default React.memo(Container);