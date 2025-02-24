import postgres from 'postgres';
import { recipes } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', connect_timeout: 100000 });

async function createTables(sql: any) {
  try {
    // console.log('Creating tables...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'recipe_category') THEN
          CREATE TYPE recipe_category AS ENUM ('Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage');
        END IF;
      END $$;
    `;

    // console.log('Creating recipes table...');
    await sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL, 
        ingredients TEXT[] NOT NULL,
        instructions TEXT NOT NULL,
        category recipe_category NOT NULL, 
        image_url VARCHAR(255) NOT NULL
      );  
    `;

  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

async function seedRecipes(sql: any) {
  try {
    const insertedRecipes = await Promise.all(
      recipes.map((recipe, index) => {

        return sql`
          INSERT INTO recipes (id, title, description, ingredients, instructions, category, image_url)
          VALUES (${recipe.id}, ${recipe.title}, ${recipe.description}, ${recipe.ingredients}, ${recipe.instructions}, ${recipe.category}, ${recipe.image_url} )
        `;
      })
    );
    return insertedRecipes;
  } catch (error) {
    console.error('Error inserting recipes:', error);
    throw error;
  }
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await createTables(sql);
      await seedRecipes(sql);

      await new Promise(resolve => setTimeout(resolve, 1000)); 
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json({ error }, { status: 500 });
  }
}

