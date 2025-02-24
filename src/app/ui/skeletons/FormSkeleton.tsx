import { Box, Typography, Skeleton, Button } from '@mui/material';

export function FormSkeleton () {
  return (
    <form className="p-6 bg-white rounded-lg shadow">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          <Skeleton width="40%" />
        </Typography>
        <Skeleton variant="text" width="100%" height={56} sx={{ mt: 1 }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          <Skeleton width="40%" />
        </Typography>
        <Skeleton variant="text" width="100%" height={56} sx={{ mt: 1 }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          <Skeleton width="40%" />
        </Typography>
        <Skeleton variant="text" width="100%" height={56} sx={{ mt: 1 }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          <Skeleton width="40%" />
        </Typography>
        <Skeleton variant="text" width="100%" height={56} sx={{ mt: 1 }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          <Skeleton width="40%" />
        </Typography>
        <Skeleton variant="text" width="100%" height={56} sx={{ mt: 1 }} />
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
        <Button variant="contained" disabled>
          <Skeleton variant="text" width="100%" />
        </Button>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Skeleton variant="rectangular" width="100%" height={40} />
      </Box>
    </form>
  );
};

