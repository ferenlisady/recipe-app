import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Navbar = async () => {
  return (
    <AppBar position="sticky" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 3 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>RecipeApp</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
