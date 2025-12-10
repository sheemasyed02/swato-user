import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formSection}>
            <Text style={styles.title}>What's your name?</Text>
            
            <Text style={styles.label}>Enter Full Name</Text>
            <View style={[
              styles.inputWrapper,
              isFocused && styles.inputWrapperFocused
            ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
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
                  <Text style={styles.clearIcon}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Button fixed at bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              name.trim().length >= 2 && styles.continueButtonActive,
            ]}
            onPress={handleContinue}
            disabled={name.trim().length < 2}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5200',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5200',
    borderRadius: 28,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: '#FF5200',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 18,
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
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  continueButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#FF5200',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
