import { Suspense } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import RecipeCard from '@/app/ui/recipeCard';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { getFilteredRecipes,  getTotalItems } from '@/app/lib/data';
import Loading from '@/app/recipes/(overview)/loading';

export default async function RecipesPage(props: { searchParams?: Promise<{ query?: string; page?: string; }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const recipesPromise = getFilteredRecipes(query, currentPage);
  const recipes = await recipesPromise;

  const totalItems = await getTotalItems(query);
  
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" className="font-bold text-gray-800" sx={{textAlign: 'center'}}>
        All Recipes
      </Typography>

      <Search 
          placeholder="Search recipes by title or ingredients..." 
          className="my-5"
      />

      <Suspense fallback={<Loading />}>
        <Grid container spacing={{ xs: 2, sm: 3, lg: 6 }}>
          {recipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RecipeCard recipe={recipe} />
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
