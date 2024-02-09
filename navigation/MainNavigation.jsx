import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { COLORS } from '../constants/COLORS';
import CartScreen from '../screens/CartScreen';

// 2) Nested navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: COLORS.secondary }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? COLORS.primary : '#c8C8C8'}
            />
          ),
        }}
        name="home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, focused }) => (
            <AntDesign
              name="hearto"
              size={size}
              color={focused ? COLORS.primary : '#c8C8C8'}
            />
          ),
        }}
        name="favorites"
        component={HomeScreen}
      />
      <Tab.Screen
        name="cart"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Feather
              name="shopping-cart"
              size={size}
              color={focused ? COLORS.primary : '#c8C8C8'}
            />
          ),
        }}
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Feather
              name="user"
              size={size}
              color={focused ? COLORS.primary : '#c8C8C8'}
            />
          ),
        }}
        name="profile"
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={TabNavigation}
       /*  options={{ headerShown: false }} */
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        /* options={{ presentation: "modal" }} */
      />
    </Stack.Navigator>
  );
}
