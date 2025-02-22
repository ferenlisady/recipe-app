export const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'Feren',
      email: 'feren@gmail.com',
      password: 'feren123',
    },
    {
      id: '5f2b4d2d-3fa6-4a39-bc36-88c2923a2f20',
      name: 'Lisady',
      email: 'lisady@gmail.com',
      password: 'lisady123',
    },
  ];
  
  export const recipes = [
    {
      id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
      user_id: users[0].id,
      title: 'Pancakes',
      description: 'Delicious fluffy pancakes served with syrup.',
      ingredients: ['Flour', 'Eggs', 'Milk', 'Sugar'],
      instructions: 'Mix the ingredients and cook on a pan.',
      category: 'Breakfast',
      image_url: '/assets/pancakes.jpg',
      created_at: '2025-02-21T08:00:00Z',
    },
    {
      id: 'b2c3d4e5-f678-9012-3456-789abcdef012',
      user_id: users[1].id, 
      title: 'Spaghetti',
      description: 'Tasty spaghetti with tomato sauce and garlic.',
      ingredients: ['Pasta', 'Tomato Sauce', 'Garlic'],
      instructions: 'Boil pasta, mix with sauce, and serve.',
      category: 'Lunch',
      image_url: '/assets/spaghetti.jpg',
      created_at: '2025-02-21T09:00:00Z',
    },
];  