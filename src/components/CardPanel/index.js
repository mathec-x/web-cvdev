import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';

/**
 * @typedef {{
 *  button?: boolean
 * }} Props
 * 
 * @type {React.FC<import('@mui/material/CardHeader').CardHeaderProps & Props>} 
 */

const CardPanel = ({ button, children, ...props }) => {
    return (
        <Card variant="outlined" sx={{ display: 'block', width: '100%' }} >
            {button
                ? <CardActionArea><CardHeader sx={{ p: 1 }} {...props} /></CardActionArea>
                : <CardHeader sx={{ p: 1 }} {...props} />}
            {children}
        </Card>
    )
}

export default CardPanel;