import { Grid } from '@mui/material';
import { Recipe } from '@/app/lib/definition';
import RecipeCard from '@/app/ui/RecipeCard';
import { Suspense, use } from 'react';
import { getFilteredRecipes } from '@/app/lib/data';
import Loading from '@/app/recipes/(overview)/loading';

function RecipesList({ query, currentPage }: { query: string; currentPage: number }) {
  const recipes = use(getFilteredRecipes(query, currentPage)); 

  return (
    <Grid container spacing={{ xs: 2, sm: 3, lg: 6 }}>
      {recipes.map((recipe: Recipe, index: number) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function RecipesPage({ query, currentPage }: { query: string; currentPage: number }) {
  return (
    <Suspense fallback={<Loading />}>
      <RecipesList query={query} currentPage={currentPage} />
    </Suspense>
  );
}
