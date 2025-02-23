import { Box, Typography, Container } from '@mui/material';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/pagination';
import RecipesList from '@/app/recipes/RecipeList'
import { getTotalItems } from '@/app/lib/data';
import { Suspense } from 'react';
import { AddRecipeButton } from '@/app/ui/buttons';
import Loading from '@/app/recipes/(overview)/loading';

export default async function RecipesPage(props: { searchParams?: Promise<{ query?: string; page?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalItems = await getTotalItems(query);

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" className="font-bold text-gray-800" sx={{ textAlign: 'center' }}>
        All Recipes
      </Typography>

      <Search
        placeholder="Search recipes by title or ingredients..."
        className="my-5"
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 5 }}>
        <AddRecipeButton />
      </Box>

      <Suspense fallback={<Loading />}>
        <RecipesList query={query} currentPage={currentPage} />
      </Suspense>

      <Box className="mt-6 flex justify-center">
        <Pagination totalItems={totalItems} />
      </Box>
    </Container>
  );
}