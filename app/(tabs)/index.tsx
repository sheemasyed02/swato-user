import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Dynamic restaurant data
  const restaurants = [
    {
      id: 1,
      name: 'Delhi Darbar Restaurant',
      cuisine: 'North Indian, Biryani',
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
    },
  ];

  const categories = [
    { id: 1, name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200' },
    { id: 2, name: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200' },
    { id: 3, name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
    { id: 4, name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200' },
    { id: 5, name: 'Momos', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=200' },
    { id: 6, name: 'Rolls', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200' },
    { id: 7, name: 'Juice', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200' },
    { id: 8, name: 'Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200' },
    { id: 9, name: 'Noodles', image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=200' },
    { id: 10, name: 'Salad', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200' },
  ];

  const offers = [
    { id: 1, title: 'Get', subtitle: '70% OFF', icon: '70%', color: '#FFB380' },
    { id: 2, title: 'Flat', subtitle: '₹200 OFF', icon: '₹200', color: '#FF8559' },
    { id: 3, title: 'Meals', subtitle: 'At ₹99', icon: '99', color: '#FF6B35' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Account Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SWATO</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/(tabs)/explore')}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>U</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Location Section */}
      <View style={styles.locationBanner}>
        <TouchableOpacity style={styles.locationSection}>
          <View style={styles.locationIconSmall}>
            <Text style={styles.locationPin}>📍</Text>
          </View>
          <View style={styles.locationTextSection}>
            <Text style={styles.locationTitle}>Delhi</Text>
            <Text style={styles.locationSubtitle}>Connaught Place, New Delhi</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search and Filter Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push('/search')}
          activeOpacity={0.7}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search for 'Biryani'</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vegFilterButton}
          onPress={() => router.push('/veg-filter')}
        >
          <Text style={styles.vegFilterIcon}>🥬</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>FEAST 'TIL YOU</Text>
          <Text style={styles.bannerHighlight}>CRASH!</Text>
          <View style={styles.bannerDecor}>
            <View style={styles.bannerLine} />
          </View>
        </View>

        {/* Quick Actions */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
          {offers.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: offer.color }]}>
                <Text style={styles.actionIconText}>{offer.icon}</Text>
              </View>
              <Text style={styles.actionTitle}>{offer.title}</Text>
              <Text style={styles.actionSubtitle}>{offer.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* What's on your mind */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's on your mind?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.foodCategories}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => console.log('Category:', category.name)}
              >
                <View style={styles.categoryCircle}>
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Fast Delivery Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fast delivery</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.restaurantList}>
            {restaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                onPress={() => router.push(`/restaurant/${restaurant.id}` as any)}
              >
                <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
                <View style={styles.restaurantOverlay}>
                  <Text style={styles.restaurantOffer}>{restaurant.offer}</Text>
                </View>
                <View style={styles.vegBadge}>
                  <View style={[styles.vegBadgeDot, restaurant.isVeg ? styles.vegGreen : styles.vegRed]} />
                </View>
                <View style={styles.restaurantDetails}>
                  <Text style={styles.restaurantName} numberOfLines={1}>{restaurant.name}</Text>
                  <View style={styles.restaurantInfo}>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
                    </View>
                    <Text style={styles.deliveryTime}>• {restaurant.deliveryTime}</Text>
                  </View>
                  <Text style={styles.cuisine} numberOfLines={1}>{restaurant.cuisine}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All restaurants</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={[styles.filterButton, selectedFilter === 'All' && styles.filterButtonActive]}
                onPress={() => setSelectedFilter('All')}
              >
                <Text style={[styles.filterText, selectedFilter === 'All' && styles.filterTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, selectedFilter === 'Veg' && styles.filterButtonActive]}
                onPress={() => setSelectedFilter('Veg')}
              >
                <View style={styles.filterVegIcon} />
                <Text style={[styles.filterText, selectedFilter === 'Veg' && styles.filterTextActive]}>
                  Veg
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.allRestaurants}>
            {restaurants.map((restaurant) => (
              <TouchableOpacity
                key={`all-${restaurant.id}`}
                style={styles.fullRestaurantCard}
                onPress={() => router.push(`/restaurant/${restaurant.id}` as any)}
              >
                <Image source={{ uri: restaurant.image }} style={styles.fullRestaurantImage} />
                <View style={styles.fullRestaurantOverlay}>
                  <Text style={styles.fullRestaurantOffer}>{restaurant.offer}</Text>
                </View>
                <View style={styles.fullRestaurantInfo}>
                  <Text style={styles.fullRestaurantName}>{restaurant.name}</Text>
                  <View style={styles.restaurantMeta}>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
                    </View>
                    <Text style={styles.metaText}>• {restaurant.deliveryTime}</Text>
                  </View>
                  <Text style={styles.cuisineDetail}>{restaurant.cuisine}</Text>
                  <Text style={styles.location}>{restaurant.distance}</Text>
                  <View style={styles.deliveryBadge}>
                    <Text style={styles.deliveryText}>FREE DELIVERY</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ for Delhi</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    backgroundColor: '#FF6B35',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileIcon: {
    marginLeft: 12,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF8559',
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  locationBanner: {
    backgroundColor: '#FFF3EE',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 0,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconSmall: {
    marginRight: 10,
  },
  locationPin: {
    fontSize: 20,
  },
  locationTextSection: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  locationSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: '#999',
  },
  vegFilterButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#FFF3EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  vegFilterIcon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  banner: {
    backgroundColor: '#FF6B35',
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bannerHighlight: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFE082',
    textAlign: 'center',
    marginTop: 4,
  },
  bannerDecor: {
    marginTop: 12,
  },
  bannerLine: {
    width: 100,
    height: 4,
    backgroundColor: '#FFB380',
    borderRadius: 2,
  },
  quickActions: {
    paddingVertical: 16,
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },
  actionCard: {
    width: width * 0.28,
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#FFF3EE',
    borderRadius: 16,
    padding: 12,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 4,
  },
  filterButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterVegIcon: {
    width: 10,
    height: 10,
    borderWidth: 1.5,
    borderColor: '#22C55E',
    borderRadius: 2,
  },
  foodCategories: {
    paddingLeft: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: width * 0.22,
  },
  categoryCircle: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: (width * 0.22) / 2,
    backgroundColor: '#FFF3EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
    textAlign: 'center',
  },
  restaurantList: {
    paddingLeft: 16,
  },
  restaurantCard: {
    width: width * 0.48,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: width * 0.36,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  restaurantOverlay: {
    position: 'absolute',
    bottom: width * 0.36 - 30,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  restaurantOffer: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  vegBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegBadgeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  vegGreen: {
    backgroundColor: '#22C55E',
  },
  vegRed: {
    backgroundColor: '#EF4444',
  },
  restaurantDetails: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
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
  cuisine: {
    fontSize: 13,
    color: '#999',
  },
  allRestaurants: {
    paddingHorizontal: 16,
  },
  fullRestaurantCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fullRestaurantImage: {
    width: width * 0.32,
    height: width * 0.32,
    backgroundColor: '#F5F5F5',
  },
  fullRestaurantOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  fullRestaurantOffer: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fullRestaurantInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  fullRestaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  cuisineDetail: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  deliveryBadge: {
    backgroundColor: '#FFF3EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  deliveryText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});
