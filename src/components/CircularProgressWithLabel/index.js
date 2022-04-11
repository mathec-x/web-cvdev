import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ placeContent: "center", width: "100%", position: 'relative', boxSizing: 'border-box', display: 'inline-flex' }}>
      <CircularProgress
        {...props}
        role="presentation"
        variant="determinate"
        value={props.value > 99 ? 99 : props.value}
        size={60}
      // sx={{ strokeLinecap: 'round' }} 
      />
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
            {props.children}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}