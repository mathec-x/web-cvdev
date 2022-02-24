import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function AppLoading() {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(true);

    return () => {
      setOpen(false);
    };
  }, [open]);

  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}