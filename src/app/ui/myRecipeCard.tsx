import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Recipe } from '@/app/lib/definition';  
import { UpdateRecipeButton, DeleteRecipeButton } from '@/app/ui/buttons';

interface RecipeCardProps {
  recipe: Recipe;  
}

const MyRecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 400, boxShadow: 3 }} key={recipe.id}>
      <CardMedia
        component="img"
        sx={{
          height: {
            xs: 150,
            sm: 200,
            md: 250,
            lg: 300,
          },
          objectFit: 'cover',
          width: '100%',
        }}
        image={recipe.image_url || '/assets/default-image.jpg'}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {recipe.description.slice(0, 100)}...
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, p: 2 }}>
        <Button variant="contained" color="primary" href={`/recipes/${recipe.id}`}>
          View
        </Button>
        <UpdateRecipeButton id={recipe.id} />
        <DeleteRecipeButton id={recipe.id} />
      </Box>
    </Card>
  );
};

export default MyRecipeCard;
