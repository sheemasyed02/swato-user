import { useUser } from '@/contexts/UserContext';
import { getPopularItems, restaurants } from '@/data/restaurants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
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
  const { user, isItemFavorite, addItemToFavorites, removeItemFromFavorites } = useUser();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [vegFilterModal, setVegFilterModal] = useState(false);
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [rememberChoice, setRememberChoice] = useState(false);

  // Get popular items from centralized data
  const popularItems = getPopularItems(6);

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
    { id: 11, name: 'Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200' },
    { id: 12, name: 'Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200' },
    { id: 13, name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200' },
    { id: 14, name: 'Sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200' },
  ];

  const offers = [
    { id: 1, title: 'Get', subtitle: '70% OFF', icon: '70%', color: '#FFB380' },
    { id: 2, title: 'Flat', subtitle: '₹200 OFF', icon: '₹200', color: '#FF8559' },
    { id: 3, title: 'Meals', subtitle: 'At ₹99', icon: '99', color: '#FF6B35' },
  ];

  // Filter items based on veg filter (using dynamic data)
  const filteredFoodItems = vegFilter === 'veg' 
    ? popularItems.filter(item => item.isVeg)
    : vegFilter === 'nonveg'
    ? popularItems.filter(item => !item.isVeg)
    : popularItems;

  const filteredRestaurants = vegFilter === 'veg'
    ? restaurants.filter(r => r.isVeg)
    : vegFilter === 'nonveg'
    ? restaurants.filter(r => !r.isVeg)
    : restaurants;

  const handleVegFilterApply = () => {
    setVegFilterModal(false);
  };

  const toggleItemFavorite = (item: typeof popularItems[0]) => {
    if (isItemFavorite(item.restaurantId, item.id)) {
      removeItemFromFavorites(item.restaurantId, item.id);
    } else {
      const restaurant = restaurants.find(r => r.id === item.restaurantId);
      addItemToFavorites({
        id: item.id,
        restaurantId: item.restaurantId,
        restaurantName: restaurant?.name || 'Restaurant',
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
      {/* Header with Account Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SWATO</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/(tabs)/explore')}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Location Section */}
      <View style={styles.locationBanner}>
        <TouchableOpacity style={styles.locationSection}>
          <View style={styles.locationIconContainer}>
            <View style={styles.locationPinIcon} />
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
          <View style={styles.searchIconContainer}>
            <View style={styles.searchIconCircle} />
            <View style={styles.searchIconHandle} />
          </View>
          <Text style={styles.searchPlaceholder}>Search for 'Biryani'</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.vegFilterButton, vegFilter === 'veg' && styles.vegFilterButtonActive]}
          onPress={() => setVegFilterModal(true)}
        >
          <Ionicons 
            name="leaf" 
            size={20} 
            color={vegFilter === 'veg' ? '#FFFFFF' : '#10B981'} 
          />
        </TouchableOpacity>
      </View>

      {/* Veg Filter Modal */}
      <Modal
        visible={vegFilterModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVegFilterModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setVegFilterModal(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <TouchableOpacity 
              style={styles.modalClose}
              onPress={() => setVegFilterModal(false)}
            >
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>I want to see veg choices from</Text>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' }}
                style={styles.modalImage}
              />
            </View>

            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setVegFilter('all')}
              >
                <Text style={styles.radioLabel}>All restaurants</Text>
                <View style={styles.radioButton}>
                  {vegFilter === 'all' && <View style={styles.radioButtonSelected} />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setVegFilter('veg')}
              >
                <Text style={styles.radioLabel}>Pure veg restaurants only</Text>
                <View style={styles.radioButton}>
                  {vegFilter === 'veg' && <View style={styles.radioButtonSelected} />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setVegFilter('nonveg')}
              >
                <Text style={styles.radioLabel}>Non-veg restaurants only</Text>
                <View style={styles.radioButton}>
                  {vegFilter === 'nonveg' && <View style={styles.radioButtonSelected} />}
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.checkboxOption}
              onPress={() => setRememberChoice(!rememberChoice)}
            >
              <Text style={styles.checkboxLabel}>Remember my choice going forward</Text>
              <View style={styles.checkbox}>
                {rememberChoice && <Ionicons name="checkmark" size={16} color="#10B981" />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleVegFilterApply}
            >
              <Text style={styles.applyButtonText}>Show restaurants</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

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
                onPress={() => router.push(`/category/${category.name}` as any)}
              >
                <View style={styles.categoryCircle}>
                  <Image 
                    source={{ uri: category.image }} 
                    style={styles.categoryImage} 
                  />
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
            {filteredRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                onPress={() => restaurant.isOpen !== false && router.push(`/restaurant/${restaurant.id}` as any)}
                disabled={restaurant.isOpen === false}
              >
                <View style={restaurant.isOpen === false && styles.grayscaleContainer}>
                  <Image 
                    source={{ uri: restaurant.image }} 
                    style={styles.restaurantImage} 
                  />
                  {restaurant.isOpen === false && (
                    <View style={styles.closedOverlay}>
                      <Text style={styles.closedText}>CURRENTLY CLOSED</Text>
                    </View>
                  )}
                </View>
                {restaurant.isOpen !== false && (
                  <View style={styles.restaurantOverlay}>
                    <Text style={styles.restaurantOffer}>{restaurant.offer}</Text>
                  </View>
                )}
                <View style={styles.vegBadge}>
                  <Ionicons 
                    name="radio-button-on" 
                    size={16} 
                    color={restaurant.isVeg ? '#10B981' : '#EF4444'} 
                  />
                </View>
                <View style={styles.restaurantDetails}>
                  <Text 
                    style={[
                      styles.restaurantName,
                      restaurant.isOpen === false && styles.restaurantNameClosed
                    ]} 
                    numberOfLines={1}
                  >
                    {restaurant.name}
                  </Text>
                  <View style={styles.restaurantInfo}>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
                    </View>
                    <Text style={styles.deliveryTime}>• {restaurant.deliveryTime}</Text>
                  </View>
                  <Text 
                    style={[
                      styles.cuisine,
                      restaurant.isOpen === false && styles.cuisineClosed
                    ]} 
                    numberOfLines={1}
                  >
                    {restaurant.cuisine}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Items Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular items</Text>
            <TouchableOpacity onPress={() => router.push('/favorites')}>
              <Text style={styles.seeAll}>View favorites →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.foodItemsList}>
            {filteredFoodItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.foodItemCard}
                onPress={() => router.push(`/item/${item.restaurantId}/${item.id}` as any)}
              >
                <Image source={{ uri: item.image }} style={styles.foodItemImage} />
                <View style={styles.foodItemVegBadge}>
                  <Ionicons 
                    name="radio-button-on" 
                    size={14} 
                    color={item.isVeg ? '#10B981' : '#EF4444'} 
                  />
                </View>
                <TouchableOpacity
                  style={styles.foodItemHeartButton}
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
                <View style={styles.foodItemDetails}>
                  <Text style={styles.foodItemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.foodItemRestaurant} numberOfLines={1}>{item.restaurantName}</Text>
                  <View style={styles.foodItemFooter}>
                    <Text style={styles.foodItemPrice}>₹{item.price}</Text>
                    <View style={styles.foodItemRating}>
                      <Text style={styles.foodItemRatingText}>★ {item.rating}</Text>
                    </View>
                  </View>
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
            {filteredRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={`all-${restaurant.id}`}
                style={styles.fullRestaurantCard}
                onPress={() => restaurant.isOpen !== false && router.push(`/restaurant/${restaurant.id}` as any)}
                disabled={restaurant.isOpen === false}
              >
                <View style={restaurant.isOpen === false && styles.grayscaleContainer}>
                  <Image 
                    source={{ uri: restaurant.image }} 
                    style={styles.fullRestaurantImage} 
                  />
                  {restaurant.isOpen === false && (
                    <View style={styles.fullClosedOverlay}>
                      <Text style={styles.closedText}>CLOSED</Text>
                    </View>
                  )}
                </View>
                {restaurant.isOpen !== false && (
                  <View style={styles.fullRestaurantOverlay}>
                    <Text style={styles.fullRestaurantOffer}>{restaurant.offer}</Text>
                  </View>
                )}
                <View style={styles.fullRestaurantInfo}>
                  <View style={styles.fullRestaurantHeader}>
                    <Text 
                      style={[
                        styles.fullRestaurantName,
                        restaurant.isOpen === false && styles.restaurantNameClosed
                      ]}
                    >
                      {restaurant.name}
                    </Text>
                    <Ionicons 
                      name="radio-button-on" 
                      size={14} 
                      color={restaurant.isVeg ? '#10B981' : '#EF4444'} 
                    />
                  </View>
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
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>Made with love for </Text>
            <Text style={styles.footerText}>Delhi </Text>
            <Ionicons name="heart" size={14} color="#FF6B35" />
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
    paddingTop: Platform.OS === 'ios' ? 55 : 30,
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
  locationIconContainer: {
    width: 24,
    height: 24,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPinIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    position: 'relative',
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
  searchIconContainer: {
    width: 20,
    height: 20,
    marginRight: 10,
    position: 'relative',
  },
  searchIconCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#666',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchIconHandle: {
    width: 6,
    height: 2,
    backgroundColor: '#666',
    position: 'absolute',
    bottom: 1,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: '#999',
  },
  vegFilterButton: {
    width: 46,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  vegFilterButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
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
    position: 'relative',
  },
  categoryUnavailable: {
    borderColor: '#CCCCCC',
    backgroundColor: '#F0F0F0',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  imageGrayscale: {
    opacity: 0.4,
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#999',
  },
  categoryName: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryNameUnavailable: {
    color: '#999',
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
  grayscaleContainer: {
    opacity: 0.6,
  },
  restaurantImageClosed: {
    width: '100%',
    height: width * 0.36,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  closedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  closedText: {
    color: '#666666',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
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
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  restaurantNameClosed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999999',
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
  cuisineClosed: {
    fontSize: 13,
    color: '#CCCCCC',
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
  fullRestaurantImageClosed: {
    width: width * 0.32,
    height: width * 0.32,
    backgroundColor: '#F5F5F5',
  },
  fullClosedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.32,
    height: width * 0.32,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
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
  fullRestaurantFavorite: {
    position: 'absolute',
    top: 8,
    left: width * 0.32 - 40,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  fullRestaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  fullRestaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
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
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    paddingRight: 12,
  },
  modalImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  radioLabel: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Food items styles
  foodItemsList: {
    paddingHorizontal: 16,
  },
  foodItemCard: {
    width: 180,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foodItemImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
  },
  foodItemVegBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 4,
  },
  foodItemHeartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 6,
  },
  foodItemDetails: {
    padding: 12,
  },
  foodItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  foodItemRestaurant: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  foodItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foodItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  foodItemRating: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  foodItemRatingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
