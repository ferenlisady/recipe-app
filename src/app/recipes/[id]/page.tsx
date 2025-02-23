import { Suspense } from 'react';
import { Card, CardContent, } from '@mui/material';
import RecipeDetails from '@/app/ui/RecipeDetails';
import Loading from '@/app/recipes/(overview)/loading';

export default async function RecipePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Card className="mb-8 shadow-none">
        <CardContent className="my-5 mx-5">
          <Suspense fallback={<Loading />}>
            <RecipeDetails id={id} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}