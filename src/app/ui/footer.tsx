import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#1565c0',
        color: 'white',
        py: 3,
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container>
        <Typography variant="body1" align="center">
          &copy; 2025 Recipe App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
