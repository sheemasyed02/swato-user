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
  const [selectedCategory, setSelectedCategory] = useState('Recommended');

  // Mock restaurant data
  const restaurant = {
    id,
    name: 'Delhi Darbar Restaurant',
    rating: 4.3,
    deliveryTime: '25-30 mins',
    cuisine: 'North Indian, Biryani, Mughlai',
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
  };

  const categories = ['Recommended', 'Biryani', 'Curries', 'Breads', 'Beverages'];

  const menuItems = [
    {
      id: 1,
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken pieces',
      price: 249,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
      isVeg: false,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese in rich tomato and butter gravy',
      price: 199,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 3,
      name: 'Butter Chicken',
      description: 'Classic North Indian chicken curry in creamy tomato sauce',
      price: 279,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
      isVeg: false,
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Garlic Naan',
      description: 'Soft leavened bread with garlic and butter',
      price: 59,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      isVeg: true,
      rating: 4.4,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>❤️</Text>
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
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemInfo}>
                <View style={styles.vegIndicator}>
                  <View style={[styles.vegDot, item.isVeg ? styles.vegDotGreen : styles.vegDotRed]} />
                </View>
                <View style={styles.menuItemDetails}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                  <Text style={styles.menuItemPrice}>₹{item.price}</Text>
                  <View style={styles.itemRating}>
                    <Text style={styles.itemRatingText}>★ {item.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.menuItemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.menuItemImage} />
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  backText: {
    fontSize: 28,
    color: '#1A1A1A',
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
  },
  iconText: {
    fontSize: 20,
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
    borderWidth: 2,
    borderColor: '#22C55E',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  vegDotGreen: {
    backgroundColor: '#22C55E',
  },
  vegDotRed: {
    backgroundColor: '#EF4444',
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
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
