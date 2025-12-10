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

  const favorites = [
    {
      id: 1,
      name: 'Delhi Darbar Restaurant',
      cuisine: 'North Indian, Biryani',
      rating: 4.3,
      deliveryTime: '25-30 mins',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    },
    {
      id: 2,
      name: 'Pizza Paradise',
      cuisine: 'Italian, Pizza, Pasta',
      rating: 4.2,
      deliveryTime: '30-35 mins',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySubtext}>Save your favorite restaurants here</Text>
          </View>
        ) : (
          favorites.map((item) => (
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
              <TouchableOpacity style={styles.heartButton}>
                <Text style={styles.heartIcon}>❤️</Text>
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
  },
  backText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
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
  heartIcon: {
    fontSize: 18,
  },
});
