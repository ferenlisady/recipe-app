import { Box, Divider, Skeleton } from '@mui/material';

export function RecipeDetailSkeleton() {
    return (
      <>
        <Box className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-5">
          <Skeleton variant="rectangular" width="30%" height={150} sx={{ borderRadius: '8px' }} />
          <Box>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        </Box>
  
        <Divider />
  
        <Box className="my-2">
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
        </Box>
  
        <Divider />
  
        <Box className="my-2">
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width="100%" height={60} />
        </Box>
  
        <Divider />
  
        <Skeleton variant="text" width={150} height={30} />
      </>
    );
  }
  