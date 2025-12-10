import { useUser } from '@/contexts/UserContext';
import { menuItems } from '@/data/restaurants';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CategoryItemsScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const { isItemFavorite, addItemToFavorites, removeItemFromFavorites } = useUser();
  
  const categoryName = name as string;
  
  // Filter items by category
  const categoryItems = menuItems.filter(item => 
    item.category.toLowerCase() === categoryName.toLowerCase() ||
    item.name.toLowerCase().includes(categoryName.toLowerCase())
  );

  const toggleItemFavorite = (item: typeof menuItems[0]) => {
    if (isItemFavorite(item.restaurantId, item.id)) {
      removeItemFromFavorites(item.restaurantId, item.id);
    } else {
      addItemToFavorites({
        id: item.id,
        restaurantId: item.restaurantId,
        restaurantName: '', // Will be filled from context
        itemName: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        isVeg: item.isVeg,
        rating: item.rating,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {categoryItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="fast-food-outline" size={80} color="#CCCCCC" />
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubtext}>Try browsing other categories</Text>
          </View>
        ) : (
          <View style={styles.itemsGrid}>
            {categoryItems.map((item) => (
              <TouchableOpacity
                key={`${item.restaurantId}-${item.id}`}
                style={styles.itemCard}
                onPress={() => router.push(`/item/${item.restaurantId}/${item.id}` as any)}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.vegBadge}>
                  <Ionicons 
                    name="radio-button-on" 
                    size={14} 
                    color={item.isVeg ? '#10B981' : '#EF4444'} 
                  />
                </View>
                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleItemFavorite(item);
                  }}
                >
                  <Ionicons 
                    name={isItemFavorite(item.restaurantId, item.id) ? 'heart' : 'heart-outline'} 
                    size={18} 
                    color={isItemFavorite(item.restaurantId, item.id) ? '#EF4444' : '#FFFFFF'} 
                  />
                </TouchableOpacity>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={12} color="#FFB800" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF6B35',
    paddingTop: Platform.OS === 'ios' ? 55 : 30,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  itemCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 4,
  },
  itemImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F0F0F0',
  },
  vegBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 4,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 6,
  },
  itemDetails: {
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FFF3EE',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
