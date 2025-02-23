import AddRecipeForm from '@/app/ui/Add-form';
import Breadcrumbs from '@/app/ui/Breadcrumbs';
import { getCategories } from '@/app/lib/data';

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
      <AddRecipeForm categories={categories} />
    </main>
  );
}
