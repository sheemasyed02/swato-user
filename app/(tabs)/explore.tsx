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

export default function AccountScreen() {
  const router = useRouter();
  const customerName = 'Sheema Syed'; // This should come from user data/state

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>{customerName.charAt(0)}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{customerName}</Text>
            <Text style={styles.profilePhone}>+91 8309691054</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.menuHeader}>Food Orders</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/orders')}>
            <View style={styles.menuIconContainer}>
              <View style={styles.orderIcon}>
                <View style={styles.orderIconBox} />
              </View>
            </View>
            <Text style={styles.menuText}>Your orders</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/favorites')}>
            <View style={styles.menuIconContainer}>
              <View style={styles.favoriteIcon}>
                <View style={styles.heartShape} />
              </View>
            </View>
            <Text style={styles.menuText}>Favorite</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuHeader}>More</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/payments')}>
            <View style={styles.menuIconContainer}>
              <View style={styles.paymentIcon}>
                <View style={styles.cardShape} />
              </View>
            </View>
            <Text style={styles.menuText}>Payments & Refunds</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/addresses')}>
            <View style={styles.menuIconContainer}>
              <View style={styles.addressIcon}>
                <View style={styles.pinShape} />
              </View>
            </View>
            <Text style={styles.menuText}>Addresses</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
            <View style={styles.menuIconContainer}>
              <View style={styles.settingsIcon}>
                <View style={styles.gearShape} />
              </View>
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/feedback')}>
            <View style={styles.menuIconContainer}>
              <View style={styles.feedbackIcon}>
                <View style={styles.starShape} />
              </View>
            </View>
            <Text style={styles.menuText}>Feedback</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/help')}>
            <View style={styles.menuIconContainer}>
              <View style={styles.helpIcon}>
                <View style={styles.questionShape} />
              </View>
            </View>
            <Text style={styles.menuText}>Help</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
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
    backgroundColor: '#FF6B35',
    paddingTop: Platform.OS === 'ios' ? 55 : 30,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
  },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  editText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  oneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3EE',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  oneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneLogo: {
    width: 30,
    height: 30,
  },
  oneInfo: {
    flex: 1,
    marginLeft: 12,
  },
  oneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  oneSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    paddingVertical: 8,
  },
  menuHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    paddingHorizontal: 16,
    paddingVertical: 12,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE8DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderIconBox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 4,
  },
  favoriteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartShape: {
    width: 18,
    height: 18,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    transform: [{ rotate: '45deg' }],
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardShape: {
    width: 20,
    height: 14,
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE8DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinShape: {
    width: 14,
    height: 14,
    backgroundColor: '#FF6B35',
    borderRadius: 7,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gearShape: {
    width: 18,
    height: 18,
    backgroundColor: '#6B7280',
    borderRadius: 9,
  },
  feedbackIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starShape: {
    width: 18,
    height: 18,
    backgroundColor: '#F59E0B',
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionShape: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
