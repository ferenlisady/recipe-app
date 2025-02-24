import AddRecipeForm from '@/app/ui/forms/Add-form';
import Breadcrumbs from '@/app/ui/Breadcrumbs';
import { getCategories } from '@/app/lib/data';
import { FormSkeleton } from '@/app/ui/skeletons/FormSkeleton';
import { Suspense } from 'react';

export default async function Page() {
  const categories = await getCategories(); 

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Recipes', href: '/recipes' },
          { label: 'Add Recipe', href: '/recipes/add', active: true },
        ]}
      />
      <Suspense fallback={<FormSkeleton />}>
        <AddRecipeForm categories={categories} />
      </Suspense>
    </main>
  );
}
