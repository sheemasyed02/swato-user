import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (newOtp.every((digit) => digit !== '') && index === OTP_LENGTH - 1) {
      setTimeout(() => handleVerify(), 500);
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
        <Text style={styles.headerTitle}>Verification Code</Text>
        <Text style={styles.headerSubtitle}>We've sent a code to your mobile</Text>
      </LinearGradient>

      {/* OTP Form Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <View style={styles.card}>
          <View style={styles.phoneInfo}>
            <Text style={styles.phoneText}>+91 8309691054</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputRefs.current[index] = ref; }}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Timer */}
          <View style={styles.timerContainer}>
            {!canResend ? (
              <Text style={styles.timerText}>
                Resend code in <Text style={styles.timerValue}>{formatTime(timer)}</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={() => handleResend('sms')}>
                <Text style={styles.resendLink}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
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
  phoneInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  phoneText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  changeText: {
    fontSize: 15,
    color: '#FF6B35',
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: (width - 120) / OTP_LENGTH,
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
  otpInputFilled: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: '#666',
  },
  timerValue: {
    color: '#FF6B35',
    fontWeight: '700',
  },
  resendLink: {
    fontSize: 15,
    color: '#FF6B35',
    fontWeight: '600',
  },
});
