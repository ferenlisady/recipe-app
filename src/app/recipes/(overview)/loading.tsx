import { Box, CircularProgress } from '@mui/material';

const Loading = () => (
  <Box className="flex justify-center items-center w-full h-full">
    <CircularProgress color="primary" />
  </Box>
);

export default Loading;
