import { Box, Typography, CardMedia, Divider } from '@mui/material';
import { getRecipeById } from '@/app/lib/data';

async function RecipeDetails({ id }: { id: string }) {
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return <Typography variant="h3" gutterBottom className="text-primary">Not Found</Typography>;
  }

  return (
    <>
      <Box className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-5">
        <CardMedia component="img" image={recipe.image_url || '/default-image.jpg'} alt={recipe.title} sx={{ width: '30%', sm: { width: '30%' }, md: { width: '20%' }, objectFit: 'cover', borderRadius: '8px' }} />
        <Box>
          <Typography variant="h3" gutterBottom className="text-primary">
            {recipe.title}
          </Typography>
          <Typography variant="body1" paragraph className="text-gray-700">
            {recipe.description}
          </Typography>
        </Box>
      </Box>

      <Divider />
        <Box className="my-2">
          <Typography variant="h5" className="font-semibold">Ingredients:</Typography>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </Box>

      <Divider />
        <Box className="my-2">
          <Typography variant="h5" className="font-semibold">Instructions:</Typography>
          <Typography variant="body1" className="text-gray-700">
            {recipe.instructions}
          </Typography>
        </Box>

      <Divider />
      <Typography variant="h5" className="font-semibold">Category: {recipe.category}</Typography>

    </>
  );
}

export default RecipeDetails;
