import postgres from 'postgres';
import { Recipe } from '@/app/lib/definition';  
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 3;
      
export async function getFilteredRecipes(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const recipes = await sql<Recipe[]>`
      SELECT *
      FROM recipes
      WHERE title ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return recipes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes.');
  }
}

export async function getTotalItems(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM recipes
      WHERE title ILIKE ${`%${query}%`} 
    `;
    return Number(data[0].count);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of recipes.');
  }
}

export async function getRecipeById(id: string): Promise<{ id: string; user_id: string; title: string; description: string; ingredients: string[]; instructions: string; category: string; image_url: string | null; }> {
  try {
    const data = await sql`
      SELECT *
      FROM recipes
      WHERE id = ${id};
    `;
    return data[0] as { id: string; user_id: string; title: string; description: string; ingredients: string[]; instructions: string; category: string; image_url: string; }; 
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipe by ID.');
  }
}

export async function getCategories() {
  const result = await sql`
    SELECT unnest(enum_range(NULL::recipe_category)) AS category
  `;
  return result.map((row) => row.category);
}
