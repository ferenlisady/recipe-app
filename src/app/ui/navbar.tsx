import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { getFirstUser } from '@/app/lib/data';

const Navbar = async () => {
  const user = await getFirstUser();

  return (
    <AppBar position="sticky" color="primary" className="shadow-md">
      <Toolbar className="flex justify-between items-center px-6">
        <Typography variant="h6" component="div" className="font-bold text-white">
          <Link href="/">RecipeApp</Link>
        </Typography>

        <div className="flex gap-6 items-center">
          <Link href="/recipes" passHref>
            <Button color="inherit">All Recipes</Button>
          </Link>
          <Link href="/recipes/my-recipes" passHref>
            <Button color="inherit">My Recipes</Button>
          </Link>

          {user ? (
            <Typography variant="body1" className="text-white">
              Welcome, {user.name}
            </Typography>
          ) : (
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
