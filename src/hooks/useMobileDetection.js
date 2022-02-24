import useMediaQuery from '@mui/material/useMediaQuery';

const useMobileDetection = () => {
  const matched = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return matched;
};

export default useMobileDetection;
