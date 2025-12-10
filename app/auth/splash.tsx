import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 30,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtle pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to phone screen after 3 seconds
    const timeout = setTimeout(() => {
      router.replace('/auth/phone' as any);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={['#FF6B35', '#FF8559', '#FFB380']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* Decorative circles background */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      {/* Main content */}
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Logo with glow effect */}
          <Animated.View
            style={[
              styles.logoGlow,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <View style={styles.logoWrapper}>
            <Image
              source={require('@/assets/images/2.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* Brand name with tagline */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.brandName}>Swato</Text>
          <View style={styles.taglineWrapper}>
            <View style={styles.taglineLine} />
            <Text style={styles.tagline}>FOOD DELIVERY</Text>
            <View style={styles.taglineLine} />
          </View>
        </Animated.View>
      </View>

      {/* Bottom accent */}
      <Animated.View
        style={[
          styles.bottomAccent,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.accentDot} />
        <View style={styles.accentDot} />
        <View style={styles.accentDot} />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleTop: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circleBottom: {
    position: 'absolute',
    bottom: -150,
    left: -80,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: '50%',
    left: '50%',
    marginLeft: -90,
    marginTop: -90,
  },
  logoWrapper: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  brandName: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  taglineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taglineLine: {
    width: 30,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  tagline: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: 3,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  accentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
