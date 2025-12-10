import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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

const OTP_LENGTH = 6;

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-navigate when OTP is complete
  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      setTimeout(() => {
        router.push('/auth/name' as any);
      }, 500);
    }
  }, [otp]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    router.push('/auth/name' as any);
  };

  const handleResend = (method: 'sms' | 'call') => {
    setTimer(30);
    setCanResend(false);
    // Implement resend logic here
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            <Text style={styles.title}>Enter verification code</Text>
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>Sent to +91 8309691054</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.editLink}>✏️</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={[styles.otpInput, digit && styles.otpInputFilled, index === 0 && styles.otpInputFirst]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            <View style={styles.resendSection}>
              <Text style={styles.resendText}>
                Get verification code again in <Text style={styles.timer}>{formatTime(timer)}</Text>
              </Text>
              <View style={styles.resendButtons}>
                <TouchableOpacity
                  style={[styles.resendButton, !canResend && styles.resendButtonDisabled]}
                  onPress={() => handleResend('sms')}
                  disabled={!canResend}
                >
                  <Text style={[styles.resendButtonText, !canResend && styles.resendButtonTextDisabled]}>
                    Get via SMS
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.resendButton, !canResend && styles.resendButtonDisabled]}
                  onPress={() => handleResend('call')}
                  disabled={!canResend}
                >
                  <Text style={[styles.resendButtonText, !canResend && styles.resendButtonTextDisabled]}>
                    Get via Call
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  editLink: {
    fontSize: 18,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 8,
  },
  otpInput: {
    flex: 1,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    backgroundColor: '#F8F9FA',
  },
  otpInputFirst: {
    marginLeft: 0,
  },
  otpInputFilled: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
  },
  resendSection: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  timer: {
    color: '#FF6B35',
    fontWeight: '700',
  },
  resendButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  resendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
  },
  resendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  resendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  resendButtonTextDisabled: {
    color: '#999999',
  },
});

