import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Container maxWidth="lg" color="primary">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"   
        py={3}                   
      >
        <Typography variant="body2" color="text.secondary">
          &copy; 2025 My Recipe App. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  );
}
