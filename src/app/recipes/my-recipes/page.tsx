import { Suspense } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { Recipe } from '@/app/lib/definition';
import { getMyRecipes, getTotalItems, getFirstUser } from '@/app/lib/data';
import { AddRecipeButton } from '@/app/ui/buttons';
import Loading from '@/app/recipes/(overview)/loading';
import MyRecipeCard from '@/app/ui/myRecipeCard'; 

export default async function MyRecipesPage(props: { searchParams?: Promise<{ query?: string; page?: string; }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const user = await getFirstUser();
  if (!user) {
    return <Typography variant="h6">No users found.</Typography>;
  }

  const totalItems = await getTotalItems(query);

  const recipes: Recipe[] = await getMyRecipes(user.id, query, currentPage);

  return (
    <Container className="w-full">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="font-bold text-gray-800">
          {user.name}'s Recipes
        </Typography>
        <Search 
            placeholder="Search recipes by title or ingredients..." 
            className="mx-20"
        />
        <AddRecipeButton />
      </div>     

      <Suspense fallback={<Loading />}>
        <Grid container spacing={{ xs: 2, sm: 3, lg: 6 }}>
          {recipes.map((recipe: Recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <MyRecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      </Suspense>

      <div className="mt-6 flex justify-center">
        <Pagination totalItems={totalItems} />
      </div>
    </Container>
  );
}
