import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';

/**
 * @typedef {{
 *  button?: boolean
 *  actionArea?: boolean
 *  variant?: "elevation" | "outlined"
 *  fill?: boolean
 *  padding?: number
 *  cardProps: import('@mui/material/Card').CardProps
 * }} Props
 * 
 * @type {React.FC<
 *  Partial<import('@mui/material/CardHeader').CardHeaderProps> & 
 *  Partial<import('@mui/material/CardActionArea').CardActionAreaProps> 
 *  & Props
 * >} 
 */

const CardPanel = ({ variant = 'elevation', button, actionArea, children, padding, fill = true, cardProps, ...props }) => {
    return (
        <Card
            className="CardPanel"
            variant={variant}
            sx={{
                p: padding,
                display: 'block',
                width: '100%',
                minHeight: fill && {
                    md: 'calc(100vh - 84px)'
                }
            }}
            {...cardProps}
        >
            {button
                ? <CardActionArea><CardHeader sx={{ p: 1, fontSize: '80%' }} {...props} /></CardActionArea>
                : props?.title && <CardHeader sx={{ p: 1, fontSize: '80%' }} {...props} />}

            {actionArea ? <CardActionArea {...props}>{children}</CardActionArea> : children}
        </Card>
    )
}

export default CardPanel;