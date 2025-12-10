import { useUser } from '@/contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteItems, removeItemFromFavorites } = useUser();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favoriteItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={60} color="#CCCCCC" />
            <Text style={styles.emptyText}>No favorite items yet</Text>
            <Text style={styles.emptySubtext}>Save your favorite food items here</Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.back()}
            >
              <Text style={styles.browseButtonText}>Browse Menu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          favoriteItems.map((item) => (
            <TouchableOpacity
              key={`${item.restaurantId}-${item.id}`}
              style={styles.favoriteCard}
              onPress={() => router.push(`/item/${item.restaurantId}/${item.id}` as any)}
            >
              <Image source={{ uri: item.image }} style={styles.favoriteImage} />
              <View style={styles.favoriteInfo}>
                <View style={styles.favoriteHeader}>
                  <Ionicons 
                    name="radio-button-on" 
                    size={14} 
                    color={item.isVeg ? '#10B981' : '#EF4444'} 
                  />
                  <Text style={styles.favoriteName}>{item.itemName}</Text>
                </View>
                <Text style={styles.favoriteRestaurant}>{item.restaurantName}</Text>
                <Text style={styles.favoriteDescription} numberOfLines={2}>{item.description}</Text>
                <View style={styles.favoriteMetaInfo}>
                  <Text style={styles.favoritePrice}>₹{item.price}</Text>
                  {item.rating && (
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>★ {item.rating}</Text>
                    </View>
                  )}
                </View>
              </View>
              <TouchableOpacity 
                style={styles.heartButton}
                onPress={(e) => {
                  e.stopPropagation();
                  removeItemFromFavorites(item.restaurantId, item.id);
                }}
              >
                <Ionicons name="heart" size={20} color="#EF4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
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
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 55 : 30,
    paddingBottom: 16,
    backgroundColor: '#FF6B35',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingVertical: 80,
    paddingHorizontal: 32,
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
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoriteImage: {
    width: 100,
    height: 120,
  },
  favoriteInfo: {
    flex: 1,
    padding: 12,
  },
  favoriteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  favoriteName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  favoriteRestaurant: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  favoriteDescription: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  favoritePrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginRight: 8,
  },
  favoriteMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
