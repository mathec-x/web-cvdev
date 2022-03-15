import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ placeContent: "center", width: "100%", position: 'relative', boxSizing: 'border-box', display: 'inline-flex' }}>
        <CircularProgress role="presentation" variant="determinate" {...props} size={65} sx={{ strokeLinecap: 'round' }} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box textAlign={'center'}>
            <Typography variant="subtitle2" component="div" fontSize={11} color="text.primary">
              {props.label}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }