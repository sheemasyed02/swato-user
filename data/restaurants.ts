export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  offer: string;
  isVeg: boolean;
  isOpen?: boolean; // For showing unavailable/closed state
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  rating: number;
  category: string;
  servings: string;
  prepTime: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Delhi Darbar Restaurant',
    cuisine: 'North Indian, Biryani, Mughlai',
    rating: 4.3,
    deliveryTime: '25-30 mins',
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    offer: 'ITEMS AT ₹109',
    isVeg: false,
  },
  {
    id: 2,
    name: 'Wow! Momo',
    cuisine: 'Chinese, Tibetan, Momos',
    rating: 4.4,
    deliveryTime: '20-25 mins',
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
    offer: '30% OFF UPTO ₹75',
    isVeg: true,
  },
  {
    id: 3,
    name: 'Pizza Paradise',
    cuisine: 'Italian, Pizza, Pasta',
    rating: 4.2,
    deliveryTime: '30-35 mins',
    distance: '3.2 km',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    offer: 'FLAT ₹150 OFF',
    isVeg: true,
  },
  {
    id: 4,
    name: 'The Juice Bar',
    cuisine: 'Fresh Juices, Smoothies',
    rating: 4.5,
    deliveryTime: '15-20 mins',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800',
    offer: 'BUY 2 GET 1 FREE',
    isVeg: true,
  },
  {
    id: 5,
    name: 'Sweet Cravings Bakery',
    cuisine: 'Cakes, Pastries, Desserts',
    rating: 4.6,
    deliveryTime: '20-25 mins',
    distance: '2.0 km',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    offer: '25% OFF',
    isVeg: true,
  },
  {
    id: 6,
    name: 'Noodle House',
    cuisine: 'Chinese Noodles, Asian',
    rating: 4.1,
    deliveryTime: '25-30 mins',
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=800',
    offer: 'FREE DELIVERY',
    isVeg: true,
    isOpen: false, // Currently closed
  },
  {
    id: 7,
    name: 'Burger King',
    cuisine: 'Burgers, Fast Food',
    rating: 4.0,
    deliveryTime: '20-25 mins',
    distance: '1.5 km',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    offer: '50% OFF',
    isVeg: false,
  },
  {
    id: 8,
    name: 'Sushi Station',
    cuisine: 'Japanese, Sushi',
    rating: 4.7,
    deliveryTime: '35-40 mins',
    distance: '3.8 km',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    offer: '₹100 OFF',
    isVeg: false,
    isOpen: false, // Currently closed
  },
];

export const menuItems: MenuItem[] = [
  // Delhi Darbar Restaurant (ID: 1)
  {
    id: 101,
    restaurantId: 1,
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken pieces, infused with traditional spices and saffron. Served with raita and gravy.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    isVeg: false,
    rating: 4.5,
    category: 'Biryani',
    servings: 'Serves 1',
    prepTime: '25-30 mins',
  },
  {
    id: 102,
    restaurantId: 1,
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes cooked in rich, creamy tomato gravy with butter and aromatic spices. Best enjoyed with naan or rice.',
    price: 219,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
    isVeg: true,
    rating: 4.3,
    category: 'Curry',
    servings: 'Serves 1-2',
    prepTime: '20-25 mins',
  },
  {
    id: 103,
    restaurantId: 1,
    name: 'Butter Chicken',
    description: 'Classic North Indian chicken curry in creamy tomato sauce with butter and aromatic spices.',
    price: 279,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
    isVeg: false,
    rating: 4.6,
    category: 'Curry',
    servings: 'Serves 1-2',
    prepTime: '25-30 mins',
  },
  {
    id: 104,
    restaurantId: 1,
    name: 'Garlic Naan',
    description: 'Soft leavened bread topped with garlic and butter, baked in tandoor.',
    price: 59,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    isVeg: true,
    rating: 4.4,
    category: 'Breads',
    servings: '2 pieces',
    prepTime: '10-15 mins',
  },
  {
    id: 105,
    restaurantId: 1,
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils in creamy tomato gravy with butter and cream.',
    price: 189,
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800',
    isVeg: true,
    rating: 4.5,
    category: 'Curry',
    servings: 'Serves 1-2',
    prepTime: '20-25 mins',
  },

  // Wow! Momo (ID: 2)
  {
    id: 201,
    restaurantId: 2,
    name: 'Veg Steamed Momos',
    description: 'Fresh vegetables wrapped in soft dumplings, steamed to perfection. Served with spicy red chutney and mayonnaise.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
    isVeg: true,
    rating: 4.4,
    category: 'Momos',
    servings: '8 pieces',
    prepTime: '15-20 mins',
  },
  {
    id: 202,
    restaurantId: 2,
    name: 'Chicken Fried Momos',
    description: 'Crispy fried chicken momos with spicy sauce and vegetables.',
    price: 159,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    isVeg: false,
    rating: 4.5,
    category: 'Momos',
    servings: '8 pieces',
    prepTime: '15-20 mins',
  },
  {
    id: 203,
    restaurantId: 2,
    name: 'Paneer Momos',
    description: 'Steamed momos filled with spiced paneer and vegetables.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    isVeg: true,
    rating: 4.3,
    category: 'Momos',
    servings: '8 pieces',
    prepTime: '15-20 mins',
  },

  // Pizza Paradise (ID: 3)
  {
    id: 301,
    restaurantId: 3,
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil leaves on a crispy thin crust.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    isVeg: true,
    rating: 4.6,
    category: 'Pizza',
    servings: 'Serves 1-2',
    prepTime: '20-25 mins',
  },
  {
    id: 302,
    restaurantId: 3,
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni slices and mozzarella cheese on tomato base.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800',
    isVeg: false,
    rating: 4.5,
    category: 'Pizza',
    servings: 'Serves 1-2',
    prepTime: '20-25 mins',
  },
  {
    id: 303,
    restaurantId: 3,
    name: 'Veggie Supreme Pizza',
    description: 'Loaded with bell peppers, onions, olives, mushrooms, and mozzarella.',
    price: 329,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800',
    isVeg: true,
    rating: 4.4,
    category: 'Pizza',
    servings: 'Serves 1-2',
    prepTime: '20-25 mins',
  },
  {
    id: 304,
    restaurantId: 3,
    name: 'Garlic Bread',
    description: 'Crispy bread sticks topped with garlic butter and herbs.',
    price: 99,
    image: 'https://images.unsplash.com/photo-1573140401552-388e6b163a12?w=800',
    isVeg: true,
    rating: 4.3,
    category: 'Sides',
    servings: '6 pieces',
    prepTime: '10-15 mins',
  },

  // The Juice Bar (ID: 4)
  {
    id: 401,
    restaurantId: 4,
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice with no added sugar.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800',
    isVeg: true,
    rating: 4.7,
    category: 'Juice',
    servings: '300ml',
    prepTime: '5-10 mins',
  },
  {
    id: 402,
    restaurantId: 4,
    name: 'Mango Smoothie',
    description: 'Thick and creamy mango smoothie with yogurt.',
    price: 119,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800',
    isVeg: true,
    rating: 4.6,
    category: 'Smoothie',
    servings: '400ml',
    prepTime: '5-10 mins',
  },
  {
    id: 403,
    restaurantId: 4,
    name: 'Green Detox Juice',
    description: 'Healthy blend of spinach, cucumber, apple, and lemon.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800',
    isVeg: true,
    rating: 4.5,
    category: 'Juice',
    servings: '300ml',
    prepTime: '5-10 mins',
  },

  // Sweet Cravings Bakery (ID: 5)
  {
    id: 501,
    restaurantId: 5,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with layers of chocolate ganache, topped with chocolate shavings.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    isVeg: true,
    rating: 4.7,
    category: 'Dessert',
    servings: '2-3 slices',
    prepTime: '10-15 mins',
  },
  {
    id: 502,
    restaurantId: 5,
    name: 'Red Velvet Cupcake',
    description: 'Moist red velvet cupcake with cream cheese frosting.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800',
    isVeg: true,
    rating: 4.6,
    category: 'Dessert',
    servings: '1 piece',
    prepTime: '5-10 mins',
  },
  {
    id: 503,
    restaurantId: 5,
    name: 'Blueberry Cheesecake',
    description: 'Creamy cheesecake topped with fresh blueberry compote.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1533134242116-bcf0f7d8e6d6?w=800',
    isVeg: true,
    rating: 4.8,
    category: 'Dessert',
    servings: '1 slice',
    prepTime: '10-15 mins',
  },

  // Noodle House (ID: 6)
  {
    id: 601,
    restaurantId: 6,
    name: 'Hakka Noodles',
    description: 'Stir-fried noodles with fresh vegetables, tossed in aromatic sauces and seasonings.',
    price: 179,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=800',
    isVeg: true,
    rating: 4.2,
    category: 'Noodles',
    servings: 'Serves 1',
    prepTime: '15-20 mins',
  },
  {
    id: 602,
    restaurantId: 6,
    name: 'Schezwan Noodles',
    description: 'Spicy stir-fried noodles with vegetables in schezwan sauce.',
    price: 189,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
    isVeg: true,
    rating: 4.3,
    category: 'Noodles',
    servings: 'Serves 1',
    prepTime: '15-20 mins',
  },
  {
    id: 603,
    restaurantId: 6,
    name: 'Chicken Noodles',
    description: 'Stir-fried noodles with chicken and mixed vegetables.',
    price: 209,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=800',
    isVeg: false,
    rating: 4.4,
    category: 'Noodles',
    servings: 'Serves 1',
    prepTime: '15-20 mins',
  },

  // Burger King (ID: 7)
  {
    id: 701,
    restaurantId: 7,
    name: 'Whopper Burger',
    description: 'Flame-grilled beef patty with fresh vegetables, cheese, and special sauce.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    isVeg: false,
    rating: 4.5,
    category: 'Burger',
    servings: '1 piece',
    prepTime: '15-20 mins',
  },
  {
    id: 702,
    restaurantId: 7,
    name: 'Veg Whopper',
    description: 'Crispy vegetable patty with fresh lettuce, tomato, and mayo.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800',
    isVeg: true,
    rating: 4.2,
    category: 'Burger',
    servings: '1 piece',
    prepTime: '15-20 mins',
  },
  {
    id: 703,
    restaurantId: 7,
    name: 'Chicken Wings',
    description: 'Crispy fried chicken wings with spicy sauce.',
    price: 179,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800',
    isVeg: false,
    rating: 4.4,
    category: 'Sides',
    servings: '6 pieces',
    prepTime: '10-15 mins',
  },

  // Sushi Station (ID: 8)
  {
    id: 801,
    restaurantId: 8,
    name: 'California Roll',
    description: 'Classic sushi roll with crab, avocado, and cucumber.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    isVeg: false,
    rating: 4.7,
    category: 'Sushi',
    servings: '8 pieces',
    prepTime: '20-25 mins',
  },
  {
    id: 802,
    restaurantId: 8,
    name: 'Vegetable Sushi',
    description: 'Fresh vegetables rolled in seasoned rice and nori.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800',
    isVeg: true,
    rating: 4.5,
    category: 'Sushi',
    servings: '8 pieces',
    prepTime: '20-25 mins',
  },
];

// Helper functions
export const getRestaurantById = (id: number): Restaurant | undefined => {
  return restaurants.find(r => r.id === id);
};

export const getMenuItemsByRestaurantId = (restaurantId: number): MenuItem[] => {
  return menuItems.filter(item => item.restaurantId === restaurantId);
};

export const getMenuItemById = (restaurantId: number, itemId: number): MenuItem | undefined => {
  return menuItems.find(item => item.restaurantId === restaurantId && item.id === itemId);
};

export const getPopularItems = (limit: number = 6): MenuItem[] => {
  return menuItems
    .filter(item => item.rating >= 4.3)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getRestaurantName = (restaurantId: number): string => {
  const restaurant = getRestaurantById(restaurantId);
  return restaurant?.name || 'Restaurant';
};
