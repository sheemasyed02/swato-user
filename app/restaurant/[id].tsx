import { useUser } from '@/contexts/UserContext';
import { getMenuItemsByRestaurantId, getRestaurantById } from '@/data/restaurants';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, addToFavorites, removeFromFavorites, isItemFavorite, addItemToFavorites, removeItemFromFavorites, getFavoriteItemsByRestaurant } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('Recommended');
  
  const restaurantId = parseInt(id as string);
  const isRestaurantFavorite = isFavorite(restaurantId);
  const restaurantFavoriteItems = getFavoriteItemsByRestaurant(restaurantId);

  // Get restaurant and menu data from centralized source
  const restaurant = getRestaurantById(restaurantId);
  const menuItems = getMenuItemsByRestaurantId(restaurantId);

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666' }}>Restaurant not found</Text>
        </View>
      </View>
    );
  }

  const categories = ['Recommended', 'Biryani', 'Curries', 'Breads', 'Beverages'];

  const handleToggleRestaurantFavorite = () => {
    if (isRestaurantFavorite) {
      removeFromFavorites(restaurantId);
    } else {
      addToFavorites(restaurantId);
    }
  };

  const handleToggleItemFavorite = (item: typeof menuItems[0]) => {
    if (isItemFavorite(restaurantId, item.id)) {
      removeItemFromFavorites(restaurantId, item.id);
    } else {
      addItemToFavorites({
        id: item.id,
        restaurantId: restaurantId,
        restaurantName: restaurant.name,
        itemName: item.name,
        description: item.description,
        price: item.price,
        isVeg: item.isVeg,
        image: item.image,
        rating: item.rating,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/search')}>
            <Ionicons name="search" size={22} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleToggleRestaurantFavorite}
          >
            <Ionicons 
              name={isRestaurantFavorite ? 'heart' : 'heart-outline'} 
              size={22} 
              color={isRestaurantFavorite ? '#EF4444' : '#666'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Restaurant Image */}
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />

        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
          <View style={styles.metaInfo}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
            </View>
            <Text style={styles.metaText}>• {restaurant.deliveryTime}</Text>
            <Text style={styles.metaText}>• {restaurant.distance}</Text>
          </View>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryText}>🚴 Free delivery on orders above ₹199</Text>
          </View>
          
          {/* View Favorites Button */}
          {restaurantFavoriteItems.length > 0 && (
            <TouchableOpacity
              style={styles.viewFavoritesButton}
              onPress={() => router.push(`/restaurant-favorites/${restaurantId}` as any)}
            >
              <Ionicons name="heart" size={18} color="#EF4444" />
              <Text style={styles.viewFavoritesText}>
                View {restaurantFavoriteItems.length} Favorite Item{restaurantFavoriteItems.length > 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
          contentContainerStyle={styles.categoryTabsContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === category && styles.categoryTabTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>{selectedCategory}</Text>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => router.push(`/item/${restaurantId}/${item.id}` as any)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemInfo}>
                <View style={styles.vegIndicator}>
                  <Ionicons 
                    name="radio-button-on" 
                    size={16} 
                    color={item.isVeg ? '#10B981' : '#EF4444'} 
                  />
                </View>
                <View style={styles.menuItemDetails}>
                  <View style={styles.itemNameRow}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <TouchableOpacity
                      style={styles.itemHeartButton}
                      onPress={() => handleToggleItemFavorite(item)}
                    >
                      <Ionicons 
                        name={isItemFavorite(restaurantId, item.id) ? 'heart' : 'heart-outline'} 
                        size={18} 
                        color={isItemFavorite(restaurantId, item.id) ? '#EF4444' : '#CCCCCC'} 
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                  <Text style={styles.menuItemPrice}>₹{item.price}</Text>
                  <View style={styles.itemRating}>
                    <Text style={styles.itemRatingText}>★ {item.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.menuItemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.menuItemImage} />
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    router.push(`/item/${restaurantId}/${item.id}` as any);
                  }}
                >
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
  },
  restaurantInfo: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F5F5F5',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  deliveryInfo: {
    backgroundColor: '#FFF3EE',
    padding: 12,
    borderRadius: 8,
  },
  deliveryText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
  },
  viewFavoritesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  viewFavoritesText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: 'bold',
  },
  categoryTabs: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryTabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryTabActive: {
    backgroundColor: '#FF6B35',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },
  menuSection: {
    padding: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemInfo: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 12,
  },
  vegIndicator: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  menuItemDetails: {
    flex: 1,
  },
  itemNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
  },
  itemHeartButton: {
    padding: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  menuItemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRatingText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '600',
  },
  menuItemImageContainer: {
    position: 'relative',
  },
  menuItemImage: {
    width: 120,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  addButton: {
    position: 'absolute',
    bottom: -8,
    left: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
