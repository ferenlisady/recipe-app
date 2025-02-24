import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Recipe } from '@/app/lib/definition';  
import { ViewRecipeButton, UpdateRecipeButton, DeleteRecipeButton } from '@/app/ui/Buttons';

interface RecipeCardProps {
  recipe: Recipe;  
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 400, boxShadow: 3 }} key={recipe.id}>
      <CardMedia component="img" sx={{ height: { xs: 150, sm: 200, md: 250, lg: 300 }, objectFit: 'cover', width: '100%' }} image={recipe.image_url || '/assets/default-image.jpg'} alt={recipe.title} />
      <CardContent>
        <Typography variant="h6" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {recipe.description.length > 40 ? `${recipe.description.slice(0, 40)}...` : recipe.description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, p: 2 }}>
        <ViewRecipeButton id={recipe.id} />
        <UpdateRecipeButton id={recipe.id} />
        <DeleteRecipeButton id={recipe.id} />
      </Box>
    </Card>
  );
};

export default RecipeCard;