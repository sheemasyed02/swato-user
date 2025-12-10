import { Colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NotificationScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnableNotification = async () => {
    setIsLoading(true);
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      
      if (status === 'granted') {
        console.log('Notification permission granted');
      }
      
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      router.replace('/(tabs)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.swato.primary, Colors.swato.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoGlow} />
          <View style={styles.logoWrapper}>
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.headerTitle}>Stay Updated</Text>
        <Text style={styles.headerSubtitle}>Get real-time order updates</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🔔</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>Enable Notifications</Text>
          <Text style={styles.cardDescription}>
            Allow push notifications to get real-time updates on your order status and special offers
          </Text>

          <View style={styles.features}>
            <View style={styles.feature}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Order status updates</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Delivery tracking</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Exclusive offers</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.enableButton}
            onPress={handleEnableNotification}
            disabled={isLoading}
          >
            <LinearGradient
              colors={[Colors.swato.primary, Colors.swato.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.enableButtonText}>
                {isLoading ? 'Setting up...' : 'Enable Notifications'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: '50%',
    left: '50%',
    marginLeft: -45,
    marginTop: -45,
  },
  logoWrapper: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 36,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  features: {
    marginBottom: 28,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B35',
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  enableButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  enableButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#999',
    fontSize: 15,
    fontWeight: '500',
  },
});
