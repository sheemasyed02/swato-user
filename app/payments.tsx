import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PaymentsScreen() {
  const router = useRouter();

  const paymentMethods = [
    { id: 1, type: 'UPI', name: 'Google Pay', last4: '****1234', isDefault: true },
    { id: 2, type: 'Card', name: 'HDFC Credit Card', last4: '****5678', isDefault: false },
  ];

  const refunds = [
    { id: 1, orderId: '12340', amount: 299, status: 'Processed', date: '6 Dec 2025' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments & Refunds</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentCard}>
              <View style={styles.paymentIcon}>
                <Text style={styles.paymentIconText}>{method.type === 'UPI' ? '💳' : '🏦'}</Text>
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>{method.name}</Text>
                <Text style={styles.paymentDetails}>{method.last4}</Text>
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Payment Method</Text>
          </TouchableOpacity>
        </View>

        {/* Refunds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Refunds</Text>
          {refunds.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No refunds</Text>
            </View>
          ) : (
            refunds.map((refund) => (
              <View key={refund.id} style={styles.refundCard}>
                <View style={styles.refundInfo}>
                  <Text style={styles.refundLabel}>Order #{refund.orderId}</Text>
                  <Text style={styles.refundDate}>{refund.date}</Text>
                </View>
                <View style={styles.refundRight}>
                  <Text style={styles.refundAmount}>₹{refund.amount}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{refund.status}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
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
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentIconText: {
    fontSize: 24,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  paymentDetails: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  defaultBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
  refundCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  refundInfo: {
    flex: 1,
  },
  refundLabel: {
    fontSize: 14,
    color: '#666',
  },
  refundDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  refundRight: {
    alignItems: 'flex-end',
  },
  refundAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  statusBadge: {
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C55E',
  },
});
