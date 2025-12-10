import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formSection}>
            <Text style={styles.title}>Get updates on your order status</Text>
            
            <Text style={styles.description}>
              Allow push notifications to get real-time updates on your order status.
            </Text>

            <View style={styles.iconContainer}>
              <Image
                source={require('@/assets/images/2.png')}
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.features}>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>•</Text>
                <Text style={styles.featureText}>Order status updates</Text>
              </View>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>•</Text>
                <Text style={styles.featureText}>Delivery tracking</Text>
              </View>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>•</Text>
                <Text style={styles.featureText}>Exclusive offers</Text>
              </View>
            </View>
          </View>
        </ScrollView>

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
    backgroundColor: '#FF5200',
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
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  formSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  illustrationImage: {
    width: 200,
    height: 200,
  },
  features: {
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 20,
    color: '#FF5200',
    marginRight: 12,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
    color: '#333',
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
    backgroundColor: '#FF5200',
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
    color: '#FF5200',
    fontSize: 16,
    fontWeight: '600',
  },
});
