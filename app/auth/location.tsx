import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LocationScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnableLocation = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        console.log('Location:', location);
        router.push('/auth/notification' as any);
      } else {
        Alert.alert(
          'Permission Denied',
          'Location access is required to show nearby restaurants and delivery options.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location:', error);
      Alert.alert('Error', 'Failed to get location permission');
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
            <Text style={styles.title}>Select Your Location</Text>
            
            <View style={styles.iconContainer}>
              <View style={styles.locationIcon}>
                <View style={styles.locationPinTop} />
                <View style={styles.locationPinBottom} />
              </View>
            </View>

            <Text style={styles.description}>
              Allow Swato to access this device's location?
            </Text>

            <View style={styles.features}>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>•</Text>
                <Text style={styles.featureText}>Find nearby restaurants</Text>
              </View>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>•</Text>
                <Text style={styles.featureText}>Accurate delivery tracking</Text>
              </View>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>•</Text>
                <Text style={styles.featureText}>Faster order placement</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Buttons at bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.enableButton, isLoading && styles.enableButtonDisabled]}
            onPress={handleEnableLocation}
            disabled={isLoading}
          >
            <Text style={styles.enableButtonText}>
              {isLoading ? 'Getting location...' : 'While using the app'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.push('/auth/notification' as any)}
          >
            <Text style={styles.skipButtonText}>Don't allow</Text>
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
    marginBottom: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  locationIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPinTop: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    marginBottom: 2,
  },
  locationPinBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF6B35',
  },
  description: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
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
    color: '#FF6B35',
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
