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

export interface Address {
  id: number;
  type: string;
  address: string;
  details: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: number;
  type: 'card' | 'upi' | 'wallet';
  name: string;
  details: string;
  isDefault: boolean;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
  updateUser: (updates: Partial<UserData>) => void;
  updateUserProfile: (updates: Partial<UserData>) => void;
  
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
  
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: number, address: Partial<Address>) => void;
  deleteAddress: (id: number) => void;
  setDefaultAddress: (id: number) => void;
  
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  updatePaymentMethod: (id: number, method: Partial<PaymentMethod>) => void;
  deletePaymentMethod: (id: number) => void;
  setDefaultPaymentMethod: (id: number) => void;
  
  resetUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserData | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const setUser = (userData: UserData) => {
    setUserState(userData);
  };

  const updateUser = (updates: Partial<UserData>) => {
    if (user) {
      setUserState({ ...user, ...updates });
    }
  };

  const updateUserProfile = (updates: Partial<UserData>) => {
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

  // Address management
  const addAddress = (address: Omit<Address, 'id'>) => {
    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    const newAddress = { ...address, id: newId };
    
    // If this is the first address or marked as default, set it as default
    if (addresses.length === 0 || address.isDefault) {
      setAddresses([
        ...addresses.map(a => ({ ...a, isDefault: false })),
        newAddress
      ]);
    } else {
      setAddresses([...addresses, newAddress]);
    }
  };

  const updateAddress = (id: number, updates: Partial<Address>) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, ...updates } : addr
    ));
  };

  const deleteAddress = (id: number) => {
    const addressToDelete = addresses.find(a => a.id === id);
    const remainingAddresses = addresses.filter(a => a.id !== id);
    
    // If deleting default address and there are other addresses, make first one default
    if (addressToDelete?.isDefault && remainingAddresses.length > 0) {
      remainingAddresses[0].isDefault = true;
    }
    
    setAddresses(remainingAddresses);
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  // Payment method management
  const addPaymentMethod = (method: Omit<PaymentMethod, 'id'>) => {
    const newId = paymentMethods.length > 0 ? Math.max(...paymentMethods.map(p => p.id)) + 1 : 1;
    const newMethod = { ...method, id: newId };
    
    // If this is the first method or marked as default, set it as default
    if (paymentMethods.length === 0 || method.isDefault) {
      setPaymentMethods([
        ...paymentMethods.map(p => ({ ...p, isDefault: false })),
        newMethod
      ]);
    } else {
      setPaymentMethods([...paymentMethods, newMethod]);
    }
  };

  const updatePaymentMethod = (id: number, updates: Partial<PaymentMethod>) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === id ? { ...method, ...updates } : method
    ));
  };

  const deletePaymentMethod = (id: number) => {
    const methodToDelete = paymentMethods.find(p => p.id === id);
    const remainingMethods = paymentMethods.filter(p => p.id !== id);
    
    // If deleting default method and there are other methods, make first one default
    if (methodToDelete?.isDefault && remainingMethods.length > 0) {
      remainingMethods[0].isDefault = true;
    }
    
    setPaymentMethods(remainingMethods);
  };

  const setDefaultPaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const resetUserData = () => {
    setUserState(null);
    setFavorites([]);
    setFavoriteItems([]);
    setCart([]);
    setOrders([]);
    setAddresses([]);
    setPaymentMethods([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        updateUserProfile,
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
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        paymentMethods,
        addPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
        setDefaultPaymentMethod,
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
