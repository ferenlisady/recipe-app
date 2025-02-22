'use client';

import { createRecipe, State } from '@/app/lib/action';
import { useActionState, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, TextField, MenuItem, Select, Box, Button, Alert, CircularProgress } from '@mui/material';

export default function AddRecipeForm({ userId, categories }: { userId: string; categories: string[] }) {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createRecipe, initialState);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', ingredients.join(','));
    formData.append('instructions', instructions);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', '');
    }

    startTransition(async () => {
        await formAction(formData);

        if (state.message && state.message.includes('successfully')) {
          router.push('/recipes/my-recipes');
        }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow">
      <Typography>Title</Typography>
      <TextField name="title" required fullWidth variant="outlined" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} error={!!state.errors?.title} helperText={state.errors?.title?.join(', ')} />

      <Typography>Description</Typography>
      <TextField
        name="description"
        required
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!state.errors?.description}
        helperText={state.errors?.description?.join(', ')}
      />

      <Typography>Ingredients</Typography>
      <TextField
        name="ingredients"
        required
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        margin="normal"
        value={ingredients.join(', ')}
        onChange={(e) => setIngredients(e.target.value.split(',').map(item => item.trim()))}
        error={!!state.errors?.ingredients}
        helperText={state.errors?.ingredients?.join(', ')}
      />

      <Typography>Instructions</Typography>
      <TextField
        name="instructions"
        required
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        margin="normal"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        error={!!state.errors?.instructions}
        helperText={state.errors?.instructions?.join(', ')}
      />

      <Typography>Category</Typography>
      <Select
        name="category"
        required
        fullWidth
        variant="outlined"
        value={category || ''}
        onChange={(e) => setCategory(e.target.value)}
        error={!!state.errors?.category}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
            {image ? `Selected: ${image.name}` : 'No image selected'}
        </Typography>
        <Button variant="contained" component="label">
            {image ? 'Change Image' : 'Upload Image'}
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
        </Button>
    </Box>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={state.message === 'Submitting...'}>
        {state.message === 'Submitting...' ? <CircularProgress size={24} color="inherit" /> : 'Add Recipe'}
      </Button>

      {state.message && <Alert severity={state.message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>{state.message}</Alert>}
    </form>
  );
}
