import { useUser } from '@/contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function FeedbackScreen() {
  const router = useRouter();
  const { orders } = useUser();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [foodRating, setFoodRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const deliveredOrders = orders.filter(o => o.status === 'Delivered');

  const handleSubmit = () => {
    if (!selectedOrder) {
      Alert.alert('Select Order', 'Please select an order to give feedback');
      return;
    }
    if (foodRating === 0 || deliveryRating === 0) {
      Alert.alert('Rating Required', 'Please rate both food quality and delivery');
      return;
    }
    Alert.alert('Thank You!', 'Your feedback helps us improve our service', [
      { text: 'OK', onPress: () => {
        setSelectedOrder(null);
        setFoodRating(0);
        setDeliveryRating(0);
        setFeedback('');
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Feedback</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Select Order */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Order to Review</Text>
          {deliveredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={60} color="#CCCCCC" />
              <Text style={styles.emptyText}>No delivered orders yet</Text>
              <Text style={styles.emptySubtext}>Complete an order to give feedback</Text>
            </View>
          ) : (
            deliveredOrders.slice(0, 5).map((order) => (
              <TouchableOpacity
                key={order.id}
                style={[
                  styles.orderCard,
                  selectedOrder === order.id && styles.orderCardSelected
                ]}
                onPress={() => setSelectedOrder(order.id)}
              >
                <Image source={{ uri: order.restaurantImage }} style={styles.orderImage} />
                <View style={styles.orderInfo}>
                  <Text style={styles.orderRestaurant}>{order.restaurantName}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                  <Text style={styles.orderTotal}>₹{order.total}</Text>
                </View>
                {selectedOrder === order.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#FF6B35" />
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {selectedOrder && (
          <>
            {/* Food Quality Rating */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rate Food Quality</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setFoodRating(star)}
                    style={styles.starButton}
                  >
                    <Ionicons 
                      name={foodRating >= star ? "star" : "star-outline"} 
                      size={36} 
                      color={foodRating >= star ? "#FFB800" : "#CCCCCC"} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Delivery Rating */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rate Delivery Experience</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setDeliveryRating(star)}
                    style={styles.starButton}
                  >
                    <Ionicons 
                      name={deliveryRating >= star ? "star" : "star-outline"} 
                      size={36} 
                      color={deliveryRating >= star ? "#FFB800" : "#CCCCCC"} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Feedback Input */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Comments</Text>
              <TextInput
                style={styles.feedbackInput}
                placeholder="Tell us about your experience..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={feedback}
                onChangeText={setFeedback}
              />
            </View>

            {/* Quick Tags */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Feedback</Text>
              <View style={styles.tagsContainer}>
                {['Delicious Food', 'Hot & Fresh', 'Well Packed', 'On Time', 'Polite Delivery'].map(
                  (tag) => (
                    <TouchableOpacity key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </>
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
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  orderCardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF3EE',
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  orderRestaurant: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  starButton: {
    padding: 8,
  },
  star: {
    fontSize: 40,
    color: '#E0E0E0',
  },
  starActive: {
    color: '#FFB800',
  },
  feedbackInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1A1A1A',
    minHeight: 150,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
