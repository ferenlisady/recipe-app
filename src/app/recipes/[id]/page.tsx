import { Suspense } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { getRecipeById, getUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Loading from '@/app/recipes/(overview)/loading';

export default async function RecipePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const recipePromise = getRecipeById(id);
  const recipe = await recipePromise;

  if (!recipe) {
    notFound();
  }

  const user = await getUserById(recipe.user_id);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Card className="mb-8 shadow-none">
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <CardMedia
              component="img"
              image={recipe.image_url || '/default-image.jpg'}
              alt={recipe.title}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 object-cover rounded-lg"
            />
            <div className="w-2/3">
              <Typography variant="h3" gutterBottom className="text-primary">
                {recipe.title}
              </Typography>
              <Typography variant="body1" paragraph className="text-gray-700">
                {recipe.description}
              </Typography>
            </div>
          </div>

          <Divider className="my-4" />

          <Suspense fallback={<Loading />}>
            <Typography variant="h5" className="font-semibold mb-2">Ingredients:</Typography>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </Suspense>

          <Divider className="my-4" />

          <Suspense fallback={<Loading />}>
            <Typography variant="h5" className="font-semibold mb-2">Instructions:</Typography>
            <Typography variant="body1" className="text-gray-700">
              {recipe.instructions}
            </Typography>
          </Suspense>

          <Divider className="my-4" />

          <Box className="mt-4">
            <Typography variant="body1" className="font-semibold">
              <strong>Category:</strong> {recipe.category}
            </Typography>
            <Typography variant="body1" className="font-semibold">
              <strong>Created By:</strong> {user}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </main>
  );
}
