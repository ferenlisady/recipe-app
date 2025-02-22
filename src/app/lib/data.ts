import postgres from 'postgres';
import { Recipe } from '@/app/lib/definition';  
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 6;
      
export async function getFilteredRecipes(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const recipes = await sql<Recipe[]>`
      SELECT *
      FROM recipes
      WHERE 
        title ILIKE ${`%${query}%`}
      ORDER BY created_at DESC
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
      WHERE 
        title ILIKE ${`%${query}%`} 
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

// need modification
export async function getUserById(userId: string): Promise<string | null> {
  try {
    const user = await sql`
      SELECT name
      FROM users
      WHERE id = ${userId};
    `;
    
    return user.length > 0 ? user[0].name : null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Failed to fetch user name.');
  }
} 

export async function getMyRecipes(userId: string, query: string = "", currentPage: number = 1) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const rows = await sql`
      SELECT *
      FROM recipes
      WHERE user_id::string = ${userId}  
      AND (title ILIKE ${"%" + query + "%"}) 
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const recipes: Recipe[] = rows.map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      title: row.title,
      description: row.description,
      ingredients: row.ingredients,
      image_url: row.image_url,
      instructions: row.instructions || "", 
      category: row.category || "", 
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return recipes;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    return [];
  }
}

export async function getFirstUser() {
  try {
    const users = await sql`
      SELECT * FROM users
      ORDER BY id ASC
      LIMIT 1
    `;

    return users.length ? users[0] : null;
  } catch (error) {
    console.error("Error fetching first user:", error);
    return null;
  }
}

export async function getCategories() {
  const result = await sql`
    SELECT unnest(enum_range(NULL::recipe_category)) AS category
  `;
  return result.map((row) => row.category);
}
