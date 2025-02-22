import AddRecipeForm from '@/app/ui/add-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Typography } from '@mui/material';
import { getCategories, getFirstUser } from '@/app/lib/data';

export default async function Page() {
  const user = await getFirstUser(); 
  const categories = await getCategories(); 

  if (!user) {
    return <Typography variant="h6">No users found.</Typography>;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'My Recipes', href: '/recipes/my-recipes' },
          { label: 'Add Recipe', href: '/recipes/add', active: true },
        ]}
      />
      <AddRecipeForm userId={user.id} categories={categories} />
    </main>
  );
}
