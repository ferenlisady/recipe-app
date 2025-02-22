import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getCategories, getFirstUser, getRecipeById  } from '@/app/lib/data';
import EditRecipeForm from '@/app/ui/update-form';
import { Typography } from '@mui/material';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const user = await getFirstUser(); 
  const categories = await getCategories(); 
  const recipe = await getRecipeById(id);

  if (!user) {
    return <Typography variant="h6">No users found.</Typography>;
  }

  if (!recipe) {
    return <Typography variant="h6">Recipe not found.</Typography>;
  }

  return (
    <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'My Recipes', href: '/recipes/my-recipes' },
              { label: 'Update Recipe', href: `/recipes/${id}/update`, active: true },
            ]}
          />
          <EditRecipeForm userId={user.id} recipe={recipe} categories={categories} />
        </main>
  );
}
