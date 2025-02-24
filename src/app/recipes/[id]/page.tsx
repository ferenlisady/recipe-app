import { Suspense } from 'react';
import { Card, CardContent } from '@mui/material';
import RecipeDetails from '@/app/ui/recipes/RecipeDetails';
import Breadcrumbs from '@/app/ui/Breadcrumbs';
import { RecipeDetailSkeleton } from '@/app/ui/skeletons/RecipeDetailSkeleton';
import { getRecipeById } from '@/app/lib/data';
import  Loading  from '@/app/ui/skeletons/Loading'

export default function RecipePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <RecipeBreadcrumbs id={id} />
      </Suspense>
      <Card className="mb-8 shadow-none">
        <CardContent className="my-5 mx-5">
          <Suspense fallback={<RecipeDetailSkeleton />}>
            <RecipeDetails id={id} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}

async function RecipeBreadcrumbs({ id }: { id: string }) {
  const recipe = await getRecipeById(id);
  return (
    <Breadcrumbs
      breadcrumbs={[
        { label: 'Recipes', href: '/recipes' },
        { label: recipe.title, href: `/recipes/${id}`, active: true },
      ]}
    />
  );
}
