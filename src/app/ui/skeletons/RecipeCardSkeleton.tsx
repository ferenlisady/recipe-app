import { Card, CardContent, CardMedia, Box, Skeleton } from '@mui/material';

export function RecipeCardSkeleton () {
  return (
    <Card sx={{ maxWidth: 400, boxShadow: 3 }}>
      <CardMedia>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </CardMedia>
      <CardContent>
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="text" width="60%" height={20} sx={{ marginTop: 1 }} />
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, p: 2 }}>
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </Box>
    </Card>
  );
};

