// 1) Import NavigationContainer et createNativeStackNavigator
import { NavigationContainer } from '@react-navigation/native';

import { useRootContext } from '../context/RootContext';
import LaunchNavigation from './LaunchNavigation';
import MainNavigation from './MainNavigation';


export default function RootNavigation() {
  const { isConnected } = useRootContext();

  // 4) Pour "chemin" utiliser Stack.Screen à l'intérieur de Stack.Navigator
  return (
    <NavigationContainer>
      {isConnected ? <MainNavigation /> : <LaunchNavigation />}
    </NavigationContainer>
  );
}
