'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateRecipe, State } from '@/app/lib/action';
import { useActionState } from 'react';
import { Typography, TextField, MenuItem, Select, Box, Button, Alert } from '@mui/material';

export default function UpdateRecipeForm({
  recipe,
  categories,
}: {
  recipe: {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    category: string;
    image_url: string | null;
  };
  categories: string[];
}) {
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    (prevState: State, formData: FormData) => updateRecipe(recipe.id, prevState, formData),
    initialState
  );

  useEffect(() => {
    if (state.message && state.message.includes('successfully')) {
      router.push('/recipes');
    }
  }, [state.message, router]);

  return (
    <form action={formAction} className="p-6 bg-white rounded-lg shadow">
      <Typography>Title</Typography>
      <TextField name="title" required fullWidth variant="outlined" margin="normal"
        defaultValue={recipe.title} error={!!state.errors?.title} />

      <Typography>Description</Typography>
      <TextField name="description" required fullWidth variant="outlined" multiline rows={4} margin="normal"
        defaultValue={recipe.description} error={!!state.errors?.description} />

      <Typography>Ingredients (comma-separated)</Typography>
      <TextField name="ingredients" required fullWidth variant="outlined" multiline rows={4} margin="normal"
        defaultValue={recipe.ingredients.join(', ')} error={!!state.errors?.ingredients} />

      <Typography>Instructions</Typography>
      <TextField name="instructions" required fullWidth variant="outlined" multiline rows={4} margin="normal"
        defaultValue={recipe.instructions} error={!!state.errors?.instructions} />

      <Typography>Category</Typography>
      <Select name="category" required fullWidth variant="outlined" defaultValue={recipe.category}
        error={!!state.errors?.category}>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </Select>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {image ? `Selected: ${image.name}` : recipe.image_url ? `Current: ${recipe.image_url}` : 'No image selected'}
        </Typography>
        <Button variant="contained" component="label">
          {image ? 'Change Image' : 'Upload Image'}
          <input type="file" accept="image/*" hidden name="image" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </Button>
      </Box>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Update Recipe
      </Button>

      {state.message && (
        <Alert severity={state.message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {state.message}
        </Alert>
      )}
    </form>
  );
}