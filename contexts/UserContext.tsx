import React, { createContext, ReactNode, useContext, useState } from 'react';

// User data types
export interface UserData {
  name: string;
  phone: string;
  email?: string;
  location?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  offer?: string;
  isVeg: boolean;
}

export interface CartItem {
  id: number;
  restaurantId: number;
  restaurantName: string;
  itemName: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  image?: string;
}

export interface FavoriteItem {
  id: number;
  restaurantId: number;
  restaurantName: string;
  itemName: string;
  description: string;
  price: number;
  isVeg: boolean;
  image?: string;
  rating?: number;
}

export interface Order {
  id: number;
  restaurantId: number;
  restaurantName: string;
  restaurantImage: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  date: string;
  status: 'Delivered' | 'On the way' | 'Preparing' | 'Cancelled';
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
  updateUser: (updates: Partial<UserData>) => void;
  
  favorites: number[];
  addToFavorites: (restaurantId: number) => void;
  removeFromFavorites: (restaurantId: number) => void;
  isFavorite: (restaurantId: number) => boolean;
  
  favoriteItems: FavoriteItem[];
  addItemToFavorites: (item: FavoriteItem) => void;
  removeItemFromFavorites: (restaurantId: number, itemId: number) => void;
  isItemFavorite: (restaurantId: number, itemId: number) => boolean;
  getFavoriteItemsByRestaurant: (restaurantId: number) => FavoriteItem[];
  
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateCartQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  orders: Order[];
  addOrder: (order: Order) => void;
  
  resetUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserData | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const setUser = (userData: UserData) => {
    setUserState(userData);
  };

  const updateUser = (updates: Partial<UserData>) => {
    if (user) {
      setUserState({ ...user, ...updates });
    }
  };

  const addToFavorites = (restaurantId: number) => {
    if (!favorites.includes(restaurantId)) {
      setFavorites([...favorites, restaurantId]);
    }
  };

  const removeFromFavorites = (restaurantId: number) => {
    setFavorites(favorites.filter(id => id !== restaurantId));
    // Also remove all items from this restaurant
    setFavoriteItems(favoriteItems.filter(item => item.restaurantId !== restaurantId));
  };

  const isFavorite = (restaurantId: number) => {
    return favorites.includes(restaurantId);
  };

  const addItemToFavorites = (item: FavoriteItem) => {
    const exists = favoriteItems.find(
      fav => fav.restaurantId === item.restaurantId && fav.id === item.id
    );
    if (!exists) {
      setFavoriteItems([...favoriteItems, item]);
    }
  };

  const removeItemFromFavorites = (restaurantId: number, itemId: number) => {
    setFavoriteItems(
      favoriteItems.filter(item => !(item.restaurantId === restaurantId && item.id === itemId))
    );
  };

  const isItemFavorite = (restaurantId: number, itemId: number) => {
    return favoriteItems.some(
      item => item.restaurantId === restaurantId && item.id === itemId
    );
  };

  const getFavoriteItemsByRestaurant = (restaurantId: number) => {
    return favoriteItems.filter(item => item.restaurantId === restaurantId);
  };

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find(i => i.id === item.id && i.restaurantId === item.restaurantId);
    if (existingItem) {
      updateCartQuantity(item.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const addOrder = (order: Order) => {
    setOrders([order, ...orders]);
  };

  const resetUserData = () => {
    setUserState(null);
    setFavorites([]);
    setFavoriteItems([]);
    setCart([]);
    setOrders([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        favoriteItems,
        addItemToFavorites,
        removeItemFromFavorites,
        isItemFavorite,
        getFavoriteItemsByRestaurant,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        orders,
        addOrder,
        resetUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
