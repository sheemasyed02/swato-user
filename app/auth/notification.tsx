import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
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
      {/* Orange Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('@/assets/images/2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.tagline}>One app for food, grocery, dining &</Text>
        <Text style={styles.tagline}>more in minutes!</Text>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View style={styles.formSection}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/2.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Stay updated on your orders!</Text>
          
          <Text style={styles.description}>
            Get real-time notifications about your order status and exclusive offers.
          </Text>
        </View>

        {/* Buttons at bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.enableButton, isLoading && styles.enableButtonDisabled]}
            onPress={handleEnableNotification}
            disabled={isLoading}
          >
            <Text style={styles.enableButtonText}>
              {isLoading ? 'Setting up...' : 'Turn on Notification'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.skipButtonText}>Not Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FF6B35',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formSection: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  illustrationImage: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
  },
  enableButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  enableButtonDisabled: {
    opacity: 0.6,
  },
  enableButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
});
