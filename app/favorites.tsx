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
  const { favorites: favoriteIds, removeFromFavorites } = useUser();

  // Mock restaurant data - in production, fetch based on favoriteIds
  const allRestaurants = [
    {
      id: 1,
      name: 'Delhi Darbar Restaurant',
      cuisine: 'North Indian, Biryani',
      rating: 4.3,
      deliveryTime: '25-30 mins',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
      isVeg: false,
    },
    {
      id: 2,
      name: 'Wow! Momo',
      cuisine: 'Chinese, Tibetan, Momos',
      rating: 4.4,
      deliveryTime: '20-25 mins',
      image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400',
      isVeg: true,
    },
    {
      id: 3,
      name: 'Pizza Paradise',
      cuisine: 'Italian, Pizza, Pasta',
      rating: 4.2,
      deliveryTime: '30-35 mins',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
      isVeg: true,
    },
    {
      id: 4,
      name: 'The Juice Bar',
      cuisine: 'Fresh Juices, Smoothies',
      rating: 4.5,
      deliveryTime: '15-20 mins',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
      isVeg: true,
    },
    {
      id: 5,
      name: 'Sweet Cravings Bakery',
      cuisine: 'Cakes, Pastries, Desserts',
      rating: 4.6,
      deliveryTime: '20-25 mins',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
      isVeg: true,
    },
    {
      id: 6,
      name: 'Noodle House',
      cuisine: 'Chinese Noodles, Asian',
      rating: 4.1,
      deliveryTime: '25-30 mins',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400',
      isVeg: true,
    },
  ];

  const favoriteRestaurants = allRestaurants.filter(r => favoriteIds.includes(r.id));

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
        {favoriteRestaurants.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={60} color="#CCCCCC" />
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySubtext}>Save your favorite restaurants here</Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.back()}
            >
              <Text style={styles.browseButtonText}>Browse Restaurants</Text>
            </TouchableOpacity>
          </View>
        ) : (
          favoriteRestaurants.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.favoriteCard}
              onPress={() => router.push(`/restaurant/${item.id}` as any)}
            >
              <Image source={{ uri: item.image }} style={styles.favoriteImage} />
              <View style={styles.favoriteInfo}>
                <Text style={styles.favoriteName}>{item.name}</Text>
                <Text style={styles.favoriteCuisine}>{item.cuisine}</Text>
                <View style={styles.favoriteMetaInfo}>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>★ {item.rating}</Text>
                  </View>
                  <Text style={styles.deliveryTime}>• {item.deliveryTime}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.heartButton}
                onPress={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(item.id);
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
  },
  favoriteImage: {
    width: 100,
    height: 100,
  },
  favoriteInfo: {
    flex: 1,
    padding: 12,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  favoriteCuisine: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  favoriteMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deliveryTime: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
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
