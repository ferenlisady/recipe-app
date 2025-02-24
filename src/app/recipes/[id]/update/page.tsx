import Breadcrumbs from '@/app/ui/Breadcrumbs';
import { getCategories, getRecipeById  } from '@/app/lib/data';
import EditRecipeForm from '@/app/ui/forms/Update-form';
import { Typography } from '@mui/material';
import { FormSkeleton } from '@/app/ui/skeletons/FormSkeleton';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
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
        <Suspense fallback={<FormSkeleton />}>
            <EditRecipeForm recipe={recipe} categories={categories} />
        </Suspense>
        </main>
  );
}
