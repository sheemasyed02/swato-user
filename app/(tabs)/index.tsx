import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationSection}>
          <View style={styles.locationIcon}>
            <View style={styles.locationPinSmall} />
          </View>
          <View style={styles.locationText}>
            <Text style={styles.locationTitle}>Delhi</Text>
            <Text style={styles.locationSubtitle}>Connaught Place, New Delhi</Text>
          </View>
          <TouchableOpacity style={styles.dropdownIcon}>
            <Text style={styles.dropdownText}>▼</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.profileIcon}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>U</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <View style={styles.searchIconContainer}>
            <Text style={styles.searchIconText}>🔍</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for 'Biryani'"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.vegButton}>
          <View style={styles.vegIndicator} />
          <Text style={styles.vegText}>VEG</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>FEAST 'TIL YOU</Text>
          <Text style={styles.bannerHighlight}>CRASH!</Text>
          <TouchableOpacity style={styles.orderNowButton}>
            <Text style={styles.orderNowText}>ORDER NOW</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
          <View style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionPercent}>70%</Text>
            </View>
            <Text style={styles.actionTitle}>Get</Text>
            <Text style={styles.actionSubtitle}>70% OFF</Text>
          </View>
          <View style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionCurrency}>₹200</Text>
            </View>
            <Text style={styles.actionTitle}>Flat</Text>
            <Text style={styles.actionSubtitle}>₹200 OFF</Text>
          </View>
          <View style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionNumber}>99</Text>
            </View>
            <Text style={styles.actionTitle}>Meals</Text>
            <Text style={styles.actionSubtitle}>At ₹99</Text>
          </View>
        </ScrollView>

        {/* Fast Delivery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fast delivery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.restaurantList}>
            <View style={styles.restaurantCard}>
              <Image
                source={require('@/assets/images/2.png')}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
              <View style={styles.restaurantOverlay}>
                <Text style={styles.restaurantOffer}>ITEMS</Text>
                <Text style={styles.restaurantPrice}>AT ₹109</Text>
              </View>
              <Text style={styles.restaurantName}>Hotel Babu Biryani</Text>
              <View style={styles.restaurantInfo}>
                <Text style={styles.rating}>★ 4.2</Text>
                <Text style={styles.deliveryTime}>• 25-30 mins</Text>
              </View>
              <Text style={styles.cuisine}>Biryani</Text>
            </View>
            <View style={styles.restaurantCard}>
              <Image
                source={require('@/assets/images/2.png')}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
              <View style={styles.restaurantOverlay}>
                <Text style={styles.restaurantOffer}>30% OFF</Text>
                <Text style={styles.restaurantPrice}>UPTO ₹75</Text>
              </View>
              <Text style={styles.restaurantName}>Ak Special Hyderabadi</Text>
              <View style={styles.restaurantInfo}>
                <Text style={styles.rating}>★ 4.4</Text>
                <Text style={styles.deliveryTime}>• 45-50 mins</Text>
              </View>
              <Text style={styles.cuisine}>Biryani, Chinese</Text>
            </View>
          </ScrollView>
        </View>

        {/* What's on your mind */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's on your mind?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.foodCategories}>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryCircle}>
                <View style={styles.pizzaIcon} />
              </View>
              <Text style={styles.categoryName}>Pizzas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryCircle}>
                <View style={styles.biryaniIcon} />
              </View>
              <Text style={styles.categoryName}>Biryani</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryCircle}>
                <View style={styles.burgerIcon} />
              </View>
              <Text style={styles.categoryName}>Burgers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryCircle}>
                <View style={styles.saladIcon} />
              </View>
              <Text style={styles.categoryName}>Salad</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* All Restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All restaurants</Text>
          <View style={styles.allRestaurants}>
            <View style={styles.fullRestaurantCard}>
              <Image
                source={require('@/assets/images/2.png')}
                style={styles.fullRestaurantImage}
                resizeMode="cover"
              />
              <View style={styles.fullRestaurantInfo}>
                <Text style={styles.fullRestaurantName}>Olive Family Restaurant</Text>
                <View style={styles.restaurantMeta}>
                  <Text style={styles.rating}>★ 3.6 (23)</Text>
                  <Text style={styles.metaText}>• 30-35 mins</Text>
                </View>
                <Text style={styles.cuisineDetail}>Biryani, South Indian, Hyderabadi</Text>
                <Text style={styles.location}>Railpet & Kothapet • 5.0 km</Text>
                <View style={styles.deliveryBadge}>
                  <Text style={styles.deliveryText}>FREE DELIVERY</Text>
                </View>
              </View>
            </View>
          </View>
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
    paddingBottom: 12,
    backgroundColor: '#FF6B35',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  locationPinSmall: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  dropdownIcon: {
    padding: 4,
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  profileIcon: {
    marginLeft: 12,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FF6B35',
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIconContainer: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  searchIconText: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  vegButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    gap: 6,
  },
  vegIndicator: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#22C55E',
    borderRadius: 2,
  },
  vegText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
  },
  content: {
    flex: 1,
  },
  banner: {
    backgroundColor: '#FF6B35',
    padding: 24,
    alignItems: 'center',
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
  orderNowButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 16,
  },
  orderNowText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickActions: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
  actionCard: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#FF8559',
    borderRadius: 16,
    padding: 12,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB380',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionPercent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionCurrency: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  restaurantList: {
    paddingLeft: 16,
  },
  restaurantCard: {
    width: 180,
    marginRight: 12,
  },
  restaurantImage: {
    width: 180,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  restaurantOverlay: {
    position: 'absolute',
    bottom: 60,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  restaurantOffer: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  restaurantPrice: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 8,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
  cuisine: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  foodCategories: {
    paddingLeft: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  pizzaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB380',
  },
  biryaniIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF8559',
  },
  burgerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
  },
  saladIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22C55E',
  },
  categoryName: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
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
    width: 120,
    height: 120,
    backgroundColor: '#F5F5F5',
  },
  fullRestaurantInfo: {
    flex: 1,
    padding: 12,
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
  },
  cuisineDetail: {
    fontSize: 13,
    color: '#999',
    marginBottom: 2,
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
});
