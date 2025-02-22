import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users, recipes } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function createTables(sql: any) {
  try {
    console.log('Creating tables...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'recipe_category') THEN
          CREATE TYPE recipe_category AS ENUM ('Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage');
        END IF;
      END $$;
    `;

    console.log('Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log('Creating recipes table...');
    await sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL, 
        ingredients TEXT[] NOT NULL,
        instructions TEXT NOT NULL,
        category recipe_category NOT NULL, 
        image_url VARCHAR(255) NOT NULL, 
        created_at TIMESTAMP 
      );  
    `;

  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

async function seedUsers(sql: any) {
  try {
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          RETURNING id;
        `;
        return result[0].id;
      })
    );
    return insertedUsers;
  } catch (error) {
    console.error('Error inserting users:', error);
    throw error;
  }
}

async function seedRecipes(sql: any, userIds: string[]) {
  try {
    const insertedRecipes = await Promise.all(
      recipes.map((recipe, index) => {
        const userId = userIds[index];

        if (!userId) {
          console.error(`Error: userId is undefined for recipe at index ${index}: ${recipe.title}`);
          return; 
        }

        return sql`
          INSERT INTO recipes (id, user_id, title, description, ingredients, instructions, category, image_url, created_at)
          VALUES (${recipe.id}, ${recipe.user_id}, ${recipe.title}, ${recipe.description}, ${recipe.ingredients}, ${recipe.instructions}, ${recipe.category}, ${recipe.image_url}, ${recipe.created_at})
          ON CONFLICT (id) DO NOTHING;
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
      const userIds = await seedUsers(sql);
      await seedRecipes(sql, userIds);

      await new Promise(resolve => setTimeout(resolve, 1000)); 
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json({ error }, { status: 500 });
  }
}

