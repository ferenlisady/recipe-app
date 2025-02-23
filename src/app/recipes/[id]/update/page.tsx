import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getCategories, getRecipeById  } from '@/app/lib/data';
import EditRecipeForm from '@/app/ui/update-form';
import { Typography } from '@mui/material';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const categories = await getCategories(); 
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return <Typography variant="h6">Recipe not found.</Typography>;
  }

  return (
    <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Recipes', href: '/recipes' },
              { label: 'Update Recipe', href: `/recipes/${id}/update`, active: true },
            ]}
          />
          <EditRecipeForm recipe={recipe} categories={categories} />
        </main>
  );
}
