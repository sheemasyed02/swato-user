import { useUser } from '@/contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
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
  const { user, resetUserData } = useUser();
  const customerName = user?.name || 'User';
  const customerPhone = user?.phone || '+91 XXXXXXXXXX';

  const handleLogout = () => {
    resetUserData();
    router.replace('/auth/splash' as any);
  };

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
            <Text style={styles.profileText}>{customerName.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{customerName}</Text>
            <Text style={styles.profilePhone}>{customerPhone}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/edit-profile' as any)}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.menuHeader}>Food Orders</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/orders')}>
            <View style={[styles.iconContainer, styles.iconOrderBg]}>
              <Ionicons name="receipt-outline" size={22} color="#FF6B35" />
            </View>
            <Text style={styles.menuText}>Your orders</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/favorites')}>
            <View style={[styles.iconContainer, styles.iconFavoriteBg]}>
              <Ionicons name="heart" size={22} color="#EF4444" />
            </View>
            <Text style={styles.menuText}>Favorite</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuHeader}>More</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/payments')}>
            <View style={[styles.iconContainer, styles.iconPaymentBg]}>
              <Ionicons name="card-outline" size={22} color="#3B82F6" />
            </View>
            <Text style={styles.menuText}>Payments & Refunds</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/addresses')}>
            <View style={[styles.iconContainer, styles.iconAddressBg]}>
              <Ionicons name="location-outline" size={22} color="#FF6B35" />
            </View>
            <Text style={styles.menuText}>Addresses</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
            <View style={[styles.iconContainer, styles.iconSettingsBg]}>
              <Ionicons name="settings-outline" size={22} color="#6B7280" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/feedback')}>
            <View style={[styles.iconContainer, styles.iconFeedbackBg]}>
              <Ionicons name="star" size={22} color="#F59E0B" />
            </View>
            <Text style={styles.menuText}>Feedback</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/help')}>
            <View style={[styles.iconContainer, styles.iconHelpBg]}>
              <Ionicons name="help-circle-outline" size={22} color="#10B981" />
            </View>
            <Text style={styles.menuText}>Help</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconOrderBg: {
    backgroundColor: '#FFE8DC',
  },
  iconFavoriteBg: {
    backgroundColor: '#FEE2E2',
  },
  iconPaymentBg: {
    backgroundColor: '#DBEAFE',
  },
  iconAddressBg: {
    backgroundColor: '#FFE8DC',
  },
  iconSettingsBg: {
    backgroundColor: '#F3F4F6',
  },
  iconFeedbackBg: {
    backgroundColor: '#FEF3C7',
  },
  iconHelpBg: {
    backgroundColor: '#D1FAE5',
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
