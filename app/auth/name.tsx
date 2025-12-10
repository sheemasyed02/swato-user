import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function NameScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    if (name.trim().length >= 2) {
      router.push('/auth/location' as any);
    }
  };

  const clearName = () => {
    setName('');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={['#FF6B35', '#FF8559']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
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
        <Text style={styles.headerTitle}>What's your name?</Text>
        <Text style={styles.headerSubtitle}>Let us know how to address you</Text>
      </LinearGradient>

      {/* Form Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <View style={[
            styles.inputWrapper,
            isFocused && styles.inputWrapperFocused
          ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoFocus
              autoCapitalize="words"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {name.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={clearName}>
                <View style={styles.clearIcon} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              name.trim().length >= 2 && styles.continueButtonActive,
            ]}
            onPress={handleContinue}
            disabled={name.trim().length < 2}
          >
            <LinearGradient
              colors={name.trim().length >= 2 ? ['#FF6B35', '#FF8559'] : ['#E0E0E0', '#E0E0E0']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[
                styles.continueButtonText,
                name.trim().length >= 2 && styles.continueButtonTextActive
              ]}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 18,
    backgroundColor: '#F8F9FA',
    marginBottom: 24,
  },
  inputWrapperFocused: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    width: 12,
    height: 2,
    backgroundColor: '#666',
    borderRadius: 1,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
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
});
