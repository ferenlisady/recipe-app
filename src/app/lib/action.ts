'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const RecipeSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  ingredients: z.string().transform((val) => val.split(',')),
  instructions: z.string(),
  category: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']),
  image: z.any(),
});

const CreateRecipe = RecipeSchema;
const UpdateRecipe = RecipeSchema;

export type State = {
  errors?: {      
    title?: string[];        
    description?: string[];  
    ingredients?: string[];  
    instructions?: string[];
    category?: string[];     
    image?: string[];        
  };
  message?: string | null;  
};

export async function createRecipe(prevState: State, formData: FormData) {
  // console.log('createRecipe function triggered!');
  const validated = CreateRecipe.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    ingredients: formData.get('ingredients'),
    instructions: formData.get('instructions'),
    category: formData.get('category'),
    image: formData.get('image'),
  });

  if (!validated.success) {
    console.log('Validation Failed:', validated.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }
  // console.log('Validation Success:', validated.data);
  const { title, description, ingredients, instructions, category, image } = validated.data;
  const ingredientsArray = ingredients.map((ingredient: string) => ingredient.trim());
  const id = uuidv4();

  let imageUrl = '';
  if (image && image instanceof File) {
    imageUrl = `/assets/${image.name}`;
  }

  console.log('Inserting Recipe:', { id, title, description, ingredientsArray, instructions, category, imageUrl });
  try {
    await sql`
      INSERT INTO recipes (id, title, description, ingredients, instructions, category, image_url)
      VALUES (${id}, ${title}, ${description}, ${ingredientsArray}, ${instructions}, ${category}, ${imageUrl})
      `;
      // console.log('Recipe Added:', { id, title, description, ingredientsArray, instructions, category, imageUrl });
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Database Error: Failed to create recipe.' };
  }
  revalidatePath('/recipes');
  return { success: true, message: 'Recipe created successfully!' };
}

export async function updateRecipe(
  id: string,
  prevState: State,
  formData: FormData
) {
  // console.log('updateRecipe function triggered!');

  // console.log('Submitting Form Data:', {
  //   title: formData.get('title'),
  //   description: formData.get('description'),
  //   ingredients: formData.get('ingredients'), 
  //   instructions: formData.get('instructions'),
  //   category: formData.get('category'),
  //   image: formData.get('image'),
  // });

  const validated = UpdateRecipe.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    ingredients: formData.get('ingredients')?.toString(),  
    instructions: formData.get('instructions'),
    category: formData.get('category'),
    image: formData.get('image'),
  });
  

  if (!validated.success) {
    console.log('Validation Errors:', validated.error.format());
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Recipe.',
    };
  }

  // console.log('Validation Success:', validated.data);

  const { title, description, ingredients, instructions, category, image } = validated.data;
  const ingredientsArray = ingredients.map((ingredient: string) => ingredient.trim());

  let imageUrl = '';
  const uploadedImage = formData.get('image');

  if (uploadedImage && uploadedImage instanceof File) {
    imageUrl = `/assets/${uploadedImage.name}`;
  } else {
    const currentRecipe = await sql`
      SELECT image_url FROM recipes WHERE id = ${id}
    `;
    imageUrl = currentRecipe.length > 0 ? currentRecipe[0].image_url : '';
  }

  try {
    await sql`
      UPDATE recipes
      SET 
        title = ${title}, 
        description = ${description}, 
        ingredients = ${ingredientsArray}, 
        instructions = ${instructions}, 
        category = ${category}, 
        image_url = ${imageUrl}
      WHERE id = ${id}
    `;
  } catch (error) {
    // console.error('Database Error:', error);
    return { success: false, message: 'Database Error: Failed to Update Recipe.' };
  }

  // console.log('Updating Recipe:', { id, title, description, ingredientsArray, instructions, category, imageUrl });

  revalidatePath('/recipes');
  return { success: true, message: 'Recipe updated successfully!' };
}

export async function deleteRecipe(id: string) {
  try {
    await sql`DELETE FROM recipes WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Recipe.',
    };
  }
  revalidatePath('/recipes');
  return { success: true, message: 'Recipe deleted successfully!' };
}