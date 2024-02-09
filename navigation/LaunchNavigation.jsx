import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/LoginScreen';

// 2) Créer un Stack avec la fonction createNativeStackNavigator
const Stack = createNativeStackNavigator();

export default function LaunchNavigation() {
  const [alreadyLaunched, setAlreadyLaunched] = useState(false);

  useEffect(() => {
    (async function () {
      const data = await AsyncStorage.getItem('alreadyLaunched');
      if (data) {
        setAlreadyLaunched(true);
      }
    })();
  }, []);

  return (
    <Stack.Navigator>
      {/* Navigation user is not connected */}
      {alreadyLaunched ? undefined : (
        <Stack.Screen
          name="onBoarding"
          options={{ headerShown: false }}
          component={OnBoardingScreen}
        />
      )}
      <Stack.Screen
        options={{ headerShown: false }}
        name="login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}
