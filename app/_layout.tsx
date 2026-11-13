import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      {/* backgroundColor প্রপটি সরিয়ে নেওয়া হয়েছে */}
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.primary,
          headerTitleStyle: {
            fontWeight: '600',
            color: COLORS.textPrimary,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="philosophers/[topic]" 
          options={{ title: 'চিন্তাবিদগণ' }} 
        />
        <Stack.Screen 
          name="detail/[id]" 
          options={{ title: 'গভীর পাঠ' }} 
        />
      </Stack>
    </>
  );
}