import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';

/**
 * @typedef {{
 *  button?: boolean
 *  actionArea?: boolean
 * }} Props
 * 
 * @type {React.FC<
 *  Partial<import('@mui/material/CardHeader').CardHeaderProps> & 
 *  Partial<import('@mui/material/CardActionArea').CardActionAreaProps> 
 *  & Props
 * >} 
 */

const CardPanel = ({ button, actionArea, children, ...props }) => {
    return (
        <Card variant="outlined" sx={{ display: 'block', width: '100%' }} >
            {button
                ? <CardActionArea><CardHeader sx={{ p:1, fontSize: '80%' }} {...props} /></CardActionArea>
                : props?.title && <CardHeader sx={{ p:1, fontSize: '80%' }} {...props} />}

            {actionArea ? <CardActionArea {...props}>{children}</CardActionArea> : children }
        </Card>
    )
}

export default CardPanel;