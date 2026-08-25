import "@/global.css";
import { Redirect, Slot, Stack } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Prevent flash of unauthenticated content while loading tokenCache
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect to your app's home or main screen if already signed in
  if (isSignedIn) {
    return <Redirect href="/" />;
  }


  return <Slot screenOptions={{ headerShown: false }} />;
}
