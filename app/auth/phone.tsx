import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PhoneScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    if (phoneNumber.length >= 10) {
      router.push('/auth/otp' as any);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section with Gradient */}
      <LinearGradient
        colors={['#FF6B35', '#FF8559']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.skipButton} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logoGlow} />
          <View style={styles.logoWrapper}>
            <Image
              source={require('@/assets/images/2.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.headerTitle}>Welcome to Swato</Text>
        <Text style={styles.headerSubtitle}>Enter your mobile number to get started</Text>
      </LinearGradient>

      {/* Form Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.label}>Mobile Number</Text>
            
            <View style={[
              styles.phoneInputWrapper,
              isFocused && styles.phoneInputWrapperFocused
            ]}>
              <View style={styles.countryCodeSection}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.countryCode}>{countryCode}</Text>
                <View style={styles.divider} />
              </View>

              <TextInput
                style={styles.phoneInput}
                placeholder="Enter mobile number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                phoneNumber.length >= 10 && styles.continueButtonActive,
              ]}
              onPress={handleContinue}
              disabled={phoneNumber.length < 10}
            >
              <LinearGradient
                colors={phoneNumber.length >= 10 ? ['#FF6B35', '#FF8559'] : ['#E0E0E0', '#E0E0E0']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={[
                  styles.continueButtonText,
                  phoneNumber.length >= 10 && styles.continueButtonTextActive
                ]}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              By continuing, you agree to our{' '}
              <Text style={styles.disclaimerLink}>Terms of Service</Text> and{' '}
              <Text style={styles.disclaimerLink}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
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
  },
  scrollContent: {
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
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
    marginBottom: 24,
  },
  phoneInputWrapperFocused: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
  },
  countryCodeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
  },
  flag: {
    fontSize: 24,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginLeft: 12,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  continueButtonActive: {
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
  continueButtonText: {
    color: '#999',
    fontSize: 17,
    fontWeight: 'bold',
  },
  continueButtonTextActive: {
    color: '#FFFFFF',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
  },
  disclaimerLink: {
    color: '#FF6B35',
    fontWeight: '600',
  },
});
