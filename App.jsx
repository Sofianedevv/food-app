import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import RootProvider from './context/RootContext';
import RootNavigation from './navigation/RootNavigation';
import { useCallback } from 'react';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins: require('./assets/fonts/Poppins.ttf'),
    'Mr-Dafoe': require('./assets/fonts/MrDafoe.ttf'),
  });

  const onLayoutRootView = useCallback(
    async function () {
      if (fontError || fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    },
    [fontsLoaded, fontError]
  );

  if (!fontError && !fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RootProvider>
        <RootNavigation />
        <Toast />
        <StatusBar style="light" />
      </RootProvider>
    </View>
  );
}
