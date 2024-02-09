// RNFS
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';

import Header from '../components/shared/Header';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import ListDishes from '../components/ListDishes';

export default function HomeScreen() {
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    (async function () {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return Toast.show({
          type: 'Error',
          text1: 'Location denied',
          text2: 'Permission denied, we need your location',
        });
      }

      const { coords } = await Location.getCurrentPositionAsync({});

      const location = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      setLocation(location[0]);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header location={location} />
        <Banner />
        <CategoryList />
        <ListDishes />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
