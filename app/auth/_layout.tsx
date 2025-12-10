import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="splash" />
      <Stack.Screen name="phone" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="name" />
      <Stack.Screen name="location" />
      <Stack.Screen name="notification" />
    </Stack>
  );
}
