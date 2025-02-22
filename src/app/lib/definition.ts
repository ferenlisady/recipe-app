export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};
  
export type Recipe = {
    id: string;
    user_id: string; 
    title: string;
    description: string;
    ingredients: string[]; 
    instructions: string;
    category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert' | 'Snack'; 
    image_url: string; 
    created_at: string;
};